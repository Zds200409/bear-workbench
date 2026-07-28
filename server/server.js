// 熊熊工作台 · 公众号自动发布后端（零依赖，仅用 Node 内置模块）
// 运行：在 server/ 目录放好 .env（含 WECHAT_APPID / WECHAT_APPSECRET），然后 `node server.js`
// 功能：托管前端页面 + 提供 /api/* 接口（拿 token、上传封面、写草稿箱、提交发布、定时自动发）
// 注意：AppSecret 仅存于本机 .env，绝不进入前端代码或 Git 仓库。

const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// ---------- 读取 .env ----------
const ENV = {};
try {
  const raw = fs.readFileSync(path.join(__dirname, '.env'), 'utf8');
  raw.split('\n').forEach((line) => {
    const m = line.match(/^\s*([\w]+)\s*=\s*(.*)\s*$/);
    if (m) ENV[m[1]] = m[2];
  });
} catch (e) { /* 没有 .env 也能启动，只是发布会报错提示 */ }

const APPID = ENV.WECHAT_APPID || '';
const APPSECRET = ENV.WECHAT_APPSECRET || '';
const PORT = parseInt(ENV.PORT || '3000', 10);
const ROOT = path.join(__dirname, '..'); // 项目根目录（index.html 所在）

// ---------- 内存状态 ----------
let tokenCache = { access_token: '', expire: 0 };
let publishedToday = ''; // 防止同一天重复定时发布

// ---------- 工具：读取请求体 ----------
function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (c) => (data += c));
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });
}

// ---------- 工具：简单 JSON 响应 ----------
function sendJson(res, code, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(body);
}

// ---------- 微信：获取 access_token（带缓存） ----------
async function getAccessToken() {
  const now = Date.now();
  if (tokenCache.access_token && now < tokenCache.expire) return tokenCache.access_token;
  if (!APPID || !APPSECRET) {
    throw new Error('后端未配置 WECHAT_APPID / WECHAT_APPSECRET，请在 server/.env 填写');
  }
  const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${APPSECRET}`;
  const r = await fetch(url);
  const j = await r.json();
  if (j.errcode) throw new Error(`获取 access_token 失败: ${j.errcode} ${j.errmsg}`);
  tokenCache.access_token = j.access_token;
  tokenCache.expire = now + (j.expires_in - 300) * 1000; // 提前 5 分钟过期
  return j.access_token;
}

// ---------- 微信：上传封面图（material/add_material type=image） ----------
async function uploadCover(base64) {
  const token = await getAccessToken();
  const buf = Buffer.from(base64.split(',')[1] || '', 'base64');
  const boundary = '----bear' + crypto.randomBytes(8).toString('hex');
  const head = Buffer.from(
    `--${boundary}\r\nContent-Disposition: form-data; name="media"; filename="cover.png"\r\nContent-Type: image/png\r\n\r\n`
  );
  const tail = Buffer.from(`\r\n--${boundary}--\r\n`);
  const body = Buffer.concat([head, buf, tail]);
  const r = await fetch(
    `https://api.weixin.qq.com/cgi-bin/material/add_material?access_token=${token}&type=image`,
    {
      method: 'POST',
      headers: { 'Content-Type': `multipart/form-data; boundary=${boundary}`, 'Content-Length': body.length },
      body,
    }
  );
  const j = await r.json();
  if (j.errcode) throw new Error(`封面上传失败: ${j.errcode} ${j.errmsg}`);
  return j.media_id;
}

// ---------- 微信：写草稿箱 + 提交发布 ----------
async function addDraftAndPublish(article) {
  const token = await getAccessToken();
  const r = await fetch(`https://api.weixin.qq.com/cgi-bin/draft/add?access_token=${token}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ articles: [article] }),
  });
  const j = await r.json();
  if (j.errcode) throw new Error(`草稿箱写入失败: ${j.errcode} ${j.errmsg}`);
  const mediaId = j.media_id;
  const r2 = await fetch(`https://api.weixin.qq.com/cgi-bin/freepublish/submit?access_token=${token}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ media_id: mediaId }),
  });
  const j2 = await r2.json();
  if (j2.errcode) throw new Error(`发布提交失败: ${j2.errcode} ${j2.errmsg}`);
  return { media_id: mediaId, publish_id: j2.publish_id };
}

// ---------- 调度存储 ----------
const SCHEDULE_FILE = path.join(__dirname, 'schedule.json');
function loadSchedule() {
  try { return JSON.parse(fs.readFileSync(SCHEDULE_FILE, 'utf8')); } catch (e) { return null; }
}
function saveSchedule(obj) {
  fs.writeFileSync(SCHEDULE_FILE, JSON.stringify(obj, null, 2));
}

// ---------- 定时发布调度（每分钟检查） ----------
setInterval(() => {
  const sch = loadSchedule();
  if (!sch || !sch.enabled || !sch.payload) return;
  const now = new Date();
  const hhmm = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  const today = now.toISOString().slice(0, 10);
  if (hhmm === sch.time && publishedToday !== today + sch.time) {
    publishedToday = today + sch.time;
    publishFromPayload(sch.payload).catch((e) => console.error('[定时发布] 失败:', e.message));
  }
}, 30 * 1000);

async function publishFromPayload(p) {
  const thumb = await uploadCover(p.coverBase64);
  const article = {
    title: p.title,
    author: p.author || '',
    digest: p.digest || '',
    content: p.contentHtml,
    thumb_media_id: thumb,
    need_open_comment: 0,
    only_fans_can_comment: 0,
  };
  const result = await addDraftAndPublish(article);
  console.log('[定时发布] 成功:', result);
  return result;
}

// ---------- 静态文件托管 ----------
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
  '.ico': 'image/x-icon',
};
function serveStatic(req, res, pathname) {
  let rel = pathname === '/' ? '/index.html' : pathname;
  const filePath = path.join(ROOT, path.normalize(rel).replace(/^(\.\.[/\\])+/, ''));
  if (!filePath.startsWith(ROOT)) { res.writeHead(403); res.end('forbidden'); return; }
  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end('not found'); return; }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  });
}

// ---------- HTTP 服务 ----------
const server = http.createServer(async (req, res) => {
  const u = new URL(req.url, `http://localhost:${PORT}`);
  const p = u.pathname;

  // 健康检查 / 配置状态（不泄露 secret）
  if (p === '/api/health' && req.method === 'GET') {
    return sendJson(res, 200, {
      ok: true,
      configured: !!(APPID && APPSECRET),
      schedule: loadSchedule() || null,
    });
  }

  // 立即发布
  if (p === '/api/publish' && req.method === 'POST') {
    try {
      const body = JSON.parse(await readBody(req));
      if (!body.contentHtml) throw new Error('缺少正文内容');
      if (!body.coverBase64) throw new Error('缺少封面图（公众号发布必须上传封面）');
      const thumb = await uploadCover(body.coverBase64);
      const article = {
        title: body.title || '未命名文章',
        author: body.author || '',
        digest: body.digest || '',
        content: body.contentHtml,
        thumb_media_id: thumb,
        need_open_comment: 0,
        only_fans_can_comment: 0,
      };
      const result = await addDraftAndPublish(article);
      return sendJson(res, 200, { ok: true, ...result });
    } catch (e) {
      return sendJson(res, 400, { ok: false, error: e.message });
    }
  }

  // 保存定时发布任务
  if (p === '/api/schedule' && req.method === 'POST') {
    try {
      const body = JSON.parse(await readBody(req));
      const sch = {
        enabled: !!body.enabled,
        time: body.time || '09:30',
        payload: body.payload || null,
        updatedAt: new Date().toISOString(),
      };
      saveSchedule(sch);
      return sendJson(res, 200, { ok: true, schedule: sch });
    } catch (e) {
      return sendJson(res, 400, { ok: false, error: e.message });
    }
  }

  // 读取定时任务
  if (p === '/api/schedule' && req.method === 'GET') {
    return sendJson(res, 200, { ok: true, schedule: loadSchedule() || null });
  }

  // 其余走静态
  if (req.method === 'GET') return serveStatic(req, res, p);
  res.writeHead(404); res.end('not found');
});

server.listen(PORT, () => {
  console.log(`熊熊工作台后端已启动: http://localhost:${PORT}`);
  if (!APPID || !APPSECRET) {
    console.warn('⚠️  尚未配置 WECHAT_APPID / WECHAT_APPSECRET，发布功能会报错。请在 server/.env 填写。');
  }
});

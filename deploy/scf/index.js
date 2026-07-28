/**
 * 熊熊工作台 · 公众号发布 + 云同步（腾讯云 SCF 版）
 * 零依赖：仅用 Node 18 内置 fetch，无需 npm install
 *
 * 能力：
 *  1) 立即发布：前端 POST {mode:'now', title, author, digest, contentHtml, coverBase64}
 *     → 上传封面 → 写草稿箱 → 返回 media_id（订阅号不自动发）
 *  2) 定时发布：前端 POST {mode:'schedule', time:'09:30', ...article}
 *     → 在微信草稿箱创建一篇标题带【定时·09:30】标记的草稿
 *  3) 定时触发：SCF 控制台建一个「每 15 分钟」的定时器调用本函数
 *     → 扫描草稿箱，找到标记且到点(<=当前时间)且今天未发的草稿，提交发布并删除该草稿
 *  4) 云同步代理：mode='cloud_login'/'cloud_upload'/'cloud_download'
 *     → 浏览器通过 SCF 代理访问 CloudBase 数据库（解决浏览器无法直连 tcb 域名的问题）
 *
 * 环境变量：
 *   WECHAT_APPID / WECHAT_APPSECRET — 微信公众号密钥
 *   CLOUDBASE_ENV_ID — CloudBase 环境 ID（用于云同步）
 */
const APPID = process.env.WECHAT_APPID || '';
const APPSECRET = process.env.WECHAT_APPSECRET || '';
const CLOUDBASE_ENV = process.env.CLOUDBASE_ENV_ID || '';
const API = 'https://api.weixin.qq.com/cgi-bin';

let _token = '';
let _tokenExp = 0;

async function getAccessToken() {
  const now = Date.now();
  if (_token && now < _tokenExp - 60000) return _token;
  const url = `${API}/token?grant_type=client_credential&appid=${APPID}&secret=${APPSECRET}`;
  const r = await fetch(url);
  const j = await r.json();
  if (j.errcode) throw new Error('获取access_token失败: ' + JSON.stringify(j));
  _token = j.access_token;
  _tokenExp = now + (j.expires_in || 7200) * 1000;
  return _token;
}

// base64 -> Buffer
function b64ToBuffer(b64) {
  const m = b64.match(/^data:.*;base64,(.*)$/);
  const pure = m ? m[1] : b64;
  return Buffer.from(pure, 'base64');
}

// 上传封面图，返回 media_id
async function uploadCover(b64) {
  const token = await getAccessToken();
  const buf = b64ToBuffer(b64);
  const form = new FormData();
  form.append('media', new Blob([buf], { type: 'image/png' }), 'cover.png');
  const r = await fetch(`${API}/material/add_material?access_token=${token}&type=image`, {
    method: 'POST', body: form
  });
  const j = await r.json();
  if (j.errcode) throw new Error('封面上传失败: ' + JSON.stringify(j));
  return j.media_id;
}

// 极简 HTML 清洗：微信只认白名单标签，这里原样透传（前端已生成合规标签）
function cleanHtml(html) {
  return (html || '').replace(/\n/g, '');
}

// 写草稿箱，返回 media_id
async function addDraft({ title, author, digest, contentHtml, thumb_media_id }) {
  const token = await getAccessToken();
  const articles = [{
    title: title || '未命名文章',
    author: author || '',
    digest: digest || '',
    content: cleanHtml(contentHtml),
    thumb_media_id,
    need_open_comment: 0,
    only_fans_can_comment: 0
  }];
  const r = await fetch(`${API}/draft/add?access_token=${token}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ articles })
  });
  const j = await r.json();
  if (j.errcode) throw new Error('写草稿箱失败: ' + JSON.stringify(j));
  return j.media_id;
}

// 提交发布，返回 publish_id
async function submitPublish(media_id) {
  const token = await getAccessToken();
  const r = await fetch(`${API}/freepublish/submit?access_token=${token}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ media_id_list: [media_id] })
  });
  const j = await r.json();
  if (j.errcode) throw new Error('提交发布失败: ' + JSON.stringify(j));
  return j.publish_id;
}

// 列出草稿箱（取前 20 篇）
async function listDrafts() {
  const token = await getAccessToken();
  const r = await fetch(`${API}/draft/batchget?access_token=${token}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ offset: 0, count: 20, no_content: 1 })
  });
  const j = await r.json();
  if (j.errcode) throw new Error('读取草稿箱失败: ' + JSON.stringify(j));
  return j.item || [];
}

async function deleteDraft(media_id) {
  const token = await getAccessToken();
  await fetch(`${API}/draft/delete?access_token=${token}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ media_id })
  });
}

// 定时触发：扫描标记草稿，到点则发布
async function runScheduled() {
  const items = await listDrafts();
  const now = new Date();
  const published = [];
  for (const it of items) {
    const m = (it.title || '').match(/^【定时·(\d{1,2}:\d{2})】/);
    if (!m) continue; // 只处理本应用创建的定时草稿
    const [h, min] = m[1].split(':').map(Number);
    const target = new Date(); target.setHours(h, min, 0, 0);
    if (now >= target) {
      try {
        const pid = await submitPublish(it.media_id);
        await deleteDraft(it.media_id);
        published.push({ title: it.title, publish_id: pid });
      } catch (e) {
        // 订阅号无 freepublish 权限(errcode 48001) → 留草稿不删，提示后台手动发
        if (e.message && e.message.indexOf('48001') >= 0) {
          published.push({ title: it.title, skipped: true, error: '订阅号无法自动发表，草稿已保留，请到后台手动发表' });
        } else {
          published.push({ title: it.title, error: e.message });
        }
      }
    }
  }
  return { ok: true, published };
}

// 立即发布（订阅号无 freepublish/submit 权限 → 仅存入草稿箱，用户后台手动发表）
async function publishNow(p) {
  const coverId = await uploadCover(p.coverBase64);
  const media_id = await addDraft({
    title: p.title, author: p.author, digest: p.digest,
    contentHtml: p.contentHtml, thumb_media_id: coverId
  });
  return { ok: true, media_id, draft: true, note: '已存入微信草稿箱，请到公众号后台手动发表' };
}

// 定时发布：仅创建标记草稿
async function scheduleDraft(p) {
  const coverId = await uploadCover(p.coverBase64);
  const title = `【定时·${p.time || '09:30'}】${p.title}`;
  const media_id = await addDraft({
    title, author: p.author, digest: p.digest,
    contentHtml: p.contentHtml, thumb_media_id: coverId
  });
  return { ok: true, media_id, note: '草稿已入队，待 SCF 定时器到点自动发布' };
}

// ==================== CloudBase 云同步代理（SCF 内网访问） ====================
let _cbToken = '';
let _cbTokenExp = 0;

async function cbApi(action, data) {
  const url = `https://${CLOUDBASE_ENV}.tcb.qcloud.la/web`;
  const body = { action, env: CLOUDBASE_ENV, data: data || {} };
  if (_cbToken) body.access_token = _cbToken;
  const r = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  return r.json();
}

async function cloudLogin() {
  if (!CLOUDBASE_ENV) throw new Error('未配置 CLOUDBASE_ENV_ID 环境变量');
  const j = await cbApi('anonymousLogin', {});
  if (j.code !== 0) throw new Error(j.message || '匿名登录失败: ' + JSON.stringify(j));
  _cbToken = j.data?.access_token || j.data?.token || '';
  _cbTokenExp = Date.now() + 3600000; // 1h
  return { ok: true, token: _cbToken };
}

async function cloudUpload(data) {
  if (!_cbToken) await cloudLogin();
  let ok = 0;
  for (const [k, v] of Object.entries(data)) {
    const j = await cbApi('database.addDocument', {
      collectionName: 'wb_sync',
      _id: k,
      data: { k, v, updated: Date.now() }
    });
    if (j.code === 0 || j.requestId) ok++;
  }
  return { ok: true, uploaded: ok, total: Object.keys(data).length };
}

async function cloudDownload() {
  if (!_cbToken) await cloudLogin();
  const j = await cbApi('database.getDocuments', {
    collectionName: 'wb_sync',
    limit: 1000
  });
  const docs = {};
  (j.data || []).forEach(d => {
    const doc = d.data || d;
    if (doc && doc.k) docs[doc.k] = doc.v;
  });
  return { ok: true, count: Object.keys(docs).length, data: docs };
}

function cors(body, status = 200) {
  return {
    statusCode: status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    },
    body: JSON.stringify(body)
  };
}

// 解析 HTTP body（兼容函数 URL 可能的 base64 编码）
async function parseBody(event) {
  let body = event.body;
  if (body == null) return {};
  if (typeof body === 'string') {
    if (event.isBase64Encoded) {
      body = Buffer.from(body, 'base64').toString('utf8');
    }
    try { body = JSON.parse(body); } catch (e) { throw new Error('body 不是合法 JSON'); }
  }
  return body || {};
}

exports.main_handler = async (event, context) => {
  try {
    if (!APPID || !APPSECRET) {
      return cors({ ok: false, error: '未配置 WECHAT_APPID / WECHAT_APPSECRET 环境变量' }, 500);
    }
    // 定时器触发（无 httpMethod）
    const isTimer = event.Type === 'Timer' || (!event.httpMethod && !event.body);
    if (isTimer) {
      const r = await runScheduled();
      return cors(r);
    }
    // HTTP 触发（函数 URL）
    if (event.httpMethod === 'OPTIONS') return cors({ ok: true });

    // 测试连接：GET 请求 或 mode='test' → 仅校验密钥，不发布
    if (event.httpMethod === 'GET') {
      try {
        const token = await getAccessToken();
        return cors({ ok: true, test: true, tokenLen: (token || '').length, note: '函数可访问微信接口，密钥有效' });
      } catch (e) {
        return cors({ ok: false, test: true, error: '密钥校验失败: ' + e.message }, 500);
      }
    }

    let body = {};
    try { body = await parseBody(event); }
    catch (e) { return cors({ ok: false, error: e.message }, 400); }

    if (body.mode === 'test') {
      try {
        const token = await getAccessToken();
        return cors({ ok: true, test: true, tokenLen: (token || '').length, note: '函数可访问微信接口，密钥有效' });
      } catch (e) {
        return cors({ ok: false, test: true, error: '密钥校验失败: ' + e.message }, 500);
      }
    }
    if (body.mode === 'schedule') {
      const r = await scheduleDraft(body);
      return cors(r);
    }
    // ===== 云同步代理（通过 SCF 中转，解决浏览器无法直连 CloudBase 域名） =====
    if (body.mode === 'cloud_login') {
      try { return cors(await cloudLogin()); }
      catch (e) { return cors({ ok: false, error: e.message }, 500); }
    }
    if (body.mode === 'cloud_upload') {
      try { return cors(await cloudUpload(body.data || {})); }
      catch (e) { return cors({ ok: false, error: e.message }, 500); }
    }
    if (body.mode === 'cloud_download') {
      try { return cors(await cloudDownload()); }
      catch (e) { return cors({ ok: false, error: e.message }, 500); }
    }
    // 默认：立即发布
    const r = await publishNow(body);
    return cors(r);
  } catch (e) {
    return cors({ ok: false, error: e.message }, 500);
  }
};

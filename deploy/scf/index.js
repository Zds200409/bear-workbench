/**
 * 熊熊工作台 · 公众号发布（腾讯云 SCF 版）
 * 零依赖：仅用 Node 18 内置 fetch，无需 npm install
 *
 * 能力：
 *  1) 立即发布：前端 POST {mode:'now', title, author, digest, contentHtml, coverBase64}
 *     → 上传封面 → 写草稿箱 → 提交发布，返回 publish_id
 *  2) 定时发布：前端 POST {mode:'schedule', time:'09:30', ...article}
 *     → 在微信草稿箱创建一篇标题带【定时·09:30】标记的草稿（不发布）
 *  3) 定时触发：SCF 控制台建一个「每 15 分钟」的定时器调用本函数
 *     → 扫描草稿箱，找到标记且到点(<=当前时间)且今天未发的草稿，提交发布并删除该草稿
 *
 * 密钥：WECHAT_APPID / WECHAT_APPSECRET 配置在函数「环境变量」，不进代码/仓库
 */
const APPID = process.env.WECHAT_APPID || '';
const APPSECRET = process.env.WECHAT_APPSECRET || '';
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
        published.push({ title: it.title, error: e.message });
      }
    }
  }
  return { ok: true, published };
}

// 立即发布
async function publishNow(p) {
  const coverId = await uploadCover(p.coverBase64);
  const media_id = await addDraft({
    title: p.title, author: p.author, digest: p.digest,
    contentHtml: p.contentHtml, thumb_media_id: coverId
  });
  const publish_id = await submitPublish(media_id);
  return { ok: true, publish_id };
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

exports.main_handler = async (event, context) => {
  try {
    if (!APPID || !APPSECRET) {
      return cors({ ok: false, error: '未配置 WECHAT_APPID / WECHAT_APPSECRET 环境变量' }, 500);
    }
    // 定时器触发（无 httpMethod）
    if (!event.httpMethod && event.Type !== 'Timer' && typeof event === 'object' && !event.body) {
      // 保守判断为定时器
    }
    const isTimer = event.Type === 'Timer' || (!event.httpMethod && !event.body);
    if (isTimer) {
      const r = await runScheduled();
      return cors(r);
    }
    // HTTP 触发（API 网关 / Web 函数）
    if (event.httpMethod === 'OPTIONS') return cors({ ok: true });
    let body = event.body;
    if (typeof body === 'string') {
      try { body = JSON.parse(body); } catch (e) { return cors({ ok: false, error: 'body 不是合法 JSON' }, 400); }
    }
    body = body || {};
    if (body.mode === 'schedule') {
      const r = await scheduleDraft(body);
      return cors(r);
    }
    // 默认：立即发布
    const r = await publishNow(body);
    return cors(r);
  } catch (e) {
    return cors({ ok: false, error: e.message }, 500);
  }
};

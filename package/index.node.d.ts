/// <reference path="./core.d.ts" />
/// <reference path="./core.node.d.ts" />

/**
 * Node.js 环境类型入口。
 *
 * 在共享类型定义（core.d.ts）之上，叠加 Node.js 专属定义（core.node.d.ts），
 * 因此 `version`、`parseContext`、`getCloudbaseContext`、`app.callWxOpenApi`、
 * `auth.getEndUserInfo` 等仅在 Node.js 运行时可用的能力，只有通过本入口才可见。
 */

export = cloudbase
export as namespace cloudbase

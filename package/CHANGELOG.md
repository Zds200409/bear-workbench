# 更新日志

## [3.6.5] 2026-07-28
- [Fixed] 根治使用方在浏览器 / SSR（Next.js、Nuxt 等）打包时因 Node 可选依赖（`jsonwebtoken`、`@cloudbase/signature-nodejs`、`ws`）报 `Module not found: Can't resolve 'xxx'` 的问题：这些依赖改由内部 `optionalRequire` 在运行时按需加载，模块名以片段运行时拼接、`require` 从宿主运行时获取，打包器静态分析阶段无法识别，因此不会去解析它们。使用方无需再配置 `next.config.js` 的 `serverExternalPackages` 或 webpack 兜底
- [Changed] Node 适配器的 `wsClass` 改为 getter 懒加载：仅当实时能力（realtime / database）真正读取该属性时才加载 `ws`，未用到实时能力的 Node 场景不会加载 `ws`；并新增防重复标记，避免未安装 `ws` 时重复执行加载与重复打印安装提示

## [3.6.4] 2026-07-24
- [Fixed] 自定义登录场景下用户通过 `init({ env, auth: { credentials } })` 传入的私钥无法被 `createTicket` 读取的问题：`getSecretInfo()` 此前仅从顶层 `config.credentials` 读取，现同时兼容 `config.auth.credentials`（js-sdk 风格）与顶层 `credentials`（node-sdk 风格）两种传法
- [Fixed] `dealNodeAdapterConfig()` 回填 `config.auth.credentials` 时会被空值覆盖的问题，改为保留用户显式传入的 `credentials`；并修正其兜底值类型（`ICredentialsInfo` 对象，无有效值时为 `undefined`，不再用空字符串）

## [3.6.3] 2026-07-17
- [Changed] `timeout` 默认值区分运行环境：Node.js 环境（云函数/云托管/自建服务器）默认不设置超时（不限制），以适配服务端长耗时请求；Web 等非 Node.js 环境仍默认 15000ms。显式传入 `timeout` 时以传入值为准
- [Changed] `NodeRequest` 未设置 `timeout` 时不再施加超时中断（`download` 及 `createAbortController` 均按需启用超时），仅在显式传入 `timeout` 时启用
- [Changed] Auth `updateUser` 不再支持修改密码：传入 `password` / `new_password` 参数将抛出错误，请改用 `resetPasswordForOld`（旧密码修改）、`resetPasswordForEmail`（验证码重置）或 `reauthenticate`（重新认证后改密）
- [Changed] `UpdateUserReq` 类型从基础请求中剔除 `password` / `new_password` 字段（标记为 `never`）

## [3.6.2] 2026-06-29
- [Fixed] `getSecretInfo()` 中顶层 secretId/secretKey 场景下 `sessionToken` 错误地从环境变量 `TENCENTCLOUD_SESSIONTOKEN` 取值，修正为从 config 顶层 `sessionToken` 字段取值
- [Fixed] `getSecretInfo()` 中 `config.auth` 场景下 `sessionToken` 错误地从环境变量取值，修正为从 `config.auth.sessionToken` 取值
- [Fixed] `NodeRequest` V3 签名时 `secretId`/`secretKey`/`sessionToken` 取值逻辑修正为同时支持顶层配置和 `config.auth` 配置（`config.auth` 优先级更高）

## [3.6.1] 2026-06-29
- [Fixed] AI 模块：优先使用原生 Web Streams API（Node.js >= 18 / 现代浏览器），避免 `web-streams-polyfill` 在高版本环境中的兼容问题
- [Fixed] 浏览器端 webpack 构建增加 `resolve.fallback: { crypto: false }`，避免引入 Node.js `crypto` 模块的 polyfill
- [Changed] `@cloudbase/database` 依赖 `bson` 版本从 `^7.1.1` 降级为 `^6.10.3`
- [Changed] `@cloudbase/mysql` 及 `database` 的 `typescript` devDependency 升级至 `^5.0.0`
- [Changed] `@cloudbase/mysql` tsconfig.esm.json 补充 `moduleResolution: "node"`

## [3.6.0] 2026-06-29
- [Fixed] 修复 Node 端构建时 `webpack.DefinePlugin` 将 `process.env` 整体替换为静态对象，导致运行时无法读取 `TENCENTCLOUD_SECRETID`、`TENCENTCLOUD_SECRETKEY`、`SCF_NAMESPACE` 等环境变量的问题
- [Fixed] `getSecretInfo()` 改为从 `getCloudbaseContext()` 统一取值（而非直接 `getEnv()`），确保 context 中的环境变量优先级正确
- [Fixed] `getCloudbaseContext()` 新增 `CLOUDBASE_APIKEY` 环境变量的采集
- [Fixed] AI 模块：Node.js 适配器非流式场景下 `responseData` 已是 JSON 对象时，跳过 ReadableStream 解析直接返回结果

## [3.5.4] 2026-06-25
- [Fixed] 修复 Node.js ESM 环境下初始化时 `getWxDefaultAdapter` 返回空对象导致 `useAdapters` 调用 `isMatch()` 报 `TypeError: i is not a function` 的问题
- [Fixed] 修复 GATEWAY 模式下文档型数据库集合查询时，后端返回数据缺少 `list` 字段导致 `formatResDocumentData` 报 `TypeError: Cannot read properties of undefined (reading 'map')` 的问题

## [3.5.3] 2026-06-25
- [Added] App 实例新增 `registerHost(host, protocol?)` 方法，一次性设置所有端点（CLOUD_API / GATEWAY），只需传入 host 地址自动拼接路径
- [Added] `cloudbase.app.App` 类型声明补充 `registerHost`、`getEndPointWithKey`、`registerEndPoint`、`registerEndPointWithKey`、`parseCaptcha` 实例方法
- [Added] `ai(options?)` 支持传入 `baseUrl` 参数自定义 AI 服务地址
- [Fixed] AI 模块支持 `registerEndPointWithKey` 后端点动态变更自动生效（`aiBaseUrl` / `aiBotBaseUrl` 改为动态 getter）
- [Fixed] MySQL/RDB 模块支持端点动态变更，`registerEndPointWithKey` 后新请求自动使用最新 GATEWAY 地址
- [Fixed] Auth/OAuth 模块支持端点动态变更，`registerEndPointWithKey` 后认证请求自动跟随最新 apiOrigin

## [3.5.2] 2026-06-24
- [Fixed] 修复 Node 服务端（secretId/secretKey 认证）场景下，`CloudbaseRequest.fetch` 因无 `oauthInstance` 导致请求失败的问题，使 RDB 等模块能正确通过底层 `NodeRequest` 的 V3 签名自动换取 access_token

## [3.5.1] 2026-06-23
- [Added] Auth 模块新增 `AuthErrorCode` 数字错误码枚举及 `AuthError.errorCode`、`retryAfter` 属性
- [Added] `AuthErrorCategory` 新增 `RATE_LIMITED`、`CAPTCHA_REQUIRED`、`CAPTCHA_INVALID`、`MFA_REQUIRED`、`PRECONDITION_FAILED`、`VERIFICATION_FAILED` 分类
- [Fixed] Auth `updateUser` 中 `verifyOtp` 校验失败时正确返回错误；仅在实际修改时触发 `USER_UPDATED` 事件
- [Fixed] 验证码发送补充 `target: 'USER'` 参数；修复 abort 监听器泄漏、容错解析非 JSON 响应体

## [3.5.0] 2026-06-23
- [Added] Storage 模块新增 Neo 环境对象存储能力，`app.storage.from(bucketId)` 返回全新对象存储客户端（上传/下载/删除/移动/复制/签名 URL 等）
- [Added] `app.storage` 新增 Bucket 管理 API：`listBuckets` / `getBucket` / `createBucket` / `updateBucket` / `deleteBucket`
- [Changed] `app.storage.from()` 无参仍返回 `ClassicStorageFileApi`（行为不变）；传入 `bucketId` 返回 Neo 对象存储客户端
- [Deprecated] 传统顶层云存储 API（`uploadFile` / `downloadFile` / `deleteFile` 等）标记为废弃，推荐改用 `app.storage.from(bucketId)` 新 API

## [3.4.8] 2026-06-16
- [Fixed] 修复 `getUser` 和 `getSession` 在无凭证或 `accessKey` 模式下返回 `user` 统一返回 `null`

## [3.4.7] 2026-06-16
- [Fixed] Auth 模块 `verifyOtp` 的 `token` 参数兼容 `number` 和 `string` 类型

## [3.4.6] 2026-06-12
- [Refactor] 重构 Node.js adapter 层，整合微信云开发相关请求逻辑（callWxOpenApi / callWxPayApi / callCompatibleWxOpenApi / wxCallContainerApi）
- [Fixed] 修复微信云开发 form-data 请求返回值格式与旧版不一致的问题，正确返回 Buffer 类型响应
- [Changed] request 模块新增 responseType: 'buffer' 支持，兼容二进制响应场景

## [3.4.5] 2026-06-10
- [Fixed] 服务端 body 为 stream 时设置 duplex: 'half'

## [3.4.4] 2026-06-10
- [Fixed] 服务端增加 `bson` 依赖

## [3.4.3] 2026-06-10
- [Fixed] 修复 Node.js 环境下调用 downloadFile 报 `window is not defined` 的问题

## [3.4.2] 2026-06-10
- [Fixed] 修复 bundledDependencies 子包版本号导致 yarn install 时从 registry 查找失败的问题

## [3.4.1] 2026-06-10
- [Fixed] 修复 database 模块文档查询相关问题

## [3.4.0] 2026-06-09
- [Changed] 移除 analytics 模块，不再随主包发布
- [Changed] 子模块随主包一起发布，不再单独进行模块独立版本更新
- [Added] 支持 sub-path exports 按需引入（如 `@cloudbase/js-sdk/auth`）

## [3.3.13] 2026-05-29
- [Fixed] 修复云函数相关问题

## [3.3.12] 2026-05-28
- [Fixed] 适配 v1/user/me 接口返回字段变化，hasPassword 改用 password === 'SET' 判断

## [3.3.11] 2026-05-26
- [Fixed] 修复 _getCredentials 中 credentials 为空时访问 scope 属性报错的问题

## [3.3.10] 2026-05-19
- [Changed] fetch 请求支持 withCredentials 参数控制是否携带鉴权信息

## [3.3.9] 2026-05-08
- [Changed] endPointMode 默认值更新为 GATEWAY

## [3.3.8] 2026-05-07
- [Added] getUser 支持从 providers 中匹配当前小程序 appId 对应的 open_id

## [3.3.7] 2026-05-06
- [Fixed] getUser 返回用户信息支持 open_id 字段

## [3.3.6] 2026-04-30
- [Added] 文档型数据库支持批量新增数据

## [3.3.5] 2026-04-29
- [Added] 添加类型定义

## [3.3.4] 2026-04-21
- [Added] database where条件支持事务

## [3.3.3] 2026-04-17
- [Fixed] signUp 修复 phone_number 为空时格式化报错的问题

## [3.3.2] 2026-04-13
- [Changed] getUser/getCurrentUser 支持 isRefresh 参数控制是否发请求获取最新用户信息，默认每次请求最新数据

## [3.3.1] 2026-04-13
- [Added] getUser 支持读缓存和读接口数据可选

## [3.3.0] 2026-04-08
- [Added] database 支持 http api

## [3.2.2] 2026-04-02
- [Added] signInWithOtp 支持 emailRedirectTo

## [3.2.1] 2026-03-24
- [Added] 增加帮助信息

## [3.2.0] 2026-03-23
- [Added] 小程序手机号授权支持服务商类型小程序

## [3.1.12] 2026-03-16
- [Fixed] node 模式下请求参数增加 envName

## [3.1.11] 2026-03-16
- [Fixed] node 模式下 v3 签名兼容 headers 为空场景

## [3.1.9] 2026-03-13
- [Added] 增强类型声明以及错误提示

## [3.1.8] 2026-03-12
- [Fixed] 增加 storage 类型定义

## [3.1.7] 2026-03-12
- [Fixed] getVerification 增加 phone_number 参数格式化

## [3.1.6] 2026-03-12
- [Added] signInWithOtp 增加可选参数 options.shouldCreateUser 控制是否自动注册用户

## [3.1.5] 2026-03-11
- [Changed] 完善 database 类型定义
- [Added] 异常时增加 requestId 返回

## [3.1.4] 2026-03-11
- [Fixed] verifyOAuth 返回预设重定向地址  

## [3.1.3] 2026-03-10
- [Fixed] verifyOAuth 兼容 hash 地址  

## [3.1.2] 2026-03-06
- [Fixed] 修复 HBuilderX 找不到 SourceMap 问题

## [3.1.1] 2026-03-03
- [Changed] 更新微信小程序端adapter

## [3.1.0] 2026-03-03
- [Fixed] 兼容多端

## [3.0.6] 2026-03-03
- [Fixed] 修复 Node.js 端签名问题

## [3.0.5] 2026-03-01
- [Added] Node.js 端支持 SecretId 和 SecretKey

## [3.0.4] 2026-02-27
- [Added] 支持 Node.js 端

## [3.0.3] 2026-02-26
- [Fixed] 修复用户信息nickName获取问题

## [3.0.2] 2026-02-12
- [Fixed] 修复用户信息role获取问题

## [3.0.0] 2026-02-10
- [Changed] endPointMode 默认启用 GATEWAY 模式

## [2.28.4] 2026-05-06
- [Fixed] getUser 返回用户信息支持 open_id 字段

## [2.28.3] 2026-04-30
- [Added] 文档型数据库支持批量新增数据

## [2.28.2] 2026-04-29
- [Added] 类型定义

## [2.28.1] 2026-04-23
- [Added] 海外支持

## [2.27.5] 2026-04-21
- [Added] database where条件支持事务

## [2.27.4] 2026-04-17
- [Fixed] signUp 修复 phone_number 为空时格式化报错的问题

## [2.27.3] 2026-04-13
- [Added] getUser 支持读缓存和读接口数据可选

## [2.27.2] 2026-04-02
- [Added] signInWithOtp 支持 emailRedirectTo

## [2.27.1] 2026-03-24
- [Added] 增加帮助信息

## [2.27.0] 2026-03-23
- [Added] 小程序手机号授权支持服务商类型小程序

## [2.26.2] 2026-03-13
- [Added] 增强类型声明以及错误提示

## [2.26.1] 2026-03-12
- [Fixed] getVerification 增加 phone_number 参数格式化

## [2.26.0] 2026-03-12
- [Added] signInWithOtp 增加可选参数 options.shouldCreateUser 控制是否自动注册用户

## [2.25.11] 2026-03-11
- [Fixed] verifyOAuth 返回预设重定向地址  

## [2.25.10] 2026-03-10
- [Fixed] verifyOAuth 兼容 hash 地址  

## [2.25.9] 2026-03-06
- [Fixed] 修复 HBuilderX 找不到 SourceMap 问题

## [2.25.8] 2026-03-03
- [Changed] 更新微信小程序端adapter

## [2.25.5] 2026-02-04
- [Fixed] 修复用户信息role获取问题

## [2.25.4] 2026-02-04
- [Added] encryptlong 兼容多端

## [2.25.3] 2026-01-28
- [Fixed] GET/HEAD 请求时，将请求体设置为空
- [Fixed] auth\.wsWebSign action 一直走 tcb api 请求

## [2.25.2] 2026-01-26
- [Added] 新版本 auth api 上线

## [2.25.1] 2026-01-22
- [Added] 更新 database 依赖版本

## [2.25.0] 2026-01-22
- [Changed] 构建 CI 发布、Node.js 版本升级至 22、代码优化

## [2.24.10] 2026‑01‑14
- [Changed] 更新 getDeviceInfo 和错误处理

## [2.24.9] 2026‑01‑13
- [Changed] 更新数据库依赖至 0.10.0、多认证支持、清理构建文件

## [2.24.8] 2026‑01‑12
- [Added] 添加混元 AR 图像模型支持

## [2.24.7 及更早版本] 2025-12-29 至 2026-01-12
- 略

## [1.4.1] 2021-03-08
- [Fixed] 修复上传文件进度获取异常 bug

## [1.4.0] 2020-12-16
- [Added] 新增 analytics 接口

## [1.3.3] 2020-09-25
- [Changed] 优化 TypeScript 语法提示
- [Fixed] 修复未登录调用数据库报错问题

## [1.3.2] 2020-09-24
- [Fixed] 微信小程序插件环境获取 appSign 取插件 AppId
- [Fixed] storage 满仓情况下写入抛出错误

## [1.3.1] 2020-09-23
- [Fixed] 兼容微信小程序插件环境

## [1.3.0] 2020-09-11
- [Changed] 数据库实时推送功能抽离为独立的模块

## [1.2.5] 2020-09-07
- [Fixed] 修复微信小程序真机环境报错

## [1.2.3] 2020-09-03
- [Changed] 优化 API 语法提示

## [1.2.2] 2020-09-01
- [Changed] 优化开发环境的错误信息

## [1.2.1] 2020-08-26
- [Added] 新增 `Auth.getAuthHeaderAsync` API

## [1.1.4] 2020-08-25
- [Fixed] 修复微信公众号登录 Bug
- [Fixed] 修复微信小程序上传文件 Bug

## [1.1.2] 2020-08-24
- [Fixed] 修复小程序无法直接引用 npm 包问题

## [1.1.1] 2020-08-19
- [Fixed] 修复用户名密码登录bug

## [1.1.0] 2020-08-18
- [Added] 增加 `cloudbase.registerSdkName` API

## [1.0.4] 2020-08-13
- [Fixed] 修复实时推送多环境混淆问题

## [1.0.3] 2020-08-11
- [Fixed] 修复由 Crypto-JS 引起的打包体积过大问题

## [1.0.2] 2020-08-10
- [Changed] 优化版本统计信息

## [1.0.1] 2020-08-05
- [Fixed] `Storage.downloadFile` 可将文件直接下载到本地

## [1.0.0] 2020-07-31
- [Added] 发布 1.0.0 版本，旧版本 SDK [tcb-js-sdk](https://github.com/TencentCloudBase/tcb-js-sdk) 未来不再增加新功能

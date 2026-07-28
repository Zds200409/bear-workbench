## @cloudbase/js-sdk

云开发 Cloudbase JavaScript SDK。

### 安装使用

@cloudbase/js-sdk 分为两种形式：

1. 全量-包含所有云开发功能 API；
2. 分模块-各功能拆分为细粒度的模块单独提供服务。

#### 包管理器

```bash
# npm
npm install @cloudbase/js-sdk -S
# yarn
yarn add @cloudbase/js-sdk
```

引入时可选择全量引入：

```javascript
import cloudbase from '@cloudbase/js-sdk'
```

或者按需分模块引入：

```javascript
// 内核
import cloudbase from '@cloudbase/js-sdk/app'
// 登录模块
import cloudbase from '@cloudbase/js-sdk/auth'
// 函数模块
import cloudbase from '@cloudbase/js-sdk/functions'
// 云存储模块
import cloudbase from '@cloudbase/js-sdk/storage'
// 数据库模块
import cloudbase from '@cloudbase/js-sdk/database'
// 数据模型模块
import cloudbase from '@cloudbase/js-sdk/model'
```

#### 在 Node / 服务端（含 SSR）使用

在浏览器、小程序、Node.js / 服务端（含 Next.js、Nuxt 等 SSR）环境下，**直接安装 `@cloudbase/js-sdk` 即可，无需任何额外依赖，也无需在打包器中做任何配置**（例如不需要 `next.config.js` 里的 `serverExternalPackages` 或 `webpack` 兜底）。

SDK 的 Node 端部分能力依赖以下三个包，它们是**可选依赖**——仅当你在 Node 服务端**真正调用**对应能力时才需要安装：

| 能力 | 需要的可选依赖 | 安装命令 |
| --- | --- | --- |
| 自定义登录票据（`createTicket`） | `jsonwebtoken` | `npm install jsonwebtoken` |
| Node 环境请求签名 | `@cloudbase/signature-nodejs` | `npm install @cloudbase/signature-nodejs` |
| Node 环境 WebSocket（实时能力） | `ws` | `npm install ws` |

一次性安装全部：

```bash
npm install jsonwebtoken @cloudbase/signature-nodejs ws
```

> **为什么无需打包器配置**：这三个可选依赖并非在源码里以静态 `import '包名'` 或 `require('包名')`（字面量）的方式引用，而是通过内部的运行时加载工具按需加载——模块名在运行时由片段拼接得到、`require` 从宿主运行时获取。因此打包器（webpack / Next.js / Nuxt 等）在**静态分析阶段完全看不到这些模块名**，不会去解析它们，也就不会出现 `Module not found: Can't resolve 'xxx'` 报错。未安装时只有在 Node 运行时真正调用相关能力才会给出「请安装 xxx」的友好提示，纯浏览器 / 未用到这些能力的项目则完全无感。

#### CDN 引入

1. 引入全量 js 文件

   ```html
   <!-- 全量js文件 -->
   <script src="/cloudbase.full.js"></script>
   ```

2. 分模块引入
   ```html
   <!-- 主js文件 -->
   <script src="/cloudbase.js"></script>
   <!-- 登录模块 -->
   <script src="/cloudbase.auth.js"></script>
   <!-- 函数模块 -->
   <script src="/cloudbase.functions.js"></script>
   <!-- 云存储模块 -->
   <script src="/cloudbase.storage.js"></script>
   <!-- 数据库模块 -->
   <script src="/cloudbase.database.js"></script>
   <!-- 数据模型模块 -->
   <script src="/cloudbase.model.js"></script>
   ```

### 构建

构建分为两部分：

1. 构建 npm 包，产出文件分属于各模块子目录；
2. 构建 CDN 托管的 js 文件，产出文件存放于`cdnjs`目录，按版本划分

```bash
npm run build
```

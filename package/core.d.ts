/**
 * 共享类型定义（Web + Node.js 通用），以 ambient 形式声明。
 *
 * 说明：本文件不能出现顶层 `import` / `export` 语句，否则会变成模块而无法作为
 * 全局 ambient 命名空间被 `index.d.ts` / `index.node.d.ts` 通过三斜线引用聚合。
 * 因此所有外部依赖类型均以内联 `import('...')` 类型别名的形式声明在命名空间内部，
 * 既避免污染全局作用域，又不会让本文件变成模块。
 */
declare namespace cloudbase {
  type KV<T> = {
    [key: string]: T
  }

  type ExcludeOf<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

  type MethodType = 'request' | 'post' | 'get' | 'head' | 'patch' | 'delete' | 'put'

  interface ICallApiOptions {
    /** 请求的path */
    path?: string
    /** 请求方法 */
    method?: MethodType
    /** 请求头 */
    headers?: KV<any>
    /** 请求体，根据content-type可以是不同类型 */
    body?: KV<any> | string
    /** 可传token，如果没有传值，则默认用当前登录的token */
    token?: string
  }

  interface ICloudbaseApis {
    [apiName: string]: {
      [method in MethodType]: (callApiOptions: ICallApiOptions, opts?: KV<any>) => Promise<ResponseObject['data']>
    }
  }

  // ===== 外部依赖类型别名（内联 import 类型，避免顶层 import 使本文件成为模块）=====
  type OrmClient = import('@cloudbase/model').OrmClient
  type OrmRawQueryClient = import('@cloudbase/model').OrmRawQueryClient
  type IMySqlClient = import('@cloudbase/mysql').IMySqlClient
  type AI = import('@cloudbase/ai').AI
  type CloudbaseAdapter = import('@cloudbase/adapter-interface').CloudbaseAdapter
  type ResponseObject = import('@cloudbase/adapter-interface').ResponseObject
  type ICloudbaseUpgradedConfig = import('@cloudbase/types').ICloudbaseUpgradedConfig
  type ICloudbase = import('@cloudbase/types').ICloudbase
  type Persistence = import('@cloudbase/types').Persistence
  type LANGS = import('@cloudbase/types').LANGS
  type ICustomReqOpts = import('@cloudbase/types/functions').ICustomReqOpts

  // ===== @cloudbase/auth 相关类型别名 =====
  type SignInRes = import('@cloudbase/auth').SignInRes
  type GetUserRes = import('@cloudbase/auth').GetUserRes
  type CommonRes = import('@cloudbase/auth').CommonRes
  type SignInWithOtpRes = import('@cloudbase/auth').SignInWithOtpRes
  type SignInOAuthRes = import('@cloudbase/auth').SignInOAuthRes
  type GetClaimsRes = import('@cloudbase/auth').GetClaimsRes
  type ResetPasswordForEmailRes = import('@cloudbase/auth').ResetPasswordForEmailRes
  type GetUserIdentitiesRes = import('@cloudbase/auth').GetUserIdentitiesRes
  type LinkIdentityRes = import('@cloudbase/auth').LinkIdentityRes
  type ReauthenticateRes = import('@cloudbase/auth').ReauthenticateRes
  type ResendRes = import('@cloudbase/auth').ResendRes
  type UpdateUserWithVerificationRes = import('@cloudbase/auth').UpdateUserWithVerificationRes
  type OnAuthStateChangeCallback = import('@cloudbase/auth').OnAuthStateChangeCallback
  type SignInWithPasswordReq = import('@cloudbase/auth').SignInWithPasswordReq
  type SignInWithIdTokenReq = import('@cloudbase/auth').SignInWithIdTokenReq
  type SignInWithOAuthReq = import('@cloudbase/auth').SignInWithOAuthReq
  type VerifyOAuthReq = import('@cloudbase/auth').VerifyOAuthReq
  type VerifyOtpReq = import('@cloudbase/auth').VerifyOtpReq
  type LinkIdentityReq = import('@cloudbase/auth').LinkIdentityReq
  type UnlinkIdentityReq = import('@cloudbase/auth').UnlinkIdentityReq
  type UpdateUserReq = import('@cloudbase/auth').UpdateUserReq
  type SignInWithOtpReq = import('@cloudbase/auth').SignInWithOtpReq
  type ResetPasswordForOldReq = import('@cloudbase/auth').ResetPasswordForOldReq
  type ResendReq = import('@cloudbase/auth').ResendReq
  type SetSessionReq = import('@cloudbase/auth').SetSessionReq
  type DeleteMeReq = import('@cloudbase/auth').DeleteMeReq
  type SignUpRes = import('@cloudbase/auth').SignUpRes

  // ===== @cloudbase/oauth authModels 命名空间别名 =====
  namespace authModels {
    type BindPhoneRequest = import('@cloudbase/oauth').authModels.BindPhoneRequest
    type BindEmailRequest = import('@cloudbase/oauth').authModels.BindEmailRequest
    type UnbindProviderRequest = import('@cloudbase/oauth').authModels.UnbindProviderRequest
    type VerifyRequest = import('@cloudbase/oauth').authModels.VerifyRequest
    type VerifyResponse = import('@cloudbase/oauth').authModels.VerifyResponse
    type GetVerificationRequest = import('@cloudbase/oauth').authModels.GetVerificationRequest
    type GetVerificationResponse = import('@cloudbase/oauth').authModels.GetVerificationResponse
    type GetCustomSignTicketFn = import('@cloudbase/oauth').authModels.GetCustomSignTicketFn
    type SetPasswordRequest = import('@cloudbase/oauth').authModels.SetPasswordRequest
    type ModifyUserBasicInfoRequest = import('@cloudbase/oauth').authModels.ModifyUserBasicInfoRequest
    type BindWithProviderRequest = import('@cloudbase/oauth').authModels.BindWithProviderRequest
    type QueryUserProfileRequest = import('@cloudbase/oauth').authModels.QueryUserProfileRequest
    type QueryUserProfileResponse = import('@cloudbase/oauth').authModels.QueryUserProfileResponse
    type GrantProviderTokenRequest = import('@cloudbase/oauth').authModels.GrantProviderTokenRequest
    type GrantProviderTokenResponse = import('@cloudbase/oauth').authModels.GrantProviderTokenResponse
    type PatchProviderTokenRequest = import('@cloudbase/oauth').authModels.PatchProviderTokenRequest
    type PatchProviderTokenResponse = import('@cloudbase/oauth').authModels.PatchProviderTokenResponse
    type SignInWithProviderRequest = import('@cloudbase/oauth').authModels.SignInWithProviderRequest
    type GrantTokenRequest = import('@cloudbase/oauth').authModels.GrantTokenRequest
    type GenProviderRedirectUriRequest = import('@cloudbase/oauth').authModels.GenProviderRedirectUriRequest
    type GenProviderRedirectUriResponse = import('@cloudbase/oauth').authModels.GenProviderRedirectUriResponse
    type ResetPasswordRequest = import('@cloudbase/oauth').authModels.ResetPasswordRequest
    type DeviceAuthorizeRequest = import('@cloudbase/oauth').authModels.DeviceAuthorizeRequest
    type DeviceAuthorizeResponse = import('@cloudbase/oauth').authModels.DeviceAuthorizeResponse
    type SudoRequest = import('@cloudbase/oauth').authModels.SudoRequest
    type SudoResponse = import('@cloudbase/oauth').authModels.SudoResponse
    type WithSudoRequest = import('@cloudbase/oauth').authModels.WithSudoRequest
    type UserProfile = import('@cloudbase/oauth').authModels.UserProfile
    type UserProfileProvider = import('@cloudbase/oauth').authModels.UserProfileProvider
    type Credentials = import('@cloudbase/oauth').authModels.Credentials
    type ProviderSubType = import('@cloudbase/oauth').authModels.ProviderSubType
    type ModifyPasswordWithoutLoginRequest = import('@cloudbase/oauth').authModels.ModifyPasswordWithoutLoginRequest
    type GetUserBehaviorLog = import('@cloudbase/oauth').authModels.GetUserBehaviorLog
    type GetUserBehaviorLogRes = import('@cloudbase/oauth').authModels.GetUserBehaviorLogRes
    type GetMiniProgramQrCodeRequest = import('@cloudbase/oauth').authModels.GetMiniProgramQrCodeRequest
    type GetMiniProgramQrCodeResponse = import('@cloudbase/oauth').authModels.GetMiniProgramQrCodeResponse
    type GetMiniProgramQrCodeStatusRequest = import('@cloudbase/oauth').authModels.GetMiniProgramQrCodeStatusRequest
    type GetMiniProgramQrCodeStatusResponse = import('@cloudbase/oauth').authModels.GetMiniProgramQrCodeStatusResponse
    type ToDefaultLoginPage = import('@cloudbase/oauth').authModels.ToDefaultLoginPage
    type SignoutRequest = import('@cloudbase/oauth').authModels.SignoutRequest
    type SignoutResponse = import('@cloudbase/oauth').authModels.SignoutResponse
    type SignInRequest = import('@cloudbase/oauth').authModels.SignInRequest
    type SignUpRequest = import('@cloudbase/oauth').authModels.SignUpRequest
  }
  interface SimpleStorage {
    getItem: (key: string) => Promise<string | null>
    removeItem: (key: string) => Promise<void>
    setItem: (key: string, value: string) => Promise<void>
    getItemSync: (key: string) => string | null
    removeItemSync: (key: string) => void
    setItemSync: (key: string, value: string) => void
  }

  interface ICloudbaseConfig {
    /** 是否国际站标记 */
    intl?: boolean
    /** 环境 ID，在腾讯云开发控制台 → 环境 → 环境总览中获取 */
    env?: string
    /**
     * 地域信息
     * @example 'ap-shanghai'
     */
    region?: string
    /** 网络请求超时上限，单位 ms，默认 15000 */
    timeout?: number
    /** 本地登录态保留期限 */
    persistence?: Persistence
    oauthClient?: any
    /** 是否开启调试模式 */
    debug?: boolean
    _fromApp?: ICloudbase
    clientId?: string
    oauthInstance?: any
    wxCloud?: any
    i18n?: {
      t: (text: string) => string
      LANG_HEADER_KEY: string
      lang: LANGS
    }
    accessKey?: string
    endPointMode?: EndPointKey
    lang?: LANGS
    /**
     * 认证相关配置
     * @example
     * ```typescript
     * cloudbase.init({
     *   env: 'your-env-id',
     *   auth: {
     *     detectSessionInUrl: true // 自动检测 URL 中的 OAuth 回调参数
     *   }
     * })
     * ```
     */
    auth?: ICloudbaseAuthConfig
  }

  /**
   * 认证相关配置（Web 通用部分）。
   * Node.js 专属字段（secretId / secretKey / sessionToken / secretType）
   * 通过 core.node.d.ts 的声明合并追加，仅在 Node.js 入口可见。
   */
  interface ICloudbaseAuthConfig {
    /** 是否自动检测 URL 中的 OAuth 回调参数，默认 false */
    detectSessionInUrl?: boolean
  }

  interface ICloudbaseExtension {
    name: string
    invoke(opts: any, app: ICloudbase): Promise<any>
  }

  interface Listeners {
    [key: string]: Function[]
  }

  interface ICloudbaseEvent {
    name: string
    target: any
    data: any
  }

  interface ICloudbaseEventEmitter {
    on(name: string, listener: Function): this
    off(name: string, listener: Function): this
    fire(event: string | ICloudbaseEvent, data?: any): this
  }

  interface ICloudbaseComponent {
    name: string
    entity: any
    namespace?: string
    injectEvents?: {
      bus: ICloudbaseEventEmitter
      events: string[]
    }
    IIFE?: boolean
  }

  interface ICloudbaseHook {
    entity: any
    target: string
  }

  type EndPointKey = 'CLOUD_API' | 'GATEWAY'

  interface ISetEndPointWithKey {
    key: EndPointKey
    url?: string
    protocol?: 'http' | 'https'
  }

  /**
   * 初始化Cloudbase
   *
   * @example
   * ```javascript
   * // 基本用法
   * const app = cloudbase.init({
   *   env: 'your-envid',
   *   timeout: 15000
   * });
   *
   * // 推荐：从环境变量读取环境 ID
   * const app = cloudbase.init({
   *   env: process.env.CLOUDBASE_ENV || import.meta.env.VITE_CLOUDBASE_ENV || 'your-envid'
   * });
   *
   * // 使用认证配置
   * const app = cloudbase.init({
   *   env: 'your-envid',
   *   auth: {
   *     detectSessionInUrl: true // 自动检测 URL 中的 OAuth 回调参数
   *   }
   * });
   * ```
   *
   * @param config 初始化配置
   * @param config.env 环境ID，在腾讯云开发控制台 → 环境 → 环境总览中获取
   * @param config.timeout 【可选】网络请求超时上限，单位`ms`，默认值`15000`
   * @param config.auth 【可选】认证相关配置
   *
   * @return {!cloudbase.app.App} 初始化成功的Cloudbase实例
   */
  function init(config?: ICloudbaseConfig): cloudbase.app.App

  /**
   * 检查 Cloudbase 实例是否已完成初始化
   *
   * @example
   * ```javascript
   * if (!cloudbase.isInitialized()) {
   *   cloudbase.init({ env: 'your-envid' });
   * }
   * ```
   *
   * @returns 是否已初始化
   */
  function isInitialized(): boolean

  function updateConfig(config: ICloudbaseUpgradedConfig): void

  function updateLang(lang: LANGS): void
  /**
   * 使用适配器，使用方式参考 {@link https://docs.cloudbase.net/api-reference/webv3/adapter#%E7%AC%AC-1-%E6%AD%A5%E5%AE%89%E8%A3%85%E5%B9%B6%E5%BC%95%E5%85%A5%E9%80%82%E9%85%8D%E5%99%A8}
   *
   * @example
   * ```javascript
   * cloudbase.useAdapters(adapter); // 使用单个适配器
   * cloudbase.useAdapters([         // 使用多个适配器
   *   adapterA,
   *   adapterB
   * ]);
   * ```
   *
   * @param adapters 适配器对象，入参可以为单个适配器对象，也可以是多个适配器对象的数组
   * @param options 适配器参数，可以在genAdapter中获取到该参数
   */
  function useAdapters(adapters: CloudbaseAdapter | CloudbaseAdapter[], options?: any): void
  /**
   * 注册扩展能力插件，使用方式参考 {@link https://docs.cloudbase.net/extension/abilities/image-examination.html#shi-yong-kuo-zhan}
   *
   * @example
   * ```javascript
   * cloudbase.registerExtension(ext);
   * ```
   *
   * @param ext 扩展能力插件对象
   */
  function registerExtension(ext: ICloudbaseExtension): void
  /**
   * 【谨慎操作】注册SDK的版本
   *
   * @example
   * ```javascript
   * cloudbase.registerVersion('1.2.1');
   * ```
   *
   * @param version SDK版本
   */
  function registerVersion(version: string): void
  /**
   * 【谨慎操作】注册SDK的名称
   *
   * @example
   * ```javascript
   * cloudbase.registerSdkName('cloudbase-js-sdk');
   * ```
   *
   * @param name SDK名称
   */
  function registerSdkName(name: string): void
  /**
   * 【谨慎操作】修改SDK请求的云开发服务地址
   *
   * @example
   * ```javascript
   * cloudbase.registerEndPoint('url','https');
   * ```
   *
   * @param url 服务地址
   * @param protocol 【可选】强制使用某种协议，默认与主站协议一致
   */
  function registerEndPoint(url: string, protocol?: 'http' | 'https'): void
  /**
   * 【谨慎操作】修改SDK请求的「云开发/网关」服务地址
   *
   * @example
   * ```javascript
   * cloudbase.registerEndPointWithKey({
   *   key: "GATEWAY",
   *   url: "",
   *   protocol: ""
   * });
   * ```
   *
   */
  function registerEndPointWithKey(props: ISetEndPointWithKey): void
  /**
   * 一次性设置所有端点，只需传入 host 地址，自动拼接路径
   * @param host - 主机地址，如 "43.144.98.4" 或 "//43.144.98.4"
   * @param protocol - 协议，默认 "http"
   */
  function registerHost(host: string, protocol?: 'http' | 'https'): void
  /**
   * 【谨慎操作】注册功能模块
   *
   * @example
   * ```javascript
   * cloudbase.registerComponent({});
   * ```
   *
   * @param component 功能模块对象
   */
  function registerComponent(component: ICloudbaseComponent): void
  /**
   * 【谨慎操作】注册hook
   *
   * @example
   * ```javascript
   * cloudbase.registerHook({});
   * ```
   *
   * @param hook hook对象
   */
  function registerHook(hook: ICloudbaseHook): void

  export interface models extends OrmClient, OrmRawQueryClient {}
}
/**
 * instance
 */
declare namespace cloudbase.app {
  interface App {
    /**
     * 创建Auth对象
     *
     * {@link https://docs.cloudbase.net/api-reference/webv3/authentication#appauth}
     *
     * @example
     * ```javascript
     * const app = cloudbase.init({
     *   env: 'your-envid'
     * });
     * const auth = app.auth({
     *   persistence: 'local'
     * });
     * ```
     *
     * @param options Auth初始化配置
     * @param options.persistence 本地登录态保留期限
     *
     * @return {!cloudbase.auth.App} Auth实例
     */
    auth: ((options?: { persistence: cloudbase.auth.Persistence }) => cloudbase.auth.App) & cloudbase.auth.App
    /**
     * 调用云函数
     *
     * {@link https://docs.cloudbase.net/api-reference/webv3/functions#callfunction}
     *
     * @example
     * ```javascript
     * const app = cloudbase.init({
     *   env: 'your-envid'
     * });
     * app.callFunction({
     *   name: 'function-name'
     *   data: {
     *     a: 1,
     *     b: 2
     *   }
     * }).then(res=>{
     *   console.log(res.result);
     * }});
     * ```
     *
     * @param options 被调用的云函数信息
     * @param options.name 云函数的名称
     * @param options.data 【可选】云函数的参数，默认为空
     * @param options.parse 【可选】设置为 `true` 时，当函数返回值为对象时，API 请求会返回解析对象，而不是 JSON 字符串，默认为`false`
     *
     * @return Promise-函数执行结果
     */
    callFunction(
      options: cloudbase.functions.ICallFunctionOptions,
      callback?: Function,
      customReqOpts?: ICustomReqOpts,
    ): Promise<cloudbase.functions.ICallFunctionResponse>
    /**
     * 调用云托管
     *
     * {@link https://docs.cloudbase.net/api-reference/webv3/cloudrun}
     *
     * @example
     * ```javascript
     * const app = cloudbase.init({
     *   env: 'your-envid'
     * });
     * app
     * .callContainer({
     * name: 'helloworld',
     * method: 'POST',
     * path: '/abc',
     * header:{
     *   'Content-Type': 'application/json; charset=utf-8'
     * },
     * data: {
     *   key1: 'test value 1',
     *   key2: 'test value 2'
     * },
     * })
     * .then((res) => {
     * console.log(res)
     * });
     * ```
     *
     * @param options 被调用的云托管信息
     * @param options.name 云托管的名称
     * @param options.data 【可选】云托管的参数，默认为空
     *
     * @return Promise-云托管执行结果
     */
    callContainer(
      options: cloudbase.functions.ICallFunctionOptions,
      customReqOpts?: ICustomReqOpts,
    ): Promise<ResponseObject>
    /**
     * 云存储-上传文件
     *
     * {@link https://docs.cloudbase.net/api-reference/webv3/storage#uploadfile}
     *
     * @example
     * ```javascript
     * const app = cloudbase.init({
     *   env: 'your-envid'
     * });
     * app.uploadFile({
     *   cloudPath: 'cloudPath',
     *   filePath: 'filePath',
     *   method: 'put',
     *   headers: {
     *      'Content-MD5': 'xxxxxx'
     *   }
     *   onUploadProgress: function(event){}
     * });
     * ```
     *
     * @param params
     * @param params.cloudPath 文件上传到云端后的绝对路径，包含文件名
     * @param params.filePath 被上传的文件对象
     * @param params.method 上传方法，默认为 put
     * @param params.headers 自定义头部字段
     * @param params.onUploadProgress 【可选】上传进度回调函数
     *
     * @return Promise-上传结果
     *
     * @deprecated 传统云存储 API 已不推荐使用，请改用 `app.storage.from().upload()`。
     */
    uploadFile(
      params: cloudbase.storage.ICloudbaseUploadFileParams,
      callback?: Function,
    ): Promise<cloudbase.storage.ICloudbaseUploadFileResult>
    /**
     * 云存储-下载文件
     *
     * {@link https://docs.cloudbase.net/api-reference/webv3/storage#downloadfile}
     *
     * @example
     * ```javascript
     * const app = cloudbase.init({
     *   env: 'your-envid'
     * });
     * app.downloadFile({
     *   fileID: 'cloudPath'
     * });
     * ```
     *
     * @param params
     * @param params.fileID 要下载的文件的 `id`，在控制台云存储中查看
     *
     * @return Promise-下载结果
     *
     * @deprecated 传统云存储 API 已不推荐使用，请改用 `app.storage.from().download()`。
     */
    downloadFile(
      params: cloudbase.storage.ICloudbaseDownloadFileParams,
      callback?: Function,
    ): Promise<cloudbase.storage.ICloudbaseDownloadFileResult>
    /**
     * 云存储-批量复制文件
     *
     *
     * @example
     * ```javascript
     * const app = cloudbase.init({
     *   env: 'your-envid'
     * });
     * app.copyFile({
     *   fileList: [
     *     {
     *       srcPath: '源文件的绝对路径，包含文件名。例如 foo/bar.jpg、foo/bar/baz.jpg 等，不能包含除[0-9 , a-z , A-Z]、/、!、-、_、.、、*和中文以外的字符，使用 / 字符来实现类似传统文件系统的层级结构',
     *       dstPath: '目标文件的绝对路径，包含文件名。例如 foo/bar.jpg、foo/bar/baz.jpg 等，不能包含除[0-9 , a-z , A-Z]、/、!、-、_、.、、*和中文以外的字符，使用 / 字符来实现类似传统文件系统的层级结构',
     *       overwrite: '当目标文件已经存在时，是否允许覆盖已有文件，默认 true',
     *       removeOriginal: '复制文件后是否删除源文件，默认 false'
     *     }
     *   ]
     * });
     * ```
     *
     * @param params
     * @param params.fileList 要复制的文件信息组成的数组
     *
     * @return Promise-复制结果
     *
     * @deprecated 传统云存储 API 已不推荐使用，请改用 `app.storage.from().copy()`。
     */
    copyFile(
      params: cloudbase.storage.ICloudbaseCopyFileParams,
      callback?: Function,
    ): Promise<cloudbase.storage.ICloudbaseCopyFileResult>
    /**
     * 云存储-获取文件的下载链接
     *
     * {@link https://docs.cloudbase.net/api-reference/webv3/storage#gettempfileurl}
     *
     * @example
     * ```javascript
     * const app = cloudbase.init({
     *   env: 'your-envid'
     * });
     * app.getTempFileURL({
     *   fileList: [
     *     '文件A的fileID',
     *     {
     *       fileID: '文件B的fileID',
     *       maxAge: 600 // 文件B的链接有效期，单位`ms`
     *     }
     *   ]
     * });
     * ```
     *
     * @param params
     * @param params.fileList 要下载的文件数组，数组元素可以是`string`或`Object`，如果是`string`代表文件ID，如果是`Object`可配置以下信息
     * @param params.fileList[].fileID 要下载的文件ID
     * @param params.fileList[].maxAge 下载链接的有效期，单位`ms`
     *
     * @return Promise-文件下载链接
     *
     * @deprecated 传统云存储 API 已不推荐使用，请改用 `app.storage.from().createSignedUrl()`。
     */
    getTempFileURL(
      params: cloudbase.storage.ICloudbaseGetTempFileURLParams,
      callback?: Function,
    ): Promise<cloudbase.storage.ICloudbaseGetTempFileURLResult>
    /**
     * 云存储-删除文件
     *
     * {@link https://docs.cloudbase.net/api-reference/webv3/storage#deletefile}
     *
     * @example
     * ```javascript
     * const app = cloudbase.init({
     *   env: 'your-envid'
     * });
     * app.deleteFile({
     *   fileList: [
     *     '文件A的fileID',
     *     '文件B的fileID'
     *   ]
     * });
     * ```
     *
     * @param params
     * @param params.fileList 要删除的文件ID数组
     *
     * @return Promise-删除结果
     *
     * @deprecated 传统云存储 API 已不推荐使用，请改用 `app.storage.from().remove()`。
     */
    deleteFile(
      params: cloudbase.storage.ICloudbaseDeleteFileParams,
      callback?: Function,
    ): Promise<cloudbase.storage.ICloudbaseDeleteFileResult>

    /**
     * 云存储-获取文件信息
     *
     * @deprecated 传统云存储 API 已不推荐使用，请改用 `app.storage.from().info()`。
     */
    getFileInfo(
      params: cloudbase.storage.ICloudbaseGetTempFileURLParams,
    ): Promise<cloudbase.storage.ICloudbaseGetFileInfoResult>
    /**
     * 云存储-获取上传元信息
     *
     *
     * @param params
     * @param callback
     *
     * @deprecated 传统云存储 API 已不推荐使用，请改用 `app.storage.from().createSignedUploadUrl()`。
     */
    getUploadMetadata(params: cloudbase.storage.ICloudbaseGetUploadMetadataParams, callback?: Function): Promise<any>

    /**
     * Supabase 风格的文件存储 API
     *
     * @example
     * ```typescript
     * const bucket = app.storage.from('my-bucket')
     * const { data, error } = await bucket.upload('path/to/file.jpg', file)
     * ```
     */
    storage: cloudbase.storage.StorageClient
    /**
     * 获取数据库实例
     *
     * {@link https://docs.cloudbase.net/api-reference/webv3-next/database#%E8%8E%B7%E5%8F%96%E6%95%B0%E6%8D%AE%E5%BA%93%E5%AE%9E%E4%BE%8B}
     *
     * @example
     * ```javascript
     * const app = cloudbase.init({
     *   env: 'your-envid'
     * });
     * const db = app.database();
     * ```
     *
     * @return 数据库实例
     */
    database(dbConfig?: { instance?: string; database?: string }): cloudbase.database.App
    /**
     * 调用扩展能力插件功能
     *
     * @example
     * ```javascript
     * const app = cloudbase.init({
     *   env: 'your-envid'
     * });
     * // 调用前需要先注册
     * app.registerExtension(ext);
     *
     * app.invokeExtension('扩展能力插件名称'，{
     *   // ...扩展能力插件的入参
     * });
     * ```
     *
     * @param name 扩展能力插件的名称
     * @param opts 【可选】扩展能力插件的参数，根据插件具体需求而定
     *
     * @return Promise-扩展能力插件执行结果
     */
    invokeExtension(name: string, opts: any): Promise<any>

    eventBus: any

    /**
     * 调用 数据模型 SDK
     * 
     *  {@link https://docs.cloudbase.net/model/sdk-reference/model}
     * @example 
     * ```javascript
        models.<model_name>.create() // 创建单条数据
        models.<model_name>.createMany()  // 创建多条数据
        models.<model_name>.update() // 更新单条数据
        models.<model_name>.updateMany() // 更新多条数据
        models.<model_name>.delete() // 删除单条数据
        models.<model_name>.deleteMany() // 删除多条数据
        models.<model_name>.get() // 查询单条数据
        models.<model_name>.list() // 查询多条数据
        models.$runSQL() // 执行原生 SQL 语句
      * ```
      */
    models: OrmClient & OrmRawQueryClient

    /**
     * MySQL 数据库
     *
     * @example
     * ```javascript
     * const app = cloudbase.init({
     *   env: "xxxx-yyy"
     * });
     *
     * app.mysql().from('todos').select().then((res) => {
     *   console.log(res.data);
     * });
     * ```
     */
    mysql: IMySqlClient
    rdb: IMySqlClient

    ai(options?: { baseUrl?: string }): AI

    apis: ICloudbaseApis

    /**
     * 一次性设置所有端点，只需传入 host 地址，自动拼接路径
     * @param host - 主机地址，如 "43.144.98.4" 或 "//43.144.98.4"
     * @param protocol - 协议，默认 "http"
     */
    registerHost(host: string, protocol?: 'http' | 'https'): void

    /**
     * 获取指定类型的端点信息
     * @param key - 端点类型
     */
    getEndPointWithKey(key: cloudbase.EndPointKey): { BASE_URL: string; PROTOCOL: string }

    /**
     * 修改SDK请求的云开发服务地址
     * @param url 服务地址
     * @param protocol 【可选】强制使用某种协议，默认与主站协议一致
     */
    registerEndPoint(url: string, protocol?: 'http' | 'https'): void

    /**
     * 修改SDK请求的「云开发/网关」服务地址，通过 key 指定
     */
    registerEndPointWithKey(props: cloudbase.ISetEndPointWithKey): void

    /**
     * 解析验证码 URL 参数
     */
    parseCaptcha(url: string): any
  }
}
/**
 * auth
 */
declare namespace cloudbase.auth {
  type Persistence = 'local' | 'session' | 'none'

  interface IAccessTokenInfo {
    accessToken: string
    env: string
  }

  interface ILoginState {
    /**
     * 当前登录用户的信息
     */
    user: IUser
  }

  interface ICredential {
    accessToken?: string
    accessTokenExpire?: string
  }

  interface IAuthProvider {
    signInWithRedirect: () => any
  }

  /**
   * 用户信息
   */
  interface IUserInfo {
    uid?: string
    loginType?: string
    openid?: string
    wxOpenId?: string
    wxPublicId?: string
    unionId?: string
    qqMiniOpenId?: string
    customUserId?: string
    name?: string
    displayName?: string
    gender?: string
    email?: string
    username?: string
    hasPassword?: boolean
    location?: {
      country?: string
      province?: string
      city?: string
    }
    country?: string
    province?: string
    city?: string
  }

  interface IUser extends IUserInfo {
    /**
     * 更新用户信息
     *
     * {@link https://docs.cloudbase.net/api-reference/webv3/authentication#userupdate}
     *
     * @example
     * ```javascript
     * const app = cloudbase.init({
     *   env: "xxxx-yyy"
     * });
     * const auth = app.auth();
     * const user = auth.currentUser;
     * user.update({
     *   nickName: '新昵称'
     * }).then(()=>{});
     * ```
     *
     * @param userinfo 用户信息
     *
     * @return Promise
     *
     */
    update(userinfo: IUserInfo): Promise<void>
    /**
     * 刷新本地用户信息
     *
     * {@link https://docs.cloudbase.net/api-reference/webv3/authentication#userrefresh}
     *
     * @example
     * ```javascript
     * const app = cloudbase.init({
     *   env: "xxxx-yyy"
     * });
     * const auth = app.auth();
     * const user = auth.currentUser;
     * user.refresh().then(()=>{});
     * ```
     *
     * @return Promise-刷新后的用户信息
     *
     */
    refresh(): Promise<IUserInfo>
    /**
     * 同步获取本地用户信息
     */
    checkLocalInfo: () => void
    /**
     * 异步获取本地用户信息
     */
    checkLocalInfoAsync: () => Promise<void>
    linkWithTicket?: (ticket: string) => Promise<void>
    linkWithRedirect?: (provider: IAuthProvider) => void
    getLinkedUidList?: () => Promise<{ hasPrimaryUid: boolean; users: IUserInfo[] }>
    setPrimaryUid?: (uid: string) => Promise<void>
    unlink?: (loginType: 'CUSTOM' | 'WECHAT-OPEN' | 'WECHAT-PUBLIC' | 'WECHAT-UNION') => Promise<void>
  }

  interface App {
    /**
     * 获取当前登录的用户信息-同步操作
     *
     * {@link https://docs.cloudbase.net/api-reference/webv2/authentication#authhasloginstate}
     *
     * @example
     * ```javascript
     * const app = cloudbase.init({
     *   env: "xxxx-yyy"
     * });
     * const userInfo = app.auth().currentUser;
     * ```
     *
     * @return 用户信息，如果未登录返回`null`
     */
    currentUser: IUser | null
    /**
     * 获取当前登录的用户信息-异步操作，文档 {@link https://docs.cloudbase.net/api-reference/webv2/authentication#authgetcurrentuser}
     *
     * @example
     * ```javascript
     * const app = cloudbase.init({
     *   env: "xxxx-yyy"
     * });
     * app.auth().getCurrentUser().then(userInfo=>{
     *   // ...
     * });
     * ```
     *
     * @return Promise-用户信息，如果未登录返回`null`
     */
    getCurrentUser(): Promise<IUser | null>
    /**
     * 绑定手机号码
     *
     * 文档 {@link https://docs.cloudbase.net/api-reference/webv2/authentication#authbindphonenumber}
     *
     * @param params
     */
    bindPhoneNumber(params: authModels.BindPhoneRequest): Promise<void>
    /**
     * 绑定邮箱
     *
     * 文档 {@link https://docs.cloudbase.net/api-reference/webv2/authentication#authbindemail}
     *
     * @param params
     */
    bindEmail(params: authModels.BindEmailRequest): Promise<void>
    /**
     * 解除三方绑定
     *
     * 文档 {@link https://docs.cloudbase.net/api-reference/webv2/authentication#authunbindprovider}
     *
     * @param params
     */
    unbindProvider(params: authModels.UnbindProviderRequest): Promise<void>

    /**
     * 验证码验证
     *
     * 文档 {@link https://docs.cloudbase.net/api-reference/webv2/authentication#authverify}
     *
     * @param params
     */
    verify(params: authModels.VerifyRequest): Promise<authModels.VerifyResponse>
    /**
     * 获取验证码
     *
     * 文档 {@link https://docs.cloudbase.net/api-reference/webv2/authentication#authgetverification}
     *
     * @param params
     * @param options
     */
    getVerification(
      params: authModels.GetVerificationRequest,
      options?: { withCaptcha: boolean },
    ): Promise<authModels.GetVerificationResponse>
    /**
     * 匿名登录。无需用户注册即可使用应用功能，适合游客模式、临时体验等场景。
     *
     * **前置条件**：需要在云开发控制台（环境 → 登录授权 → 身份源列表）开启「匿名登录」。
     *
     * **重要**：匿名登录必须在使用 `watch()` 等实时数据库功能**之前**完成，
     * 否则 WebSocket 连接会因缺少认证信息而失败。
     *
     * 文档 {@link https://docs.cloudbase.net/api-reference/webv2/authentication#authsigninanonymously}
     *
     * @example
     * ```typescript
     * import Cloudbase from '@cloudbase/js-sdk';
     *
     * const app = Cloudbase.init({
     *   env: 'your-env-id',
     *   region: 'ap-shanghai'
     * });
     * const auth = app.auth();
     *
     * // 匿名登录
     * const { data, error } = await auth.signInAnonymously();
     * if (error) {
     *   console.error('匿名登录失败:', error.message);
     *   return;
     * }
     * console.log('匿名登录成功, 用户ID:', data.user.id);
     * console.log('是否匿名用户:', data.user.is_anonymous); // true
     *
     * // 登录成功后，即可使用 watch() 等实时功能
     * const db = app.database();
     * const listener = db.collection('rooms').where({ status: 'active' }).watch({
     *   onChange: (snapshot) => {
     *     console.log('数据变化:', snapshot.docs);
     *   },
     *   onError: (err) => {
     *     console.error('监听错误:', err);
     *   }
     * });
     *
     * // 不再需要时关闭监听
     * listener.close();
     * ```
     *
     * @param data 可选参数
     * @param data.provider_token 提供令牌（通常不需要手动传入）
     * @returns 登录结果，包含 `data.user`（用户信息）和 `data.session`（会话信息），
     *          或 `error`（登录失败时的错误信息）
     */
    signInAnonymously(data?: { provider_token?: string }): Promise<SignInRes>
    /**
     * 小程序匿名登录
     *
     * @param params
     */
    signInAnonymouslyInWx(params?: { useWxCloud?: boolean }): Promise<ILoginState>
    /**
     * 小程序绑定OpenID
     *
     * 文档 {@link https://docs.cloudbase.net/api-reference/webv2/authentication#authbindopenid}
     *
     */
    bindOpenId(): Promise<void>
    /**
     * 小程序unionId静默登录
     *
     * 文档 {@link https://docs.cloudbase.net/api-reference/webv2/authentication#authsigninwithunionid}
     *
     */
    signInWithUnionId(): Promise<ILoginState>
    /**
     * 短信验证码登录
     *
     * 文档 {@link https://docs.cloudbase.net/api-reference/webv2/authentication#authsigninwithsms}
     *
     * @param params
     */
    signInWithSms(params: {
      verificationInfo?: { verification_id: string; is_user: boolean }
      verificationCode?: string
      phoneNum?: string
      bindInfo?: any
    }): Promise<ILoginState>
    /**
     * 邮箱验证码登录
     *
     * 文档 {@link https://docs.cloudbase.net/api-reference/webv2/authentication#authsigninwithemail}
     *
     * @param params
     */
    signInWithEmail(params: {
      verificationInfo?: { verification_id: string; is_user: boolean }
      verificationCode?: string
      email?: string
      bindInfo?: any
    }): Promise<ILoginState>
    /**
     * 设置获取自定义登录 ticket 的函数
     *
     * 文档 {@link https://docs.cloudbase.net/api-reference/webv2/authentication#authsetcustomsignfunc}
     *
     *
     * @param getTickFn
     */
    setCustomSignFunc(getTickFn: authModels.GetCustomSignTicketFn): void
    /**
     * 设置密码（已登录状态下，更新用户密码）
     *
     * 文档 {@link https://docs.cloudbase.net/api-reference/webv2/authentication#authsetpassword}
     *
     */
    setPassword(params: authModels.SetPasswordRequest): Promise<void>
    /**
     * 获取用户信息
     * @deprecated 请使用 getCurrentUser 代替
     *
     * 文档 {@link https://docs.cloudbase.net/api-reference/webv2/authentication#authgetuserinfo}
     */
    getUserInfo(): Promise<IUserInfo>
    /**
     * 获取微搭插件用户信息
     *
     */
    getWedaUserInfo(): Promise<any>
    /**
     * 更新用户基本信息
     *
     * 文档 {@link https://docs.cloudbase.net/api-reference/webv2/authentication#authupdateuserbasicinfo}
     *
     * @param params
     */
    updateUserBasicInfo(params: authModels.ModifyUserBasicInfoRequest): Promise<void>
    /**
     * 获取本地登录态-同步操作
     *
     * {@link https://docs.cloudbase.net/api-reference/webv2/authentication#authhasloginstate}
     *
     * @example
     * ```javascript
     * const app = cloudbase.init({
     *   env: "xxxx-yyy"
     * });
     * const loginState = app.auth().hasLoginState();
     * ```
     *
     * @return 登录态信息，如果未登录返回`null`
     */
    hasLoginState(): ILoginState | null
    /**
     * 获取本地登录态-异步操作
     *
     * {@link https://docs.cloudbase.net/api-reference/webv2/authentication.html#auth-getloginstate}
     *
     * @example
     * ```javascript
     * const app = cloudbase.init({
     *   env: "xxxx-yyy"
     * });
     * app.auth().getLoginState().then(loginState=>{
     *   // ...
     * });
     * ```
     *
     * @return Promise-登录态信息，如果未登录返回`null`
     */
    getLoginState(): Promise<ILoginState | null>
    /**
     * @deprecated
     */
    getAuthHeader(): {}
    /**
     * 为已有账户绑定第三方账户
     *
     * 文档 {@link https://docs.cloudbase.net/api-reference/webv2/authentication#authbindwithprovider}
     */
    bindWithProvider(params: authModels.BindWithProviderRequest): Promise<void>
    /**
     * 查询用户（自定义登录场景和匿名登录场景，不支持使用该接口查询用户信息）
     *
     * 文档 {@link https://docs.cloudbase.net/api-reference/webv2/authentication#authqueryuser}
     *
     */
    queryUser(queryObj: authModels.QueryUserProfileRequest): Promise<authModels.QueryUserProfileResponse>
    /**
     * 获取当前登录用户的访问凭证
     *
     * 文档 {@link https://docs.cloudbase.net/api-reference/webv2/authentication#authgetaccesstoken}
     */
    getAccessToken(): Promise<{ accessToken: string; env: string }>
    /**
     * 提供第三方平台登录 token
     *
     * 文档 {@link https://docs.cloudbase.net/api-reference/webv2/authentication#authgrantprovidertoken}
     */
    grantProviderToken(params: authModels.GrantProviderTokenRequest): Promise<authModels.GrantProviderTokenResponse>
    patchProviderToken(params: authModels.PatchProviderTokenRequest): Promise<authModels.PatchProviderTokenResponse>
    /**
     * 第三方平台登录
     *
     * 文档 {@link https://docs.cloudbase.net/api-reference/webv2/authentication#authsigninwithprovider}
     */
    signInWithProvider(params: authModels.SignInWithProviderRequest): Promise<ILoginState>
    /**
     * 微信登录
     */
    signInWithWechat(params?: any): Promise<ILoginState>
    grantToken(params: authModels.GrantTokenRequest): Promise<ILoginState>
    /**
     * 生成第三方平台授权 Uri （如微信二维码扫码授权网页）
     *
     * 文档 {@link https://docs.cloudbase.net/api-reference/webv2/authentication#authgenproviderredirecturi}
     */
    genProviderRedirectUri(
      params: authModels.GenProviderRedirectUriRequest,
    ): Promise<authModels.GenProviderRedirectUriResponse>
    /**
     * 重置密码（用户忘记密码无法登录时，可使用该接口强制设置密码）
     *
     * 文档 {@link https://docs.cloudbase.net/api-reference/webv2/authentication#authresetpassword}
     */
    resetPassword(params: authModels.ResetPasswordRequest): Promise<void>
    deviceAuthorize(params: authModels.DeviceAuthorizeRequest): Promise<authModels.DeviceAuthorizeResponse>
    /**
     * 通过 sudo 接口获取高级操作权限，如修改用户密码，修改手机号，邮箱等操作
     *
     * 文档 {@link https://docs.cloudbase.net/api-reference/webv2/authentication#authsudo}
     */
    sudo(params: authModels.SudoRequest): Promise<authModels.SudoResponse>
    /**
     * 删除用户
     *
     * 文档 {@link https://docs.cloudbase.net/api-reference/webv2/authentication#authdeleteme}
     */
    deleteMe(params: authModels.WithSudoRequest): Promise<authModels.UserProfile>
    /**
     * 获取第三方绑定列表
     *
     * 文档 {@link https://docs.cloudbase.net/api-reference/webv2/authentication#authgetproviders}
     */
    getProviders(): Promise<authModels.UserProfileProvider>
    /**
     * 用于查询用户是否为匿名登录状态
     *
     * 文档 {@link https://docs.cloudbase.net/api-reference/webv2/authentication#authloginscope}
     */
    loginScope(): Promise<string>
    loginGroups(): Promise<string[]>
    onLoginStateChanged(callback: Function)
    createLoginState(
      params?: { version?: string; query?: any },
      options?: { asyncRefreshUser?: boolean; userInfo?: any },
    ): Promise<ILoginState>
    /**
     * 强制刷新token
     *
     * @param params
     */
    refreshTokenForce(params: { version?: string }): Promise<authModels.Credentials>
    /**
     * 获取身份信息
     *
     * 文档 {@link https://docs.cloudbase.net/api-reference/webv2/authentication#authgetcredentials}
     */
    getCredentials(): Promise<authModels.Credentials>
    /**
     * 写入身份信息
     *
     * @param credentials
     */
    setCredentials(credentials: authModels.Credentials): Promise<void>
    /**
     * 获取身份源类型
     *
     */
    getProviderSubType(): Promise<authModels.ProviderSubType>
    /**
     * 创建验证码数据
     *
     * @param params
     */
    createCaptchaData(params: { state: string; redirect_uri?: string }): Promise<any>
    /**
     * 验证验证码数据
     *
     * @param params
     */
    verifyCaptchaData(params: { token: string; key: string }): Promise<any>
    /**
     * 修改密码
     *
     * 文档 {@link https://docs.cloudbase.net/api-reference/webv2/authentication#authmodifypassword}
     *
     * @param params
     */
    modifyPassword(params: authModels.ModifyUserBasicInfoRequest): Promise<void>
    /**
     * 未登录状态修改密码
     *
     * 文档 {@link https://docs.cloudbase.net/api-reference/webv2/authentication#authmodifypasswordwithoutlogin}
     *
     * @param params
     */
    modifyPasswordWithoutLogin(params: authModels.ModifyPasswordWithoutLoginRequest): Promise<void>
    /**
     * 获取用户行为日志
     *
     * 文档 {@link https://docs.cloudbase.net/api-reference/webv2/authentication#authgetuserbehaviorlog}
     *
     * @param params
     */
    getUserBehaviorLog(params: authModels.GetUserBehaviorLog): Promise<authModels.GetUserBehaviorLogRes>
    /**
     * 检查用户名是否被绑定过
     *
     * {@link https://docs.cloudbase.net/api-reference/webv2/authentication.html#authisusernameregistered}
     *
     * @example
     * ```javascript
     * const app = cloudbase.init({
     *   env: "xxxx-yyy"
     * });
     * const auth = app.auth();
     * const username = "your_awesome_username";
     * auth.isUsernameRegistered(username).then(registered=>{
     *   // ...
     * });
     * ```
     *
     * @param username 用户名
     *
     * @return Promise-用户是否被绑定
     */
    isUsernameRegistered(username: string): Promise<boolean>
    getMiniProgramQrCode(
      params: authModels.GetMiniProgramQrCodeRequest,
    ): Promise<authModels.GetMiniProgramQrCodeResponse>
    getMiniProgramQrCodeStatus(
      params: authModels.GetMiniProgramQrCodeStatusRequest,
    ): Promise<authModels.GetMiniProgramQrCodeStatusResponse>
    /**
     * 跳转到默认登录页
     * 文档 {@link https://docs.cloudbase.net/api-reference/webv2/authentication#authtodefaultloginpage}
     * @param params
     */
    toDefaultLoginPage(params?: authModels.ToDefaultLoginPage): Promise<CommonRes>

    /**
     * 退出登录
     *
     * {@link https://docs.cloudbase.net/api-reference/webv3/authentication#signout}
     *
     * @example
     * ```javascript
     * const app = cloudbase.init({
     *   env: "xxxx-yyy"
     * });
     * app.auth.signOut().then(()=>{});
     * ```
     *
     * @return Promise
     */
    signOut(params?: authModels.SignoutRequest): Promise<void | authModels.SignoutResponse>
    /**
     * 使用自定义登录 ticket 登录
     *
     * 文档 {@link https://docs.cloudbase.net/api-reference/webv3/authentication#signinwithcustomticket}
     *
     * @param getTickFn
     */
    signInWithCustomTicket(getTickFn?: authModels.GetCustomSignTicketFn): Promise<ILoginState>
    /**
     * 用户登录，目前支持手机号，邮箱，用户名密码登录
     *
     * 文档 {@link https://docs.cloudbase.net/api-reference/webv3/authentication#signin}
     */
    signIn(params: authModels.SignInRequest): Promise<ILoginState>
    /**
     * 用户注册，目前支持手机号验证码注册，邮箱验证码注册
     *
     * 文档 {@link https://docs.cloudbase.net/api-reference/webv3/authentication#signup}
     */
    signUp(params: authModels.SignUpRequest): Promise<SignUpRes>
    /**
     * 监听认证状态变化
     *
     * 文档 {@link https://docs.cloudbase.net/api-reference/webv3/authentication#onauthstatechange}
     *
     * @param callback
     */
    onAuthStateChange(callback: OnAuthStateChangeCallback): {
      data: { subscription: { id: string; callback: Function; unsubscribe: () => void } }
    }
    /**
     * 使用用户名和密码登录
     *
     * 文档 {@link https://docs.cloudbase.net/api-reference/webv3/authentication#signinwithpassword}
     *
     * @param params
     */
    signInWithPassword(params: SignInWithPasswordReq): Promise<SignInRes>
    /**
     * 使用第三方平台 ID Token 登录
     *
     * 文档 {@link https://docs.cloudbase.net/api-reference/webv3/authentication#signinwithidtoken}
     *
     * @param params
     */
    signInWithIdToken(params: SignInWithIdTokenReq): Promise<SignInRes>
    /**
     * 使用一次性密码（OTP）登录，支持手机号和邮箱两种方式。
     *
     * **注意**：手机号验证码登录需要在初始化时设置 `region: 'ap-shanghai'`。
     *
     * 文档 {@link https://docs.cloudbase.net/api-reference/webv3/authentication#signinwithotp}
     *
     * @example
     * ```typescript
     * // 完整的手机号验证码登录流程
     * import Cloudbase from '@cloudbase/js-sdk';
     *
     * // 第一步：初始化（region 必须为 ap-shanghai）
     * const app = Cloudbase.init({
     *   env: 'your-env-id',
     *   region: 'ap-shanghai'
     * });
     * const auth = app.auth();
     *
     * // 第二步：发送验证码
     * const { data, error } = await auth.signInWithOtp({ phone: '+8613800138000' });
     * if (error) {
     *   console.error('发送验证码失败:', error.message);
     *   return;
     * }
     *
     * // 第三步：用户输入验证码后，调用 verifyOtp 完成登录
     * const { data: loginData, error: loginError } = await data.verifyOtp({
     *   token: userInputCode // 用户输入的验证码
     * });
     * if (loginError) {
     *   console.error('验证失败:', loginError.message);
     *   return;
     * }
     * console.log('登录成功:', loginData.user);
     * ```
     *
     * @param params 登录参数，包含 email 或 phone（二选一）
     */
    signInWithOtp(params: SignInWithOtpReq): Promise<SignInWithOtpRes>
    /**
     * 校验第三方平台授权登录回调
     *
     * 文档 {@link https://docs.cloudbase.net/api-reference/webv3/authentication#verifyoauth}
     *
     * @param params
     */
    verifyOAuth(params?: VerifyOAuthReq): Promise<SignInRes>
    /**
     * 生成第三方平台授权 Uri
     *
     * 文档 {@link https://docs.cloudbase.net/api-reference/webv3/authentication#signinwithoauth}
     *
     * @param params
     */
    signInWithOAuth(params: SignInWithOAuthReq): Promise<SignInOAuthRes>
    /**
     * 获取当前访问令牌中的声明信息
     *
     * 文档 {@link https://docs.cloudbase.net/api-reference/webv3/authentication#getclaims}
     */
    getClaims(): Promise<GetClaimsRes>
    /**
     * 通过邮箱重置密码
     *
     * 文档 {@link https://docs.cloudbase.net/api-reference/webv3/authentication#resetpasswordforemail}
     *
     * @param emailOrPhone
     * @param options
     */
    resetPasswordForEmail(emailOrPhone: string, options?: { redirectTo?: string }): Promise<ResetPasswordForEmailRes>
    /**
     * 通过旧密码重置密码
     *
     * 文档 {@link https://docs.cloudbase.net/api-reference/webv3/authentication#resetpasswordforold}
     *
     * @param params
     */
    resetPasswordForOld(params: ResetPasswordForOldReq): Promise<SignInRes>
    /**
     * 验证一次性密码（OTP）
     *
     * 文档 {@link https://docs.cloudbase.net/api-reference/webv3/authentication#verifyotp}
     *
     * @param params
     */
    verifyOtp(params: VerifyOtpReq): Promise<SignInRes>
    /**
     * 获取当前会话
     *
     * 文档 {@link https://docs.cloudbase.net/api-reference/webv3/authentication#getsession}
     */
    getSession(): Promise<SignInRes>
    /**
     * 刷新会话
     *
     * 文档 {@link https://docs.cloudbase.net/api-reference/webv3/authentication#refreshsession}
     *
     * @param refresh_token
     */
    refreshSession(refresh_token?: string): Promise<SignInRes>
    /**
     * 获取当前用户详细信息
     *
     * 文档 {@link https://docs.cloudbase.net/api-reference/webv3/authentication#getuser}
     */
    getUser(): Promise<GetUserRes>
    /**
     * 刷新用户信息
     *
     * 文档 {@link https://docs.cloudbase.net/api-reference/webv3/authentication#refreshuser}
     */
    refreshUser(): Promise<CommonRes>
    /**
     * 更新用户信息
     *
     * 文档 {@link https://docs.cloudbase.net/api-reference/webv3/authentication#updateuser}
     *
     * @param params
     */
    updateUser(params: UpdateUserReq): Promise<GetUserRes | UpdateUserWithVerificationRes>
    /**
     * 获取已绑定的身份源
     *
     * 文档 {@link https://docs.cloudbase.net/api-reference/webv3/authentication#getuseridentities}
     */
    getUserIdentities(): Promise<GetUserIdentitiesRes>
    /**
     * 绑定身份源到当前用户
     *
     * 文档 {@link https://docs.cloudbase.net/api-reference/webv3/authentication#linkidentity}
     *
     * @param params
     */
    linkIdentity(params: LinkIdentityReq): Promise<LinkIdentityRes>
    /**
     * 解绑身份源
     *
     * 文档 {@link https://docs.cloudbase.net/api-reference/webv3/authentication#unlinkidentity}
     *
     * @param params
     */
    unlinkIdentity(params: UnlinkIdentityReq): Promise<CommonRes>
    /**
     * 重新认证
     *
     * 文档 {@link https://docs.cloudbase.net/api-reference/webv3/authentication#reauthenticate}
     */
    reauthenticate(): Promise<ReauthenticateRes>
    /**
     * 重新发送验证码
     *
     * 文档 {@link https://docs.cloudbase.net/api-reference/webv3/authentication#resend}
     *
     * @param params
     */
    resend(params: ResendReq): Promise<ResendRes>
    /**
     * 使用 access_token 和 refresh_token 设置会话
     *
     * 文档 {@link https://docs.cloudbase.net/api-reference/webv3/authentication#setsession}
     *
     * @param params
     */
    setSession(params: SetSessionReq): Promise<SignInRes>
    /**
     * 删除当前用户
     *
     * 文档 {@link https://docs.cloudbase.net/api-reference/webv3/authentication#deleteuser}
     *
     * @param params
     */
    deleteUser(params: DeleteMeReq): Promise<CommonRes>
    /**
     * 小程序 openId 静默登录
     *
     * 文档 {@link https://docs.cloudbase.net/api-reference/webv3/authentication#signinwithopenid}
     *
     * @param params
     */
    signInWithOpenId(params?: { useWxCloud?: boolean }): Promise<SignInRes>
    /**
     * 小程序手机号授权登录
     *
     * 文档 {@link https://docs.cloudbase.net/api-reference/webv3/authentication#signinwithphoneauth}
     *
     * @param params
     */
    signInWithPhoneAuth(params: { phoneCode: string }): Promise<SignInRes>

    // ========== v1 兼容 API ==========

    /**
     * v1 API: 获取用于微信登录的 WeixinAuthProvider
     *
     * @deprecated 建议使用 auth.signInWithOAuth({ provider: appid }) 替代。
     *
     * @example
     * ```javascript
     * const provider = auth.weixinAuthProvider({ appid: 'wx-appid', scope: 'snsapi_login' });
     * provider.signInWithRedirect();
     * ```
     *
     * @param options
     * @param options.appid 微信 AppID
     * @param options.scope 微信授权范围
     */
    weixinAuthProvider(options: { appid: string; scope: string }): cloudbase.auth.WeixinAuthProvider

    /**
     * v1 API: 获取用于自定义登录的 CustomAuthProvider
     *
     * @deprecated 建议使用 auth.signInWithCustomTicket(() => Promise.resolve(ticket)) 替代。
     *
     * @example
     * ```javascript
     * const provider = auth.customAuthProvider();
     * await provider.signIn(ticket);
     * ```
     */
    customAuthProvider(): cloudbase.auth.CustomAuthProvider

    /**
     * v1 API: 获取用于匿名登录的 AnonymousAuthProvider
     *
     * @deprecated 建议使用 auth.signInAnonymously({}) 替代。
     *
     * @example
     * ```javascript
     * const provider = auth.anonymousAuthProvider();
     * await provider.signIn();
     * ```
     */
    anonymousAuthProvider(): cloudbase.auth.AnonymousAuthProvider

    /**
     * v1 API: 使用邮箱和密码注册云开发账户
     *
     * @deprecated 建议使用 auth.signUp({ email, password }) 替代。
     *
     * @example
     * ```javascript
     * await auth.signUpWithEmailAndPassword('user@example.com', 'password123');
     * ```
     *
     * @param email 邮箱
     * @param password 密码
     */
    signUpWithEmailAndPassword(email: string, password: string): Promise<SignUpRes>

    /**
     * v1 API: 使用邮箱和密码登录云开发（支持两种调用方式）
     *
     * @deprecated 建议使用 auth.signInWithPassword({ email, password }) 替代。
     *
     * @example
     * ```javascript
     * // 方式一（v1 风格）：
     * await auth.signInWithEmailAndPassword('user@example.com', 'password123');
     *
     * // 方式二（v3 风格）：
     * const { data, error } = await auth.signInWithEmailAndPassword({
     *   email: 'user@example.com',
     *   password: 'password123'
     * });
     * ```
     *
     * @param emailOrParams - 邮箱字符串（v1）或包含 email 和 password 的对象（v3）
     * @param password - 密码（仅 v1 风格时使用）
     */
    signInWithEmailAndPassword(emailOrParams: string | { email: string; password: string; is_encrypt?: boolean }, password?: string): Promise<SignInRes | ILoginState>

    /**
     * v1 API: 发送重置密码的邮件
     *
     * @deprecated 建议使用 auth.resetPasswordForEmail(email) 替代。
     *
     * @example
     * ```javascript
     * await auth.sendPasswordResetEmail('user@example.com');
     * ```
     *
     * @param email 邮箱
     */
    sendPasswordResetEmail(email: string): Promise<void>

    /**
     * v1 API: 使用用户名和密码登录云开发
     *
     * @deprecated 建议使用 auth.signInWithPassword({ username, password }) 替代。
     *
     * @example
     * ```javascript
     * const loginState = await auth.signInWithUsernameAndPassword('username', 'password123');
     * ```
     *
     * @param username 用户名
     * @param password 密码
     */
    signInWithUsernameAndPassword(username: string, password: string): Promise<ILoginState>

    /**
     * v1 API: 发送手机验证码
     *
     * @deprecated 此方法仅发送验证码并返回布尔值，不返回 verifyOtp 回调。
     * 推荐使用 v3 API `auth.signInWithOtp({ phone })` 替代，它会返回包含 `verifyOtp` 方法的对象，
     * 可直接完成"发送验证码 → 用户输入 → 验证并登录"的完整流程。
     *
     * **迁移示例**：
     * ```typescript
     * // ❌ 旧方式 (v1)
     * await auth.sendPhoneCode('+8613800138000');
     * // 需要单独调用其他 API 验证
     *
     * // ✅ 新方式 (v3) - 完整的手机号验证码登录流程
     * // 注意：初始化时必须设置 region: 'ap-shanghai'
     * const app = Cloudbase.init({ env: 'your-env-id', region: 'ap-shanghai' });
     * const auth = app.auth();
     * const { data, error } = await auth.signInWithOtp({ phone: '+8613800138000' });
     * if (error) throw error;
     * // 用户输入验证码后调用 verifyOtp
     * const { data: loginData, error: loginError } = await data.verifyOtp({ token: '123456' });
     * console.log('登录成功', loginData.user);
     * ```
     *
     * @param phoneNumber 手机号（需含国际区号，如 +86）
     * @returns 是否发送成功
     */
    sendPhoneCode(phoneNumber: string): Promise<boolean>

    /**
     * v1 API: 手机号注册（支持短信验证码+密码方式）
     *
     * @deprecated 建议使用 auth.signUp({ phone_number, verification_code, password? }) 替代。
     *
     * @example
     * ```javascript
     * const loginState = await auth.signUpWithPhoneCode('+8613800138000', '123456', 'password');
     * ```
     *
     * @param phoneNumber 手机号
     * @param phoneCode 验证码
     * @param password 可选密码
     */
    signUpWithPhoneCode(phoneNumber: string, phoneCode: string, password?: string): Promise<ILoginState>

    /**
     * v1 API: 手机号登录（支持短信验证码 or 密码方式）
     *
     * @deprecated 推荐使用 v3 API 替代：
     * - 密码登录：`auth.signInWithPassword({ phone, password })`
     * - 验证码登录：`auth.signInWithOtp({ phone })`
     *
     * **迁移示例**：
     * ```typescript
     * // ❌ 旧方式 (v1) - 验证码登录
     * const loginState = await auth.signInWithPhoneCodeOrPassword({
     *   phoneNumber: '+8613800138000',
     *   phoneCode: '123456'
     * });
     *
     * // ✅ 新方式 (v3) - 验证码登录
     * const { data, error } = await auth.signInWithOtp({ phone: '+8613800138000' });
     * if (error) throw error;
     * const { data: result } = await data.verifyOtp({ token: '123456' });
     *
     * // ✅ 新方式 (v3) - 密码登录
     * const { data, error } = await auth.signInWithPassword({
     *   phone: '+8613800138000',
     *   password: 'password123'
     * });
     * ```
     *
     * @param params
     */
    signInWithPhoneCodeOrPassword(params: {
      phoneNumber: string
      phoneCode?: string
      password?: string
    }): Promise<ILoginState>

    /**
     * v1 API: 手机号强制重置密码
     *
     * @deprecated 建议使用 auth.resetPasswordForEmail(phoneNumber) 替代。
     *
     * @example
     * ```javascript
     * const loginState = await auth.forceResetPwdByPhoneCode({
     *   phoneNumber: '+8613800138000',
     *   phoneCode: '123456',
     *   password: 'newPassword'
     * });
     * ```
     *
     * @param params
     */
    forceResetPwdByPhoneCode(params: {
      phoneNumber: string
      phoneCode: string
      password: string
    }): Promise<ILoginState>

    /**
     * v1 API: 接收一个回调函数，在刷新短期访问令牌前调用，根据返回值决定是否刷新
     *
     * @deprecated 建议使用 auth.onAuthStateChange(callback) 监听 TOKEN_REFRESHED 事件替代。
     *
     * @param callback 回调函数，返回 true 则刷新，返回 false 则不刷新
     */
    shouldRefreshAccessToken(callback: () => boolean): void

    /**
     * v1 API: 接收一个回调函数，在登录状态过期时调用
     *
     * @deprecated 建议使用 auth.onAuthStateChange(callback) 替代，监听 SIGNED_OUT 事件。
     *
     * @param callback 登录态过期回调
     */
    onLoginStateExpired(callback: Function): void

    /**
     * v1 API: 接收一个回调函数，在短期访问令牌刷新后调用
     *
     * @deprecated 建议使用 auth.onAuthStateChange(callback) 替代，监听 TOKEN_REFRESHED 事件。
     *
     * @param callback 令牌刷新回调
     */
    onAccessTokenRefreshed(callback: Function): void

    /**
     * v1 API: 接收一个回调函数，在匿名登录状态被转换后调用
     *
     * @deprecated 建议使用 auth.onAuthStateChange(callback) 替代，监听 SIGNED_IN 事件。
     *
     * @param callback 匿名转正回调
     */
    onAnonymousConverted(callback: Function): void

    /**
     * v1 API: 接收一个回调函数，在登录类型发生变化后调用
     *
     * @deprecated 建议使用 auth.onAuthStateChange(callback) 替代，监听 SIGNED_IN / SIGNED_OUT 事件。
     *
     * @param callback 登录类型变化回调
     */
    onLoginTypeChanged(callback: Function): void
  }

  // ========== v1 兼容 Provider 类 ==========

  /**
   * v1 微信登录 Provider
   *
   * @deprecated 建议使用 auth.signInWithOAuth({ provider }) 替代。
   */
  interface WeixinAuthProvider {
    /**
     * 跳转微信授权页面进行登录
     * @deprecated 建议使用 auth.signInWithOAuth({ provider: 'providerId' }) 替代。
     */
    signInWithRedirect(): void
    /**
     * 获取微信授权重定向结果
     * @deprecated 建议使用 auth.verifyOAuth({ code, state, provider }) 替代。
     */
    getRedirectResult(options?: { createUser?: boolean; syncUserInfo?: boolean }): Promise<any>
    /**
     * 获取微信绑定重定向结果
     * @deprecated 建议使用 auth.linkIdentity({ provider: 'providerId' }) 替代。
     */
    getLinkRedirectResult(options?: { withUnionId?: boolean }): Promise<void>
  }

  /**
   * v1 自定义登录 Provider
   *
   * @deprecated 建议使用 auth.signInWithCustomTicket(() => Promise.resolve(ticket)) 替代。
   */
  interface CustomAuthProvider {
    /**
     * 使用自定义登录凭据 ticket 登录云开发
     * @param ticket 自定义登录 ticket
     * @deprecated 建议使用 auth.signInWithCustomTicket(() => Promise.resolve(ticket)) 替代。
     */
    signIn(ticket: string): Promise<void>
  }

  /**
   * v1 匿名登录 Provider
   *
   * @deprecated 建议使用 auth.signInAnonymously({}) 替代。
   */
  interface AnonymousAuthProvider {
    /**
     * 匿名登录云开发
     * @deprecated 建议使用 auth.signInAnonymously({}) 替代。
     */
    signIn(): Promise<void>
  }
}
/**
 * functions
 */
declare namespace cloudbase.functions {
  interface ICallFunctionOptions {
    name: string
    data?: KV<any>
    query?: KV<any>
    search?: string
    parse?: boolean
    // Used for 云函数2.0 CallContainer
    type?: string
    method?: string
    path?: string
    header?: KV<any>
  }

  interface ICallFunctionResponse {
    requestId: string
    result: any
  }
}
/**
 * storage
 */
declare namespace cloudbase.storage {
  interface ICloudbaseUploadFileParams {
    cloudPath: string
    filePath?: string
    method?: 'post' | 'put'
    headers?: KV<string>
    onUploadProgress?: Function
    // 文件内容 Buffer 或 文件可读流, node端使用
    fileContent?: any
    customReqOpts?: ICustomReqOpts
  }
  interface ICloudbaseUploadFileResult {
    fileID: string
    requestId: string
  }
  interface ICloudbaseGetUploadMetadataParams {
    cloudPath: string
    customReqOpts?: ICustomReqOpts
  }
  interface ICloudbaseDeleteFileParams {
    fileList: string[]
    customReqOpts?: ICustomReqOpts
  }
  interface ICloudbaseDeleteFileResult {
    code?: string
    message?: string
    fileList?: {
      code?: string
      fileID: string
    }[]
    requestId?: string
  }

  interface ICloudbaseFileInfo {
    fileID: string
    maxAge: number
  }

  interface ICloudbaseGetTempFileURLParams {
    fileList: string[] | ICloudbaseFileInfo[]
    customReqOpts?: ICustomReqOpts
  }

  interface ICloudbaseGetTempFileURLResult {
    code?: string
    message?: string
    fileList?: {
      code?: string
      message?: string
      fileID: string
      tempFileURL: string
      download_url?: string
    }[]
    requestId?: string
  }
  interface ICloudbaseDownloadFileParams {
    fileID: string
    tempFilePath?: string
    customReqOpts?: ICustomReqOpts
  }
  interface ICloudbaseDownloadFileResult {
    code?: string
    message?: string
    fileContent?: any
    requestId?: string
  }
  interface ICloudbaseFileMetaData {
    url: string
    token: string
    authorization: string
    fileId: string
    cosFileId: string
    download_url: string
  }

  interface ICloudbaseFileMetaDataRes {
    data: ICloudbaseFileMetaData
    requestId: string
  }

  interface ICloudbaseCopyFileParams {
    fileList: Array<{
      srcPath: string
      dstPath: string
      overwrite?: boolean
      removeOriginal?: boolean
    }>
    customReqOpts?: ICustomReqOpts
  }

  interface ICloudbaseCopyFileResult {
    fileList: Array<{
      fileId?: string
      code?: string
      message?: string
    }>
    requestId?: string
  }

  interface ICloudbaseGetFileInfoResultItem {
    code?: string
    message?: string
    fileID: string
    tempFileURL: string
    fileName?: string
    cloudId?: string
    contentType?: string
    mime?: string
    size?: number
    cacheControl?: string
    lastModified?: string
    etag?: string
  }

  interface ICloudbaseGetFileInfoResult {
    fileList: ICloudbaseGetFileInfoResultItem[]
    requestId: string
  }

  // ---- Supabase-like Storage Types ----

  /** Node.js 风格可读流的最小兼容类型，避免依赖 `@types/node`。 */
  interface NodeReadableStreamLike {
    /** 将当前流管道输出到目标流。 */
    pipe(destination: any, options?: any): any
  }

  /**
   * Node.js `Buffer` 的兼容类型。
   *
   * 在安装了 `@types/node` 的项目中解析为 `Buffer`，未安装时退化为 `never`，
   * 从而既能让 Node 端继续显式传入 `Buffer`，又不会让纯浏览器项目因缺少
   * `@types/node` 而报“找不到名称 Buffer”，避免对 `@types/node` 的硬依赖。
   */
  type MaybeNodeBuffer = typeof globalThis extends { Buffer: new (...args: any[]) => infer B } ? B : never

  /**
   * 可上传的文件内容类型。
   *
   * @remarks
   * - Node.js `Buffer`：通过 `MaybeNodeBuffer` 兼容（装有 `@types/node` 时可直接传入）；
   *   即便未装 `@types/node`，`Buffer` 仍可作为 `ArrayBufferView` / `Uint8Array` 传入。
   * - Node.js 可读流（如 `NodeJS.ReadableStream` / `fs.ReadStream`）：可作为 `NodeReadableStreamLike` 传入。
   */
  type FileBody =
    | ArrayBuffer
    | ArrayBufferView
    | Blob
    | File
    | FormData
    | MaybeNodeBuffer
    | NodeReadableStreamLike
    | ReadableStream<Uint8Array>
    | URLSearchParams
    | string

  /** 上传 / 覆盖对象选项。 */
  interface FileOptions {
    /** 缓存时间，单位为秒；会转换为 `Cache-Control: max-age=<seconds>`。 */
    cacheControl?: string
    /** 文件 MIME 类型；当 `fileBody` 不是 `Blob` / `File` / `FormData` 时建议显式指定。 */
    contentType?: string
    /** 是否允许覆盖同名对象。 */
    upsert?: boolean
    /** 透传给底层 `fetch` 的 duplex 配置，用于流式请求场景。 */
    duplex?: string
    /** 用户自定义元数据。 */
    metadata?: Record<string, any>
    /** 额外请求头。 */
    headers?: Record<string, string>
  }

  /** 图片转换选项。 */
  interface TransformOptions {
    /** 图片宽度，单位为像素。 */
    width?: number
    /** 图片高度，单位为像素。 */
    height?: number
    /** 缩放模式：`cover` 保持比例裁剪填满；`contain` 保持比例完整适配；`fill` 拉伸填满。 */
    resize?: 'cover' | 'contain' | 'fill'
    /** 图片质量，通常取值 20 到 100，数值越大质量越高。 */
    quality?: number
    /** 输出格式；`origin` 表示保持原图格式。 */
    format?: 'origin'
  }

  interface FileObject {
    name: string
    bucket_id: string
    owner: string
    id: string
    updated_at: string
    created_at: string
    /** @deprecated */
    last_accessed_at: string
    metadata: Record<string, any>
    buckets: {
      id: string
      name: string
      owner: string
      public: boolean
      created_at: string
      updated_at: string
    }
  }

  interface FileObjectV2 {
    id: string
    version: string
    name: string
    bucketId: string
    updatedAt: string
    createdAt: string
    /** @deprecated */
    lastAccessedAt: string
    size?: number
    cacheControl?: string
    contentType?: string
    etag?: string
    lastModified?: string
    metadata?: Record<string, any>
  }

  class StorageError extends Error {
    name: 'StorageError'
    constructor(message: string)
  }

  /**
   * Supabase 风格的文件存储 API
   *
   * 通过 `app.storage` 获取实例，提供类似 Supabase Storage 的操作接口。
   *
   * @example
   * ```typescript
   * const app = cloudbase.init({ env: 'your-envid' })
   * const bucket = app.storage.from('my-bucket')
   *
   * // 上传文件
   * const { data, error } = await bucket.upload('path/to/file.jpg', file)
   *
   * // 获取签名 URL
   * const { data } = await bucket.createSignedUrl('path/to/file.jpg', 3600)
   *
   * // 下载文件
   * const { data } = await bucket.download('path/to/file.jpg')
   * ```
   */
  interface ClassicStorageFileApi {
    /**
     * 启用错误抛出模式，而非返回 `{ data: null, error }` 格式
     */
    throwOnError(): this

    /**
     * 上传文件
     *
     * @param path 文件路径
     * @param fileBody 文件内容
     * @param fileOptions 上传选项
     */
    upload(
      path: string,
      fileBody: FileBody,
      fileOptions?: FileOptions,
    ): Promise<
      | { data: { id: string; path: string; fullPath: string }; error: null }
      | { data: null; error: StorageError }
    >

    /**
     * 上传文件到已签名的 URL
     *
     * @param path 文件路径
     * @param token 签名 Token
     * @param fileBody 文件内容
     * @param fileOptions 上传选项
     */
    uploadToSignedUrl(
      path: string,
      token: string,
      fileBody: FileBody,
      fileOptions?: FileOptions,
    ): Promise<
      | { data: { id: string; path: string; fullPath: string }; error: null }
      | { data: null; error: StorageError }
    >

    /**
     * 创建用于上传的签名 URL
     *
     * @param path 文件路径
     */
    createSignedUploadUrl(path: string): Promise<
      | {
          data: {
            signedUrl: string
            token: string
            path: string
            authorization?: string
            id?: string
            cosFileId?: string
            downloadUrl?: string
          }
          error: null
        }
      | { data: null; error: StorageError }
    >

    /**
     * 更新（覆盖）文件
     *
     * @param path 文件路径
     * @param fileBody 文件内容
     * @param fileOptions 上传选项
     */
    update(
      path: string,
      fileBody: FileBody,
      fileOptions?: FileOptions,
    ): Promise<
      | { data: { id: string; path: string; fullPath: string }; error: null }
      | { data: null; error: StorageError }
    >

    /**
     * 移动文件（复制后删除源文件）
     *
     * @param fromPath 源文件路径
     * @param toPath 目标文件路径
     */
    move(
      fromPath: string,
      toPath: string,
    ): Promise<
      | { data: { message: string }; error: null }
      | { data: null; error: StorageError }
    >

    /**
     * 复制文件
     *
     * @param fromPath 源文件路径
     * @param toPath 目标文件路径
     */
    copy(
      fromPath: string,
      toPath: string,
    ): Promise<
      | { data: { path: string }; error: null }
      | { data: null; error: StorageError }
    >

    /**
     * 创建签名下载 URL
     *
     * @param path 文件路径
     * @param expiresIn 有效期（秒）
     * @param options 可选配置
     */
    createSignedUrl(
      path: string,
      expiresIn: number,
      options?: {
        download?: string | boolean
        transform?: TransformOptions
      },
    ): Promise<
      | { data: { signedUrl: string }; error: null }
      | { data: null; error: StorageError }
    >

    /**
     * 批量创建签名下载 URL
     *
     * @param paths 文件路径数组
     * @param expiresIn 有效期（秒）
     */
    createSignedUrls(
      paths: string[],
      expiresIn: number,
    ): Promise<
      | { data: Array<{ path: string; signedUrl: string; error: string | null }>; error: null }
      | { data: null; error: StorageError }
    >

    /**
     * 下载文件，返回 Blob
     *
     * @param path 文件路径
     * @param options 图片转换选项
     */
    download(
      path: string,
      options?: TransformOptions,
    ): Promise<{ data: Blob; error: StorageError | null }>

    /**
     * 获取文件详细信息
     *
     * @param pathOrFileId 相对路径或 CloudBase fileID
     */
    info(pathOrFileId: string): Promise<
      | { data: FileObjectV2; error: null }
      | { data: null; error: StorageError }
    >

    /**
     * 检查文件是否存在
     *
     * @param pathOrFileId 相对路径或 CloudBase fileID
     */
    exists(pathOrFileId: string): Promise<
      | { data: boolean; error: null }
      | { data: null; error: StorageError }
    >

    /**
     * 获取文件的公开 URL
     *
     * @param path 文件路径
     * @param options 可选配置
     */
    getPublicUrl(
      path: string,
      options?: {
        download?: string | boolean
        transform?: TransformOptions
      },
    ): Promise<
      | { data: { publicUrl: string } }
      | { data: null; error: StorageError }
    >

    /**
     * 批量删除文件
     *
     * @param paths 文件路径数组
     */
    remove(paths: string[]): Promise<
      | { data: FileObject[]; error: null }
      | { data: null; error: StorageError }
    >
  }

  /**
   * Bucket 管理 API，挂载在 `app.storage` 上。
   *
   * @remarks 权限由 `storage.buckets` 的 RLS Policy 决定。暂不提供
   * `emptyBucket()`、`headBucket()`、Bucket CORS、Bucket ACL 等 COS/S3 风格 Bucket 管理 API。
   */
  interface StorageBucketApi {
    /**
     * 启用错误抛出模式。开启后请求失败会抛异常；请求成功仍返回 `{ data, error: null }`。
     * 该设置会传递给 `from()` 返回的客户端。
     */
    throwOnError(): this

    /**
     * 获取 Bucket 列表，支持偏移分页、排序和搜索。
     *
     * @param options 查询参数：`limit`、`offset`、`sortColumn`、`sortOrder`、`search`。
     */
    listBuckets(options?: ListBucketOptions): Promise<
      | { data: Bucket[]; error: null }
      | { data: null; error: StorageError }
    >

    /**
     * 获取指定 Bucket 详情。
     *
     * @param bucketId Bucket ID。
     */
    getBucket(bucketId: string): Promise<
      | { data: Bucket; error: null }
      | { data: null; error: StorageError }
    >

    /**
     * 创建 Bucket。
     *
     * @param bucketId Bucket ID，同时作为后端 `id` 与 `name` 传入。
     * @param options 创建参数：`public`、`fileSizeLimit`、`allowedMimeTypes`、`type`。
     * @remarks `public` 默认 `false`。
     */
    createBucket(bucketId: string, options?: CreateBucketOptions): Promise<
      | { data: { name: string }; error: null }
      | { data: null; error: StorageError }
    >

    /**
     * 更新 Bucket 配置。
     *
     * @param bucketId Bucket ID。
     * @param options 更新参数：`public`、`fileSizeLimit`、`allowedMimeTypes`。不支持更新 `type`。
     */
    updateBucket(bucketId: string, options: UpdateBucketOptions): Promise<
      | { data: { message: string }; error: null }
      | { data: null; error: StorageError }
    >

    /**
     * 删除空 Bucket。
     *
     * @param bucketId Bucket ID。
     * @remarks Bucket 非空时后端会返回错误。
     */
    deleteBucket(bucketId: string): Promise<
      | { data: { message: string }; error: null }
      | { data: null; error: StorageError }
    >
  }

  /**
   * `app.storage` 命名空间（分流器）。继承 `StorageBucketApi` 的 Bucket 管理能力，并提供 `from()` 分流。
   *
   * `from()` 分流到两个**对等且独立**的客户端——`ClassicStorageFileApi`（传统环境）
   * 与 `StorageFileApi`（针对全新的 Neo 环境）。
   *
   * - `from()`：返回 `ClassicStorageFileApi`；
   * - `from(bucketId)`：返回 `StorageFileApi`。
   */
  interface StorageClient extends StorageBucketApi {
    /**
     * 进入对象操作客户端。
     *
     * - `from()`（不传 bucketId）：返回传统环境对象操作客户端；
     * - `from(bucketId)`：返回 Neo 环境对象操作（`bucketId + objectName` 语义）客户端。
     *
     * @remarks 传入 `bucketId` 时返回的客户端仅 Neo 环境可用。
     *
     * @example
     * ```typescript
     * // 传统环境
     * const file = app.storage.from()
     * // Neo 环境
     * const avatars = app.storage.from('avatars')
     * ```
     */
    from(): ClassicStorageFileApi
    from<B extends string>(bucketId: B): StorageFileApi
  }

  // ==================== Storage 类型 ====================
  // 以下类型通过 app.storage.from(bucketId) 与 Bucket 管理 API 暴露。

  type BucketType = 'STANDARD'

  /** Bucket 资源（对应 storage.buckets 表记录）。 */
  interface Bucket {
    /** Bucket ID。 */
    id: string
    /** Bucket 名称。 */
    name: string
    /** 创建者用户 ID；可能为空。 */
    owner_id?: string | null
    /** 是否为公开 Bucket。 */
    public: boolean
    /** Bucket 类型。 */
    type?: BucketType
    /** 文件大小限制，单位为字节；`null` 表示不限制。 */
    file_size_limit?: number | null
    /** 允许上传的 MIME 类型列表；`null` 表示不限制。 */
    allowed_mime_types?: string[] | null
    /** 创建时间，ISO 8601 日期时间字符串。 */
    created_at: string
    /** 更新时间，ISO 8601 日期时间字符串。 */
    updated_at: string
  }

  interface ListBucketOptions {
    /** 返回数量限制。 */
    limit?: number
    /** 分页偏移量。 */
    offset?: number
    /** 排序字段。 */
    sortColumn?: 'id' | 'name' | 'created_at' | 'updated_at'
    /** 排序方向。 */
    sortOrder?: 'asc' | 'desc'
    /** 搜索关键词。 */
    search?: string
  }

  interface CreateBucketOptions {
    /** 是否公开，默认 `false`。 */
    public?: boolean
    /** 文件大小限制；数字按字节处理，字符串支持如 `100MB`，`null` 表示不限制。 */
    fileSizeLimit?: number | string | null
    /** 允许上传的 MIME 类型列表，`null` 表示不限制。 */
    allowedMimeTypes?: string[] | null
    /** Bucket 类型，仅创建时可传。 */
    type?: BucketType
  }

  interface UpdateBucketOptions {
    /** 是否公开。 */
    public?: boolean
    /** 文件大小限制；数字按字节处理，字符串支持如 `100MB`，`null` 表示不限制。 */
    fileSizeLimit?: number | string | null
    /** 允许上传的 MIME 类型列表，`null` 表示不限制。 */
    allowedMimeTypes?: string[] | null
  }

  /** 上传选项。 */
  type UploadOptions = FileOptions

  interface UploadResult {
    /** 对象 UUID（后端 `Id`）。 */
    id: string
    /** Bucket 内相对路径。 */
    path: string
    /** 对象完整路径 `bucketId/objectName`（后端 `Key`）。 */
    fullPath: string
  }

  interface DownloadOptions {
    /** 触发浏览器下载，传字符串作为下载文件名。 */
    download?: string | boolean
    /** 缓存失效 nonce，追加到请求 URL 以绕过 CDN 缓存。 */
    cacheNonce?: string
  }

  interface ListOptions {
    /** 返回数量限制。 */
    limit?: number
    /** 翻页游标，由上一页响应的 `nextCursor` 提供。 */
    cursor?: string
    /** 是否使用 `/` 作为分隔符区分文件夹。 */
    withDelimiter?: boolean
    /** 排序配置。 */
    sortBy?: {
      /** 排序字段。 */
      column?: 'name' | 'created_at' | 'updated_at'
      /** 排序方向。 */
      order?: 'asc' | 'desc'
    }
  }

  interface ListObjectsEntry {
    /** 对象完整 key；文件夹条目可能为空。 */
    key?: string | null
    /** 对象名或文件夹名。 */
    name: string
    /** 对象 UUID；文件夹条目可能为空。 */
    id?: string | null
    /** 更新时间，ISO 8601 日期时间字符串。 */
    updated_at?: string | null
    /** 创建时间，ISO 8601 日期时间字符串。 */
    created_at?: string | null
    /** 最后访问时间，ISO 8601 日期时间字符串。 */
    last_accessed_at?: string | null
    /** 对象元数据。 */
    metadata?: Record<string, any> | null
  }

  interface ListObjectsResponse {
    /** 当前前缀下的文件夹条目。 */
    folders: ListObjectsEntry[]
    /** 当前前缀下的对象条目。 */
    objects: ListObjectsEntry[]
    /** 是否还有下一页。 */
    hasNext: boolean
    /** 下一页游标。 */
    nextCursor?: string
    /** 下一页起始 key。 */
    nextCursorKey?: string
  }

  interface ObjectInfo {
    /** 对象 UUID。 */
    id: string
    /** Bucket 内相对路径。 */
    name: string
    /** 对象版本标识；可能为空。 */
    version?: string | null
    /** 所属 Bucket ID。 */
    bucketId: string
    /** 文件大小，单位为字节；可能为空。 */
    size?: number | null
    /** 文件 MIME 类型；可能为空。 */
    contentType?: string | null
    /** 缓存控制信息；可能为空。 */
    cacheControl?: string | null
    /** 对象 ETag；可能为空。 */
    etag?: string | null
    /** 用户自定义元数据。 */
    metadata?: Record<string, any>
    /** 最后修改时间，ISO 8601 日期时间字符串。 */
    lastModified?: string | null
    /** 创建时间，ISO 8601 日期时间字符串。 */
    createdAt?: string | null
  }

  interface FullObject {
    /** Bucket 内相对路径。 */
    name: string
    /** 所属 Bucket ID。 */
    bucket_id: string
    /** 创建者用户 ID；可能为空。 */
    owner_id?: string | null
    /** 对象版本标识；可能为空。 */
    version?: string | null
    /** 对象 UUID；可能为空。 */
    id?: string | null
    /** 更新时间，ISO 8601 日期时间字符串。 */
    updated_at?: string | null
    /** 创建时间，ISO 8601 日期时间字符串。 */
    created_at?: string | null
    /** 最后访问时间，ISO 8601 日期时间字符串。 */
    last_accessed_at?: string | null
    /** 系统或对象元数据。 */
    metadata?: Record<string, any>
    /** 用户自定义元数据。 */
    user_metadata?: Record<string, any>
  }

  interface DestinationOptions {
    /** 目标 Bucket ID，默认与源相同。 */
    destinationBucket?: string
    /** 允许覆盖目标位置已有对象。 */
    upsert?: boolean
    /** 是否复制源对象元数据，默认 true。 */
    copyMetadata?: boolean
    /** `copyMetadata=false` 时合并到目标对象的用户元数据。 */
    metadata?: Record<string, any>
  }

  interface SignedUrlOptions {
    /** 触发浏览器下载，传字符串作为下载文件名。 */
    download?: string | boolean
    /** 缓存失效 nonce，追加到请求 URL 以绕过 CDN 缓存。 */
    cacheNonce?: string
  }

  /** 公开 URL 选项。 */
  interface PublicUrlOptions {
    /** 触发浏览器下载，传字符串作为下载文件名。 */
    download?: string | boolean
    /** 缓存失效 nonce，追加到请求 URL 以绕过 CDN 缓存。 */
    cacheNonce?: string
  }

  /**
   * 请求级 fetch 控制参数（对齐 Supabase `FetchParameters`）。
   *
   * 纯客户端能力：`signal` 用于取消请求；`cache` 透传给底层 fetch 的缓存策略
   * （主要在浏览器 fetch 路径生效，XHR / 部分运行时会忽略）。
   */
  interface FetchParameters {
    /** 请求取消信号。 */
    signal?: AbortSignal
    /** 透传给底层 `fetch` 的缓存策略。 */
    cache?: 'default' | 'no-store' | 'reload' | 'no-cache' | 'force-cache' | 'only-if-cached'
  }

  /**
   * 流式下载构建器（thenable）。`await` 后 resolve 为 `Result<ReadableStream>`。
   * 由 `DownloadBuilder.asStream()` 创建。
   */
  interface StreamDownloadBuilder extends PromiseLike<
    | { data: ReadableStream<Uint8Array>; error: null }
    | { data: null; error: StorageError }
  > {}

  /**
   * 下载构建器（thenable）。默认 `await` 得 `Result<Blob>`；`.asStream()` 切换为流式终态。
   * 惰性执行：请求在 `await` / `.then()` 时才真正发出。
   */
  interface DownloadBuilder extends PromiseLike<
    | { data: Blob; error: null }
    | { data: null; error: StorageError }
  > {
    /** 切换为流式下载终态，返回 `StreamDownloadBuilder`。 */
    asStream(): StreamDownloadBuilder
  }

  /**
   * 单 Bucket 对象操作客户端。通过 `app.storage.from(bucketId)` 获取。
   *
   * @remarks 所有 `objectName` 均为 Bucket 内相对路径。
   */
  interface StorageFileApi {
    /** 当前客户端绑定的 Bucket ID。 */
    readonly bucketId: string

    /**
     * 启用错误抛出模式。开启后请求失败会抛异常；请求成功仍返回 `{ data, error: null }`。
     */
    throwOnError(): this

    /**
     * 设置自定义请求头（链式）。
     *
     * @remarks 设置后对当前实例后续所有请求生效；每个 `from(bucketId)` 返回独立实例，互不影响。
     * 单次请求内部的功能性头（如上传的 `Content-Type` / `x-upsert`）优先级更高，会覆盖此处同名头。
     * name 为空或 name/value 含 CR/LF 时抛 `StorageError`。
     */
    setHeader(name: string, value: string): this

    /**
     * 直接上传对象，默认不覆盖同名对象。
     *
     * 需要当前用户已登录，权限由 `storage.objects` 的 RLS `INSERT` / `UPDATE` 策略判定。
     *
     * 上传行为：
     * - `options.upsert` 默认 `false`：目标路径已有对象时，上传失败。
     * - `options.upsert` 设为 `true`：目标路径已有对象时，覆盖写入。
     * - 成功时返回 `{ id, path, fullPath }`。
     *
     * @param path Bucket 内相对路径。
     * @param fileBody 文件内容。
     * @param fileOptions 上传选项，如 `contentType`、`cacheControl`、`upsert`、`metadata`。
     * @see createSignedUploadUrl uploadToSignedUrl
     */
    upload(path: string, fileBody: FileBody, fileOptions?: UploadOptions): Promise<
      | { data: UploadResult; error: null }
      | { data: null; error: StorageError }
    >

    /**
     * 覆盖更新对象。
     *
     * 与 `upload` 共享同一底层，区别：
     * - 使用 `PUT` 方法（语义为覆盖）。
     * - 目标路径不存在时也会创建（upsert 行为）。
     *
     * @param path Bucket 内相对路径。
     * @param fileBody 文件内容。
     * @param fileOptions 上传选项，如 `contentType`、`cacheControl`、`metadata`。
     */
    update(path: string, fileBody: FileBody, fileOptions?: UploadOptions): Promise<
      | { data: UploadResult; error: null }
      | { data: null; error: StorageError }
    >

    /**
     * 下载对象。返回**下载构建器**（thenable），默认 `await` 得到 `Blob`。
     *
     * 需要登录态，权限由 `storage.objects` 的 RLS `SELECT` 策略判定。
     *
     * 两种终态：
     * - 默认：`await bucket.download(path)` → `{ data: Blob, error }`。
     * - 流式：`await bucket.download(path).asStream()` → `{ data: ReadableStream, error }`，
     *   适合 Node 大文件等不希望整体读入内存的场景。
     *
     * 两者统一走原生 `fetch` 的 `Response`：流式终态返回 `Response.body`，Blob 终态调 `Response.blob()`。
     *
     * 下载行为：
     * - 惰性执行：请求在 `await` / `.then()` 时才真正发出。
     * - 返回的 `Blob` 不会自动触发浏览器下载或渲染，需配合 `URL.createObjectURL` 手动处理。
     * - 支持 `parameters.signal`（AbortSignal）取消进行中的下载。
     *
     * @param path Bucket 内相对路径。
     * @param options 下载选项，支持 `download`（触发浏览器下载）、`cacheNonce`（绕过 CDN 缓存）。
     * @param parameters 请求控制参数，支持 `signal` / `cache`。
     * @returns `DownloadBuilder`：可 `await` 得 `Blob`，或 `.asStream()` 后得 `ReadableStream`。
     */
    download(path: string, options?: DownloadOptions, parameters?: FetchParameters): DownloadBuilder

    /**
     * 获取对象列表（游标分页）。
     *
     * 采用**游标分页**，与 Supabase 的 `listV2` 对应。
     *
     * - 首次查询不传 `cursor`，后续用上一页的 `nextCursor` 继续翻页。
     * - 返回 `{ folders, objects, hasNext, nextCursor }`（区别于 Supabase `list` 的 offset 分页 `FileObject[]`）。
     * - `path` 不传时列出 Bucket 根目录。
     * - `options.withDelimiter` 为 `true` 时以 `/` 分隔文件夹和文件。
     *
     * @param path 路径前缀，不传表示 Bucket 根目录。
     * @param options 列表选项，支持 `limit`、`cursor`、`withDelimiter`、`sortBy`。
     * @param parameters 请求控制参数，支持 `signal` / `cache`。
     * @remarks 本方法对应 Supabase 的 `listV2`（游标分页），而非 `list`（offset 分页）。
     */
    list(path?: string, options?: ListOptions, parameters?: FetchParameters): Promise<
      | { data: ListObjectsResponse; error: null }
      | { data: null; error: StorageError }
    >

    /**
     * 删除一个或多个对象。
     *
     * 权限由 `storage.objects` 的 RLS `DELETE` 策略判定。
     *
     * - 后端单次最多删除 100 个对象，超出时 SDK 自动分批发送。
     * - 返回所有被成功删除的对象信息（`FullObject[]`）。
     *
     * @param paths Bucket 内相对路径数组。
     */
    remove(paths: string[]): Promise<
      | { data: FullObject[]; error: null }
      | { data: null; error: StorageError }
    >

    /**
     * 复制对象，支持跨 Bucket。
     *
     * 权限由 `storage.objects` 的 RLS 策略判定：读取源需要 `SELECT`，写入目标需要 `INSERT`。
     *
     * - `options.destinationBucket` 不传时在同一 Bucket 内复制。
     * - `options.upsert` 为 `true` 时，目标路径已有对象则覆盖。
     * - `options.copyMetadata` 设为 `false` 并传 `options.metadata` 时替换原 metadata。
     * - 返回目标对象的完整路径。
     *
     * @param fromPath 源对象 Bucket 内相对路径。
     * @param toPath 目标对象相对路径。
     * @param options 目标 Bucket、覆盖、元数据复制等选项。
     */
    copy(fromPath: string, toPath: string, options?: DestinationOptions): Promise<
      | { data: { path: string }; error: null }
      | { data: null; error: StorageError }
    >

    /**
     * 移动对象，支持跨 Bucket；源对象会被删除。
     *
     * 语义为"复制到目标 → 删除源"，非原地重命名。
     * 权限由 `storage.objects` 的 RLS 策略判定：读取源需要 `SELECT`，写入目标需要 `INSERT`，删除源需要 `DELETE`。
     *
     * - `options.destinationBucket` 不传时在同一 Bucket 内移动。
     *
     * @param fromPath 源对象 Bucket 内相对路径。
     * @param toPath 目标对象相对路径。
     * @param options 目标 Bucket 等选项。
     */
    move(fromPath: string, toPath: string, options?: DestinationOptions): Promise<
      | { data: { message: string }; error: null }
      | { data: null; error: StorageError }
    >

    /**
     * 获取对象元信息。
     *
     * 返回对象在 `storage.objects` 表中的记录信息，包括 `bucketId`、`version`、`etag`、
     * `contentType`、`cacheControl`、`metadata`、`lastModified`、`createdAt` 等。
     *
     * @param path Bucket 内相对路径。
     */
    info(path: string): Promise<
      | { data: ObjectInfo; error: null }
      | { data: null; error: StorageError }
    >

    /**
     * 判断对象是否存在。
     *
     * 底层调用 `info` 端点：
     * - HTTP 200 → 存在（返回 `true`）。
     * - HTTP 400 或 404 → 不存在（返回 `false`）。
     * - 其他异常 → 返回 `{ data: null, error }`。
     *
     * @param path Bucket 内相对路径。
     */
    exists(path: string): Promise<
      | { data: boolean; error: null }
      | { data: null; error: StorageError }
    >

    /**
     * 生成单个对象的签名下载 URL。
     *
     * 需要登录态，权限由 `storage.objects` 的 RLS `SELECT` 策略判定。
     *
     * - `expiresIn` 以秒为单位，过期后 URL 不可用。
     * - 返回的 `fullSignedURL` 是服务端已拼接好的完整 URL，客户端可直接使用（无需再拼 HOST）。
     * - `options.download` 为 `true` 时追加 `?download`，浏览器访问时自动触发下载。
     *
     * @param path Bucket 内相对路径。
     * @param expiresIn 过期时间，单位为秒。
     * @param options 签名下载 URL 选项；当前仅支持 `download`，不支持图片 `transform`。
     */
    createSignedUrl(path: string, expiresIn: number, options?: SignedUrlOptions): Promise<
      | { data: { fullSignedURL: string }; error: null }
      | { data: null; error: StorageError }
    >

    /**
     * 批量生成对象的签名下载 URL。
     *
     * 需要登录态，权限由 `storage.objects` 的 RLS `SELECT` 策略判定。
     *
     * - 后端单次最多 500 个，超出时 SDK 自动分批发送。
     * - 返回数组中每个元素包含 `path`、`fullSignedURL`（完整 URL，生成失败时为 `null`）、`error`。
     * - 部分路径生成失败不会影响其他路径。
     *
     * @param paths Bucket 内相对路径数组。
     * @param expiresIn 过期时间，单位为秒。
     * @param options 签名下载 URL 选项；当前仅支持 `download`，不支持图片 `transform`。
     */
    createSignedUrls(paths: string[], expiresIn: number, options?: SignedUrlOptions): Promise<
      | { data: Array<{ path: string; fullSignedURL: string | null; error: string | null }>; error: null }
      | { data: null; error: StorageError }
    >

    /**
     * 两阶段上传（第一阶段）：生成签名上传 URL，需登录态。
     *
     * 服务端基于调用者身份 + RLS 策略判断上传权限，生成临时签名 URL 和 token。
     * 适合的场景：服务端鉴定用户权限后，将 `token` 下发给不受信客户端（如浏览器前端），
     * 让客户端用 `uploadToSignedUrl` 直接上传文件，无需暴露登录凭证。
     *
     * - 返回的 `fullSignedURL` 是服务端已拼接好的完整上传 URL。
     * - 返回的 `token` 是临时凭证，与 `uploadToSignedUrl` 配合使用。
     * - `options.upsert` 为 `true` 时允许覆盖同名对象。
     *
     * @param path Bucket 内相对路径。
     * @param options 签名上传选项，`upsert=true` 时允许覆盖。
     * @see uploadToSignedUrl
     */
    createSignedUploadUrl(path: string, options?: { upsert?: boolean }): Promise<
      | { data: { fullSignedURL: string; token: string; path: string }; error: null }
      | { data: null; error: StorageError }
    >

    /**
     * 两阶段上传（第二阶段）：使用签名上传 token 上传对象，无需登录态。
     *
     * 配合 `createSignedUploadUrl` 完成两阶段上传：
     * 1. 服务端调用 `createSignedUploadUrl` 生成 token（需登录态）
     * 2. 客户端调用本方法，凭 token 上传文件（无需登录态）
     *
     * - 请求**不携带**登录态，仅凭 `token` 鉴权。
     * - `path` 和 `token` 必须与 `createSignedUploadUrl` 的返回值对应。
     *
     * @param path Bucket 内相对路径，需与 `createSignedUploadUrl` 的 `path` 一致。
     * @param token `createSignedUploadUrl()` 返回的 `token`。
     * @param fileBody 文件内容。
     * @param fileOptions 上传选项。
     * @see createSignedUploadUrl
     */
    uploadToSignedUrl(path: string, token: string, fileBody: FileBody, fileOptions?: UploadOptions): Promise<
      | { data: { path: string; fullPath: string }; error: null }
      | { data: null; error: StorageError }
    >

    /**
     * 同步获取 public bucket 对象的公开访问 URL；不发请求、不返回 `error`。
     *
     * **同步方法**，不发起网络请求，不会抛异常。
     *
     * - URL 由客户端直接拼接 `{gateway}/v1/storages/object/public/{bucketId}/{path}` 得到。
     * - URL 是否可访问取决于 Bucket 的 `public` 属性。
     * - `options.download` 为 `true` 时追加 `?download`。
     *
     * @param path Bucket 内相对路径。
     * @param options 公开 URL 选项；当前仅支持 `download`，不支持图片 `transform`。
     */
    getPublicUrl(path: string, options?: PublicUrlOptions): { data: { publicUrl: string } }
  }
}

declare namespace cloudbase.database {
  /**
   * realtime types
   */
  /**
   * watch() 监听选项
   */
  interface IWatchOptions {
    /**
     * 数据变化回调。首次建立连接时会触发 `type: 'init'` 的初始化快照，
     * 后续每次数据变化（增/删/改）都会触发此回调。
     *
     * @param snapshot 数据快照，包含当前完整文档列表 `docs` 和本次变化详情 `docChanges`
     */
    onChange: (snapshot: ISnapshot) => void
    /**
     * 错误回调。在连接失败、token 过期、权限不足等异常时触发。
     *
     * **常见错误场景**：
     * - 未登录或 token 过期：需先调用 `auth.signInAnonymously()` 等方法完成认证
     * - 权限不足：检查安全规则配置
     * - 网络中断：SDK 会自动尝试重连，重连失败后触发此回调
     *
     * @param error 错误信息
     */
    onError: (error: any) => void
  }

  /**
   * 实时数据推送监听器。通过 `watch()` 方法返回，用于管理实时监听的生命周期。
   *
   * **重要**：在 React 组件卸载或不再需要监听时，务必调用 `close()` 释放资源，
   * 避免内存泄漏和不必要的网络连接。
   */
  interface DBRealtimeListener {
    /**
     * 关闭实时推送，释放 WebSocket 连接和相关资源。
     *
     * {@link https://docs.cloudbase.net/api-reference/webv3-next/database.html#shu-ju-ku-shi-shi-tui-song}
     *
     * @example
     * ```typescript
     * // 启动监听
     * const listener = db
     *   .collection('messages')
     *   .where({ roomId: 'room-1' })
     *   .watch({
     *     onChange: (snapshot) => {
     *       console.log('数据更新:', snapshot.docs);
     *     },
     *     onError: (error) => {
     *       console.error('监听异常:', error);
     *     }
     *   });
     *
     * // 不再需要时关闭监听
     * listener.close();
     *
     * // React 组件中的最佳实践
     * useEffect(() => {
     *   const listener = db.collection('xxx').watch({ onChange, onError });
     *   return () => listener.close(); // 组件卸载时自动清理
     * }, []);
     * ```
     */
    close: () => void
  }

  /**
   * 数据变化类型
   * - `'init'`：初始化数据（首次连接时返回的完整数据）
   * - `'update'`：文档被更新
   * - `'add'`：新增文档
   * - `'remove'`：文档被删除
   * - `'replace'`：文档被替换（set 操作）
   * - `'limit'`：因 limit 限制导致的数据变化
   */
  type DataType = 'init' | 'update' | 'add' | 'remove' | 'replace' | 'limit'

  /**
   * 队列操作类型
   * - `'init'`：初始化（对应 DataType 的 init）
   * - `'enqueue'`：文档进入监听结果集（新增或开始匹配查询条件）
   * - `'dequeue'`：文档离开监听结果集（删除或不再匹配查询条件）
   * - `'update'`：文档在结果集中被更新
   */
  type QueueType = 'init' | 'enqueue' | 'dequeue' | 'update'

  /**
   * 数据快照，每次 watch 回调都会收到此对象。
   *
   * **使用方式**：
   * - 获取当前完整数据列表：使用 `snapshot.docs`（数组，包含所有匹配文档的最新状态）
   * - 获取本次变化详情：使用 `snapshot.docChanges`（数组，仅包含本次变化的文档信息）
   * - 判断是否为初始化数据：检查 `snapshot.type === 'init'`
   *
   * @example
   * ```typescript
   * onChange: (snapshot) => {
   *   if (snapshot.type === 'init') {
   *     // 首次连接，snapshot.docs 包含初始完整数据
   *     console.log('初始数据:', snapshot.docs);
   *   } else {
   *     // 后续变化
   *     snapshot.docChanges.forEach(change => {
   *       switch (change.dataType) {
   *         case 'add':
   *           console.log('新增文档:', change.doc);
   *           break;
   *         case 'update':
   *           console.log('更新文档:', change.docId, change.updatedFields);
   *           break;
   *         case 'remove':
   *           console.log('删除文档:', change.docId);
   *           break;
   *       }
   *     });
   *     // snapshot.docs 始终是变化后的完整数据列表
   *     console.log('当前全部数据:', snapshot.docs);
   *   }
   * }
   * ```
   */
  interface ISnapshot {
    /** 快照序列号，单调递增 */
    id: number
    /** 本次变化的文档详情列表 */
    docChanges: ISingleDBEvent[]
    /** 当前完整的文档列表（变化后的最新状态） */
    docs: Record<string, any>[]
    /** 快照类型，`'init'` 表示初始化数据 */
    type?: SnapshotType
  }

  /**
   * 单个文档变化事件
   */
  interface ISingleDBEvent {
    /** 事件序列号 */
    id: number
    /** 数据变化类型：init/add/update/remove/replace/limit */
    dataType: DataType
    /** 队列操作类型：init/enqueue/dequeue/update */
    queueType: QueueType
    /** 变化文档的 ID */
    docId: string
    /** 变化后的完整文档内容（remove 时为删除前的文档） */
    doc: Record<string, any>
    /** 被更新的字段及新值（仅 dataType 为 update 时存在） */
    updatedFields?: any
    /** 被删除的字段列表（仅 dataType 为 update 时存在） */
    removedFields?: any
  }

  /** 快照类型。`'init'` 表示首次连接时返回的初始化数据 */
  type SnapshotType = 'init'

  interface IWatchable {
    /**
     * 开启实时数据推送，监听集合或文档的数据变化。
     *
     * **前置条件**：使用 `watch()` 前必须先完成用户认证（如匿名登录），
     * 否则 WebSocket 连接会因缺少认证信息而失败。
     *
     * {@link https://docs.cloudbase.net/api-reference/webv3-next/database#%E6%95%B0%E6%8D%AE%E5%BA%93%E5%AE%9E%E6%97%B6%E6%8E%A8%E9%80%81}
     *
     * @example
     * ```typescript
     * // === 完整示例：匿名登录 + watch + React 集成 ===
     * import Cloudbase from '@cloudbase/js-sdk';
     * import { useEffect, useState } from 'react';
     *
     * const app = Cloudbase.init({ env: 'your-env-id', region: 'ap-shanghai' });
     *
     * function RoomList() {
     *   const [rooms, setRooms] = useState<any[]>([]);
     *   const [error, setError] = useState<string | null>(null);
     *
     *   useEffect(() => {
     *     let listener: cloudbase.database.DBRealtimeListener | null = null;
     *
     *     async function setup() {
     *       // 第一步：必须先完成认证
     *       const auth = app.auth();
     *       const { error: authError } = await auth.signInAnonymously();
     *       if (authError) {
     *         setError('登录失败: ' + authError.message);
     *         return;
     *       }
     *
     *       // 第二步：认证成功后开启 watch
     *       const db = app.database();
     *       listener = db.collection('rooms')
     *         .where({ status: 'active' })
     *         .watch({
     *           onChange: (snapshot) => {
     *             // snapshot.docs 包含当前所有匹配文档
     *             setRooms(snapshot.docs as any[]);
     *           },
     *           onError: (err) => {
     *             console.error('watch 错误:', err);
     *             setError('实时同步异常: ' + (err?.message || err));
     *           }
     *         });
     *     }
     *
     *     setup();
     *
     *     // 第三步：组件卸载时清理监听
     *     return () => {
     *       if (listener) listener.close();
     *     };
     *   }, []);
     *
     *   if (error) return <div>错误: {error}</div>;
     *   return (
     *     <ul>
     *       {rooms.map(room => <li key={room._id}>{room.name}</li>)}
     *     </ul>
     *   );
     * }
     * ```
     *
     * @param options 监听选项
     * @param options.onChange 数据变化回调，接收 {@link ISnapshot} 快照对象
     * @param options.onError 错误回调，在连接异常、认证失败等情况下触发
     *
     * @returns {@link DBRealtimeListener} 监听器实例，调用 `close()` 可停止监听
     */
    watch(options: IWatchOptions): DBRealtimeListener
  }
  /**
   * collection types
   */
  interface ICollection extends IQuery {
    /**
     * 向集合中添加一条新记录
     *
     * {@link https://docs.cloudbase.net/api-reference/webv3-next/database#add}
     *
     * @example
     * const result = await db.collection('todos').add({
     *   title: '学习 CloudBase',
     *   completed: false
     * })
     * console.log('新增成功，文档 ID:', result.id)
     *
     * @param data 要新增的数据对象或数据对象数组，支持嵌套对象、数组、地理位置等数据类型
     *
     * @return Promise<AddRes> 包含新增文档的 id（单条）或 ids（批量）和 requestId
     */
    add(data: Object | Object[]): Promise<AddRes>
    /**
     * 获取一条文档的引用
     *
     * {@link https://docs.cloudbase.net/api-reference/webv3-next/database#record--document}
     *
     * @param id 文档ID
     */
    doc(id: string | number): IDocument
    /**
     * 获取聚合操作对象
     *
     * {@link https://docs.cloudbase.net/api-reference/webv3-next/database#aggregate}
     *
     * @example
     * const result = await db.collection('todos')
     *   .aggregate()
     *   .group({ _id: '$priority', count: { $sum: 1 } })
     *   .end()
     *
     * @return 聚合操作对象，可链式调用各种聚合阶段方法
     */
    aggregate(): IAggregate
  }
  /**
   * command types
   */
  interface IGeoNearOptions {
    geometry: IGeo['Point'] // 点的地理位置
    maxDistance?: number // 选填，最大距离，米为单位
    minDistance?: number // 选填，最小距离，米为单位
  }
  interface IGeoWithinOptions {
    geometry: IPolygon | IMultiPolygon
  }
  interface IGeoIntersectsOptions {
    geometry: IPoint | ILineString | IMultiPoint | IMultiLineString | IPolygon | IMultiPolygon
  }
  interface ICommand {
    /**
     * 表示字段等于某个值
     *
     * {@link https://docs.cloudbase.net/api-reference/webv3-next/database#eq}
     *
     * @example
     * const _ = db.command;
     * db.collection("demo").where({
     *   num: _.eq(10)
     * })
     *
     * @param val 接受一个字面量 (literal)，可以是 `number`, `boolean`, `string`, `object`, `array`
     *
     */
    eq(val: number | string | boolean | Object | any[]): any
    /**
     * 表示字段不等于某个值
     *
     * {@link https://docs.cloudbase.net/api-reference/webv3-next/database#neq}
     *
     * @example
     * const _ = db.command;
     * db.collection("demo").where({
     *   num: _.neq(10)
     * })
     *
     * @param val 接受一个字面量 (literal)，可以是 `number`, `boolean`, `string`, `object`, `array`
     *
     */
    neq(val: number | string | boolean | Object | any[]): any
    /**
     * 字段大于指定值
     *
     * {@link https://docs.cloudbase.net/api-reference/webv3-next/database#gt}
     *
     * @example
     * const _ = db.command;
     * db.collection("demo").where({
     *   num: _.gt(10)
     * })
     *
     * @param val 数字
     *
     */
    gt(val: number): any
    /**
     * 字段大于或等于指定值
     *
     * {@link https://docs.cloudbase.net/api-reference/webv3-next/database#neq}
     *
     * @example
     * const _ = db.command;
     * db.collection("demo").where({
     *   num: _.gte(10)
     * })
     *
     * @param val 数字
     *
     */
    gte(val: number): any
    /**
     * 字段小于指定值
     *
     * {@link https://docs.cloudbase.net/api-reference/webv3-next/database#lt}
     *
     * @example
     * const _ = db.command;
     * db.collection("demo").where({
     *   num: _.lt(10)
     * })
     *
     * @param val 数字
     *
     */
    lt(val: number): any
    /**
     * 字段小于或等于指定值
     *
     * {@link https://docs.cloudbase.net/api-reference/webv3-next/database#lte}
     *
     * @example
     * const _ = db.command;
     * db.collection("demo").where({
     *   num: _.lte(10)
     * })
     *
     * @param val 数字
     *
     */
    lte(val: number): any
    /**
     * 字段值在给定的数组中
     *
     * {@link https://docs.cloudbase.net/api-reference/webv3-next/database#in}
     *
     * @example
     * const _ = db.command;
     * db.collection("demo").where({
     *   num: _.in([1,2,3])
     * })
     *
     * @param list 数组
     *
     */
    in(list: any[]): any
    /**
     * 字段值不在给定的数组中
     *
     * {@link https://docs.cloudbase.net/api-reference/webv3-next/database#nin}
     *
     * @example
     * const _ = db.command;
     * db.collection("demo").where({
     *   num: _.nin([1,2,3])
     * })
     *
     * @param list 数组
     *
     */
    nin(list: any[]): any
    /**
     * 表示需同时满足指定的两个或以上的条件
     *
     * {@link https://docs.cloudbase.net/api-reference/webv3-next/database#and}
     *
     * @example
     * const _ = db.command;
     * db.collection("demo").where({
     *   num: _.and(_.gt(4), _.lt(32))
     * })
     *
     * @param args 多个条件
     *
     */
    and(...args: any[]): any
    /**
     * 表示需满足所有指定条件中的至少一个
     *
     * {@link https://docs.cloudbase.net/api-reference/webv3-next/database#or}
     *
     * @example
     * const _ = db.command;
     * db.collection("demo").where({
     *   num: _.or(_.gt(4), _.lt(32))
     * })
     *
     * @param args 多个条件
     *
     */
    or(...args: any[]): any
    /**
     * 用于设定字段等于指定值
     *
     * {@link https://docs.cloudbase.net/api-reference/webv3-next/database#set}
     *
     * @example
     * const _ = db.command;
     * db.collection("demo")
     *   .doc("doc-id")
     *   .update({
     *      data: {
     *        style: _.set({
     *          color: "red"
     *        })
     *      }
     *   });
     *
     * @param val 被设定的属性对象
     *
     */
    set(val: any): any
    /**
     * 用于指示字段自增某个值
     *
     * {@link https://docs.cloudbase.net/api-reference/webv3-next/database#inc}
     *
     * @example
     * const _ = db.command;
     * db.collection("demo")
     *   .doc("doc-id")
     *   .update({
     *      count: {
     *       favorites: _.inc(1)
     *     }
     *   });
     *
     * @param val 自增的值
     *
     */
    inc(val: number): any
    /**
     * 用于指示字段自乘某个值
     *
     * {@link https://docs.cloudbase.net/api-reference/webv3-next/database#mul}
     *
     * @example
     * const _ = db.command;
     * db.collection("demo")
     *   .doc("doc-id")
     *   .update({
     *      count: {
     *       favorites: _.mul(21)
     *     }
     *   });
     *
     * @param val 自乘的值
     *
     */
    mul(val: number): any
    /**
     * 用于表示删除某个字段
     *
     * {@link https://docs.cloudbase.net/api-reference/webv3-next/database#remove}
     *
     * @example
     * const _ = db.command;
     * db.collection("demo")
     *   .doc("doc-id")
     *   .update({
     *      rating: _.remove()
     *   });
     *
     */
    remove(): any
    /**
     * 向数组尾部追加元素
     *
     * {@link https://docs.cloudbase.net/api-reference/webv3-next/database#push}
     *
     * @example
     * const _ = db.command;
     * db.collection("demo")
     *   .doc("doc-id")
     *   .update({
     *      users: _.push(["aaa", "bbb"])
     *   });
     *
     * @param val 支持传入单个元素或数组
     */
    push(val: any): any
    /**
     * 删除数组尾部元素
     *
     * {@link https://docs.cloudbase.net/api-reference/webv3-next/database#pop}
     *
     * @example
     * const _ = db.command;
     * db.collection("demo")
     *   .doc("doc-id")
     *   .update({
     *      users: _.pop()
     *   });
     *
     */
    pop(): any
    /**
     * 向数组头部添加元素
     *
     * {@link https://docs.cloudbase.net/api-reference/webv3-next/database#unshift}
     *
     * @example
     * const _ = db.command;
     * db.collection("demo")
     *   .doc("doc-id")
     *   .update({
     *      users: _.unshift(["aaa", "bbb"])
     *   });
     *
     * @param val 支持传入单个元素或数组
     */
    unshift(val: any): any
    /**
     * 删除数组头部元素
     *
     * {@link https://docs.cloudbase.net/api-reference/webv3-next/database#shift}
     *
     * @example
     * const _ = db.command;
     * db.collection("demo")
     *   .doc("doc-id")
     *   .update({
     *      users: _.unshift()
     *   });
     *
     */
    shift(): any
    /**
     * 条件取反
     *
     * @example
     * const _ = db.command;
     * db.collection('users').where({
     *   status: _.not(_.eq('deleted'))
     * })
     *
     * @param condition 查询条件
     */
    not(condition: any): any
    /**
     * 都不满足指定的条件
     *
     * @example
     * const _ = db.command;
     * db.collection('users').where(
     *   _.nor([{ status: 'banned' }, { status: 'deleted' }])
     * )
     *
     * @param conditions 条件数组
     */
    nor(conditions: any[]): any
    /**
     * 判断字段是否存在
     *
     * @example
     * const _ = db.command;
     * db.collection('users').where({
     *   avatar: _.exists(true)
     * })
     *
     * @param val true 表示字段存在，false 表示不存在
     */
    exists(val: boolean): any
    /**
     * 取模运算
     *
     * @example
     * const _ = db.command;
     * db.collection('users').where({
     *   age: _.mod([2, 0])
     * })
     *
     * @param val [除数, 余数]
     */
    mod(val: [number, number]): any
    /**
     * 数组包含所有指定元素
     *
     * @example
     * const _ = db.command;
     * db.collection('articles').where({
     *   tags: _.all(['javascript', 'nodejs'])
     * })
     *
     * @param list 必须包含的元素数组
     */
    all(list: any[]): any
    /**
     * 数组元素匹配
     *
     * @example
     * const _ = db.command;
     * db.collection('orders').where({
     *   items: _.elemMatch({ price: _.gt(100) })
     * })
     *
     * @param condition 匹配条件对象
     */
    elemMatch(condition: Object): any
    /**
     * 数组长度匹配
     *
     * @example
     * const _ = db.command;
     * db.collection('articles').where({
     *   tags: _.size(3)
     * })
     *
     * @param size 数组长度
     */
    size(size: number): any
    /**
     * 取最小值更新
     *
     * @param val 比较值
     */
    min(val: number): any
    /**
     * 取最大值更新
     *
     * @param val 比较值
     */
    max(val: number): any
    /**
     * 重命名字段
     *
     * @param newFieldName 新字段名
     */
    rename(newFieldName: string): any
    /**
     * 位运算
     *
     * @param options 位运算选项，如 { and: 5 }
     */
    bit(options: Object): any
    /**
     * 删除数组中匹配的元素
     *
     * @example
     * const _ = db.command;
     * db.collection('articles').doc('id').update({
     *   tags: _.pull('要删除的标签')
     * })
     *
     * @param val 要删除的元素或匹配条件
     */
    pull(val: any): any
    /**
     * 删除数组中所有匹配的元素
     *
     * @param list 要删除的元素数组
     */
    pullAll(list: any[]): any
    /**
     * 向数组添加不重复的元素
     *
     * @example
     * const _ = db.command;
     * db.collection('articles').doc('id').update({
     *   tags: _.addToSet('唯一标签')
     * })
     *
     * @param val 要添加的元素
     */
    addToSet(val: any): any
    /**
     * 按从近到远的顺序，找出字段值在给定点的附近的文档
     *
     * {@link https://docs.cloudbase.net/api-reference/webv3-next/database#geonear}
     *
     * @example
     * const _ = db.command;
     * db.collection("demo").where({
     *   location: _.geoNear({
     *     geometry: new db.Geo.Point(lngA, latA),
     *     maxDistance: 1000,
     *     minDistance: 0
     *   })
     * });
     *
     * @param options
     * @param options.geometry 点的地理位置
     * @param options.maxDistance 【可选】最大距离，米为单位
     * @param options.minDistance 【可选】最小距离，米为单位
     */
    geoNear(options: IGeoNearOptions): any
    /**
     * 找出字段值在指定 Polygon / MultiPolygon 内的文档，无排序
     *
     * {@link https://docs.cloudbase.net/api-reference/webv3-next/database#geowithin}
     *
     * @example
     * const _ = db.command;
     * db.collection("demo").where({
     *   location: _.geoWithin({
     *     geometry: new Polygon({
     *       new LineString([...Points])
     *     }),
     *   })
     * });
     *
     * @param options
     * @param options.geometry 地理位置
     */
    geoWithin(options: IGeoWithinOptions): any
    /**
     * 找出字段值和给定的地理位置图形相交的文档
     *
     * {@link https://docs.cloudbase.net/api-reference/webv3-next/database#geointersects}
     *
     * @example
     * const _ = db.command;
     * db.collection("user").where({
     *   location: _.geoNear({
     *     geometry: new LineString([new Point(lngA, latA), new Point(lngB, latB)]);
     *   })
     * });
     *
     * @param options
     * @param options.geometry 地理位置
     */
    geoIntersects(options: IGeoIntersectsOptions): any
  }
  /**
   * document types
   */
  interface IDocument extends IWatchable {
    /**
     * 设置文档数据，如果文档不存在则创建新文档
     *
     * {@link https://docs.cloudbase.net/api-reference/webv3-next/database.html#update-set}
     *
     * @example
     * collection
     *   .doc('docId')
     *   .set({name:'cloudbase'})
     *   .then(res=>{})
     *
     * @param data 要设置的数据对象，将完全替换原有文档内容
     *
     * @return Promise<SetRes> 包含 updated 或 upsertedId
     */
    set(data: Object): Promise<SetRes>
    /**
     * 获取文档数据
     *
     * {@link https://docs.cloudbase.net/api-reference/webv3-next/database#get}
     *
     * @example
     * collection
     *   .doc('docId')
     *   .get()
     *   .then(res=>{ console.log(res.data) })
     *
     * @return Promise<GetRes> 包含 data 数组和 requestId
     */
    get(): Promise<GetRes>
    /**
     * 更新文档数据，如果文档不存在则不做任何操作
     *
     * {@link https://docs.cloudbase.net/api-reference/webv3-next/database#update--set}
     *
     * @example
     * collection
     *   .doc('docId')
     *   .update({completed: true})
     *   .then(res=>{ console.log(res.updated) })
     *
     * @param data 要更新的数据对象，支持操作符
     *
     * @return Promise<UpdateRes> 包含 updated 字段
     */
    update(data: Object): Promise<UpdateRes>
    /**
     * 删除一条文档
     *
     * {@link https://docs.cloudbase.net/api-reference/webv3-next/database.html#remove-2}
     *
     * @example
     * collection
     *   .doc('docId')
     *   .remove()
     *   .then(res=>{ console.log(res.deleted) })
     *
     * @return Promise<RemoveRes> 包含 deleted 字段
     */
    remove(): Promise<RemoveRes>
    /**
     * 指定要返回的字段
     *
     * {@link https://docs.cloudbase.net/api-reference/webv3-next/database#field}
     *
     * @param projection 字段投影对象，true 表示返回，false 表示不返回
     *
     * @return 文档引用，可继续链式调用 get()
     */
    field(projection: Object): IDocument
  }
  /**
   * query types
   */
  interface SetRes {
    code?: string
    message?: string
    updated?: number
    upsertedId?: string
    requestId: string
  }
  interface GetRes {
    data: any[]
    requestId: string
    code?: string
    message?: string
  }

  interface UpdateRes {
    requestId: string
    updated?: number
    upsertedId?: string
    code?: string
    message?: string
  }

  interface AddRes {
    id?: string
    ids?: string[]
    insertedIds?: string[]
    requestId: string
    code?: string
    message?: string
  }

  interface CountRes {
    total: number
    requestId: string
    code?: string
    message?: string
  }

  interface RemoveRes {
    deleted: number
    requestId: string
    code?: string
    message?: string
  }

  interface CreateCollectionRes {
    data: string
    requestId: string
    code?: string
    message?: string
  }

  interface IRunCommandsReq {
    /** 命令对象数组 */
    commands: Object[]
    /** 事务 ID（可选） */
    transactionId?: string
  }

  interface IRunCommandsResult {
    requestId: string
    /** 命令执行结果数组 */
    list: Object[][]
    code?: string
    message?: string
  }

  /**
   * 数据库配置
   */
  interface IDbConfig {
    /** 实例 ID（可选），不填则使用默认实例 */
    instance?: string
    /** 数据库名称（可选），不填则使用默认数据库 */
    database?: string
  }

  /**
   * 聚合操作对象
   */
  interface IAggregate {
    /**
     * 添加新字段
     */
    addFields(fieldObj: Object): IAggregate
    /**
     * 分桶
     */
    bucket(bucketObj: Object): IAggregate
    /**
     * 自动分桶
     */
    bucketAuto(bucketObj: Object): IAggregate
    /**
     * 计数
     */
    count(fieldName: string): IAggregate
    /**
     * 地理位置附近查询
     */
    geoNear(options: Object): IAggregate
    /**
     * 分组统计
     *
     * @example
     * db.collection('todos').aggregate()
     *   .group({ _id: '$priority', count: { $sum: 1 } })
     *   .end()
     */
    group(groupObj: Object): IAggregate
    /**
     * 限制结果数量
     */
    limit(limit: number): IAggregate
    /**
     * 联表查询
     */
    lookup(lookupObj: Object): IAggregate
    /**
     * 条件筛选
     */
    match(matchObj: Object): IAggregate
    /**
     * 字段投影
     */
    project(projectObj: Object): IAggregate
    /**
     * 替换根文档
     */
    replaceRoot(replaceObj: Object): IAggregate
    /**
     * 随机采样
     */
    sample(sampleObj: Object): IAggregate
    /**
     * 跳过数量
     */
    skip(skip: number): IAggregate
    /**
     * 排序
     */
    sort(sortObj: Object): IAggregate
    /**
     * 按数量排序
     */
    sortByCount(fieldName: string): IAggregate
    /**
     * 展开数组
     */
    unwind(fieldPath: string | Object): IAggregate
    /**
     * 结束聚合管道，返回结果
     */
    end(): Promise<GetRes>
  }

  /**
   * 事务对象
   */
  interface ITransaction {
    /**
     * 获取事务内的集合引用
     */
    collection(name: string): ITransactionCollection
    /**
     * 提交事务
     */
    commit(): Promise<void>
    /**
     * 回滚事务
     *
     * @param reason 回滚原因
     */
    rollback(reason?: any): Promise<void>
  }

  /**
   * 事务内的集合引用
   */
  interface ITransactionCollection {
    doc(id: string): ITransactionDocument
  }

  /**
   * 事务内的文档引用
   */
  interface ITransactionDocument {
    get(): Promise<GetRes>
    create(data: Object): Promise<any>
    set(data: Object): Promise<SetRes>
    update(data: Object): Promise<UpdateRes>
    remove(): Promise<RemoveRes>
  }

  interface QueryOrder {
    field?: string
    direction?: 'asc' | 'desc'
  }

  interface QueryOption {
    // 查询数量
    limit?: number
    // 偏移量
    offset?: number
    // 指定显示或者不显示哪些字段
    projection?: Object
  }
  interface IQuery extends IWatchable {
    /**
     * 获取数据库查询结果
     *
     * {@link https://docs.cloudbase.net/api-reference/webv3-next/database.html#get}
     *
     * @example
     * collection
     *   .where({
     *     name: 'cloudbase'
     *   })
     *   .get()
     *   .then(res=>{})
     *
     * @return Promise-查询结果
     */
    get(): Promise<GetRes>
    /**
     * 更新数据库文档
     *
     * {@link https://docs.cloudbase.net/api-reference/webv3-next/database.html#update-set}
     *
     * @example
     * collection
     *   .where({
     *     name: 'cloudbase'
     *   })
     *   .update({
     *      name: 'newCloudbase'
     *    })
     *   .then(res=>{})
     *
     * @return Promise-查询结果
     */
    update(data: Object): Promise<UpdateRes>
    /**
     * 获取数据库查询结果的数目
     *
     * {@link https://docs.cloudbase.net/api-reference/webv3-next/database#count}
     *
     * @example
     * collection
     *   .where({
     *     name: 'cloudbase'
     *   })
     *   .count()
     *   .then(res=>{})
     *
     * @return Promise<CountRes> 包含 total 字段
     */
    count(): Promise<CountRes>
    /**
     * 设置过滤条件
     *
     * {@link https://docs.cloudbase.net/api-reference/webv3-next/database#where}
     *
     * @example
     * collection
     *   .where({
     *     name: 'cloudbase'
     *   })
     *
     * @param query 可接收对象作为参数，表示筛选出拥有和传入对象相同的 key-value 的文档
     *
     */
    where(query: Object): ExcludeOf<IQuery, 'where'>
    /**
     * 指定查询结果集数量上限
     *
     * {@link https://docs.cloudbase.net/api-reference/webv3-next/database#limit}
     *
     * @example
     * collection
     *   .where({
     *     name: 'cloudbase'
     *   })
     *   .limit(1)
     *
     * @param limit 查询结果数量上限
     */
    limit(limit: number): ExcludeOf<IQuery, 'where'>
    /**
     * 指定查询返回结果时从指定序列后的结果开始返回，常用于分页
     *
     * {@link https://docs.cloudbase.net/api-reference/webv3-next/database#skip}
     *
     * @example
     * collection
     *   .where({
     *     name: 'cloudbase'
     *   })
     *   .skip(4)
     *
     * @param offset 跳过的条目数量
     */
    skip(offset: number): ExcludeOf<IQuery, 'where'>
    /**
     * 指定查询排序条件
     *
     * {@link https://docs.cloudbase.net/api-reference/webv3-next/database#orderby}
     *
     * @example
     * collection
     *   .where({
     *     name: 'cloudbase'
     *   })
     *   .orderBy("name", "asc")
     *
     * @param field 排序的字段
     * @param orderType 排序的顺序，升序(asc) 或 降序(desc)
     */
    orderBy(field: string, orderType: 'desc' | 'asc'): ExcludeOf<IQuery, 'where'>
    /**
     * 指定返回结果中文档需返回的字段
     *
     * {@link https://docs.cloudbase.net/api-reference/webv3-next/database#field}
     *
     * @example
     * collection
     *   .where({
     *     name: 'cloudbase'
     *   })
     *   .field({ age: true })
     *
     * @param projection 要过滤的字段集合，不返回传 false，返回传 true
     */
    field(projection: Object): ExcludeOf<IQuery, 'where'>
    /**
     * 删除查询到的结果
     *
     * {@link https://docs.cloudbase.net/api-reference/webv3-next/database#remove-1}
     *
     * @example
     * collection
     *   .where({
     *     name: 'cloudbase'
     *   })
     *   .remove()
     *
     * @return Promise<RemoveRes> 包含 deleted 字段
     */
    remove(): Promise<RemoveRes>
  }
  /**
   * geo types
   */
  interface IPoint {}
  interface ILineString {}
  interface IPolygon {}
  interface IMultiPoint {}
  interface IMultiLineString {}
  interface IMultiPolygon {}
  interface IGeo {
    /**
     * 用于表示地理位置点
     *
     * {@link https://docs.cloudbase.net/api-reference/webv3-next/database#point}
     *
     * @example
     * const point = new db.Geo.Point(lng,lat);
     *
     * @param longitude 经度
     * @param latitude 纬度
     *
     * @return Point
     */
    Point: {
      new (longitude: number, latitude: number): IPoint
    }
    /**
     * 用于表示地理路径，是由两个或者更多的 Point 组成的线段
     *
     * {@link https://docs.cloudbase.net/api-reference/webv3-next/database#linestring}
     *
     * @example
     * const point = new db.Geo.LineString([pointA,pointB]);
     *
     * @param points Point数组
     *
     * @return LineString
     */
    LineString: {
      new (points: IPoint[]): ILineString
    }
    /**
     * 用于表示地理上的一个多边形
     *
     * {@link https://docs.cloudbase.net/api-reference/webv3-next/database#polygon}
     *
     * @example
     * const point = new db.Geo.Polygon([lineStringA,lineStringB]);
     *
     * @param lines LineString数组
     *
     * @return Polygon
     */
    Polygon: {
      new (lines: ILineString[]): IPolygon
    }
    /**
     * 用于表示多个点 Point 的集合
     *
     * {@link https://docs.cloudbase.net/api-reference/webv3-next/database#multipoint}
     *
     * @example
     * const point = new db.Geo.MultiPoint([pointA,pointB]);
     *
     * @param points Point数组
     *
     * @return MultiPoint
     */
    MultiPoint: {
      new (points: IPoint[]): IMultiPoint
    }
    /**
     * 用于表示多个地理路径 LineString 的集合
     *
     * {@link https://docs.cloudbase.net/api-reference/webv3-next/database#multilinestring}
     *
     * @example
     * const point = new db.Geo.MultiLineString([lineA,lineB]);
     *
     * @param lines LineString数组
     *
     * @return MultiLineString
     */
    MultiLineString: {
      new (lines: ILineString[]): IMultiLineString
    }
    /**
     * 用于表示多个地理多边形 Polygon 的集合
     *
     * {@link https://docs.cloudbase.net/api-reference/webv3-next/database#multipolygon}
     *
     * @example
     * const point = new db.Geo.MultiPolygon([polygonA,polygonB]);
     *
     * @param polygons Polygon数组
     *
     * @return MultiPolygon
     */
    MultiPolygon: {
      new (polygons: IPolygon[]): IMultiPolygon
    }
  }
  /**
   * regexp types
   */
  interface IRegExpOptions {
    regexp: string
    options?: string
  }
  interface IRegExp {
    (options: IRegExpOptions): any
  }
  /**
   * instance types
   */
  interface App {
    /**
     * 数据库指令
     *
     * {@link https://docs.cloudbase.net/api-reference/webv3-next/database#%E6%9F%A5%E8%AF%A2%E6%8C%87%E4%BB%A4}
     */
    command: ICommand
    /**
     * 数据库Geo地理位置
     *
     * {@link https://docs.cloudbase.net/api-reference/webv3-next/database.html#geo-shu-ju-lei-xing}
     */
    Geo: IGeo
    /**
     * 根据正则表达式进行筛选
     *
     * {@link https://docs.cloudbase.net/api-reference/webv3-next/database.html#regexp}
     *
     * @example
     * db.collection('articles').where({
     *   version: new db.RegExp({
     *     regexp: '^\\ds'   // 正则表达式为 /^\ds/，转义后变成 '^\\ds'
     *     options: 'i'    // i表示忽略大小写
     *   })
     * })
     *
     * @param options
     * @param options.regexp 正则表达式Pattern
     * @param options.options 正则表达式Flags
     */
    RegExp: IRegExp
    /**
     * 创建集合的引用
     *
     * {@link https://docs.cloudbase.net/api-reference/webv3-next/database.html#collection}
     *
     * @example
     * const coll = db.collection('demo');
     *
     * @param name 集合名称
     *
     * @return 集合的引用
     */
    collection(name: string): ICollection

    runCommands(params: IRunCommandsReq): Promise<{
      statusCode: number
      requestId: string
      list?: Object[][]
      code?: string
      message?: string
    }>
  }
}


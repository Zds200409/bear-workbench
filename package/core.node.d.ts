/// <reference path="./core.d.ts" />

/**
 * Node.js 环境专属类型定义（ambient）。
 *
 * 通过声明合并（declaration merging）在共享的 `cloudbase` 命名空间之上追加
 * 仅在 Node.js 运行时可用的接口、常量与方法。仅由 `index.node.d.ts` 引用，
 * 因此这些定义不会出现在 Web/浏览器构建的类型中。
 */
declare namespace cloudbase {
  /**
   * ICloudbaseConfig 的 Node.js 专属字段（通过声明合并追加）。
   * 这些字段仅在 Node.js 入口（index.node.d.ts）可见，Web 构建不包含。
   */
  interface ICloudbaseConfig {
    /** 密钥 ID（Node.js 端使用） */
    secretId?: string
    /** 密钥（Node.js 端使用） */
    secretKey?: string
    /** 临时会话 Token（Node.js 端使用） */
    sessionToken?: string
    /** 自定义登录密钥 */
    credentials?: { private_key_id: string; private_key: string; env_id?: string; }
    // @cloudbase/functions-framework 函数上下文，只要求部分字段，只在云函数或云托管中有效
    context?: Readonly<{
      eventID: string
      extendedContext?: {
        envId: string // 环境 ID
        // uin: string             // 请求的 UIN
        source: string // 请求来源，如 wx
        accessToken?: string // 调用请求时的 AccessToken
        userId?: string // 请求的用户 ID
        tmpSecret?: {
          // 临时凭证
          secretId: string // secretId
          secretKey: string // secretKey
          token: string // token
        }
      }
    }>
  }

  /**
   * ICloudbaseAuthConfig 的 Node.js 专属字段（通过声明合并追加）。
   */
  interface ICloudbaseAuthConfig {
    /** 密钥 ID（Node.js 端使用） */
    secretId?: string
    /** 密钥（Node.js 端使用） */
    secretKey?: string
    /** 临时会话 Token（Node.js 端使用） */
    sessionToken?: string
    /** 密钥类型 */
    secretType?: 'SESSION_SECRET' | 'SECRET'
  }

  /**
   * 云函数入口 context 参数结构（仅 Node.js 环境）
   */
  interface IContextParam {
    memory_limit_in_mb: number
    time_limit_in_ms: number
    request_id: string
    /** 老架构环境变量字符串，分号分隔的 key=value */
    environ?: string
    /** 新架构环境变量 JSON 字符串 */
    environment?: string
    function_version: string
    function_name: string
    namespace: string
  }

  /**
   * 云函数运行时完整环境变量类型汇总（仅 Node.js 环境）
   * 包含 SCF、TCB、微信相关的所有环境变量
   */
  interface ICompleteCloudbaseContext {
    _SCF_TCB_LOG?: string
    LOGINTYPE?: string
    QQ_APPID?: string
    QQ_OPENID?: string
    SCF_NAMESPACE: string
    TCB_CONTEXT_CNFG?: string
    TCB_CONTEXT_KEYS: string[]
    TCB_CUSTOM_USER_ID?: string
    TCB_ENV: string
    TCB_HTTP_CONTEXT?: string
    TCB_ISANONYMOUS_USER?: string
    TCB_ROUTE_KEY?: string
    TCB_SEQID: string
    TCB_SESSIONTOKEN?: string
    TCB_SOURCE_IP?: string
    TCB_SOURCE?: string
    TCB_TRACELOG?: string
    TCB_UUID?: string
    TENCENTCLOUD_RUNENV: string
    TENCENTCLOUD_SECRETID: string
    TENCENTCLOUD_SECRETKEY: string
    TENCENTCLOUD_SESSIONTOKEN: string
    CLOUDBASE_APIKEY: string
    TRIGGER_SRC: string
    WX_API_TOKEN?: string
    WX_APPID?: string
    WX_CLIENTIP?: string
    WX_CLIENTIPV6?: string
    WX_CLOUDBASE_ACCESSTOKEN?: string
    WX_CONTEXT_KEYS: string[]
    WX_OPENID?: string
    WX_TRIGGER_API_TOKEN_V0?: string
    WX_UNIONID?: string
  }

  /**
   * 自定义登录 Ticket 创建选项（仅 Node.js 环境）
   */
  interface ICreateTicketOpts {
    /** 刷新间隔（毫秒），默认 3600000（1小时） */
    refresh?: number
    /** 过期时间戳（毫秒），默认 7 天后 */
    expire?: number
  }

  /**
   * 当前请求用户信息（仅 Node.js 环境）
   */
  interface IGetUserInfoResult {
    openId: string
    appId: string
    uid: string
    customUserId: string
    isAnonymous: boolean
  }

  /**
   * getEndUserInfo 返回结果（仅 Node.js 环境）
   */
  interface IGetEndUserInfoResult {
    userInfo?: {
      openId: string
      appId: string
      uid: string
      customUserId: string
      isAnonymous: boolean
      [key: string]: any
    }
    requestId?: string
    code?: string
    message?: string
  }

  /**
   * 用户信息查询请求参数（仅 Node.js 环境）
   */
  interface IUserInfoQuery {
    platform?: string
    platformId?: string
    uid?: string
  }

  /**
   * 模板消息推送请求参数（仅 Node.js 环境）
   */
  interface ITemplateNotifyReq {
    /** 通知策略 ID */
    notifyId: string
    /** 通知模板变量键值对 */
    data?: Record<string, unknown>
    /** 点击消息打开的页面地址 */
    url?: string
  }

  /**
   * Node 端 Auth Context 解析结果（仅 Node.js 环境）
   */
  interface INodeAuthContext {
    uid?: string
    loginType?: string
    appId?: string
    openId?: string
  }

  /**
   * SDK 版本号（仅 Node.js 环境下挂载）
   */
  const version: string
  /**
   * 当前环境标记 Symbol（仅 Node.js 环境下挂载）
   */
  const SYMBOL_CURRENT_ENV: symbol
  /**
   * 默认环境标记 Symbol（仅 Node.js 环境下挂载）
   */
  const SYMBOL_DEFAULT_ENV: symbol
  /**
   * 解析并校验云函数入口的 Context 参数（仅 Node.js 环境）
   *
   * @param context 云函数入口传入的 context 对象
   */
  function parseContext(context: IContextParam): Record<string, any>
  /**
   * 获取当前云函数内的所有环境变量（仅 Node.js 环境）
   * 统一从 process.env 和 context 两个来源合并取值
   *
   * @param context 可选，云函数入口的 context 参数
   */
  function getCloudbaseContext(context?: IContextParam): ICompleteCloudbaseContext
}

declare namespace cloudbase.app {
  interface App {
    /**
     * 解析并缓存云函数入口的 Context 参数（仅 Node.js 环境）
     *
     * @param context 云函数入口传入的 context 对象
     */
    parseContext(context: cloudbase.IContextParam): Record<string, any>
    /**
     * 获取当前云函数内的所有环境变量（仅 Node.js 环境）
     *
     * @param context 可选，云函数入口的 context 参数
     */
    getCloudbaseContext(context?: cloudbase.IContextParam): cloudbase.ICompleteCloudbaseContext
    /**
     * 发送订阅消息 / 模板通知（仅 Node.js 环境）
     *
     * @param params 模板通知参数
     * @param opts 可选，请求配置
     */
    sendTemplateNotification(
      params: cloudbase.ITemplateNotifyReq,
      opts?: { timeout?: number },
    ): Promise<cloudbase.functions.ICallFunctionResponse>
    /**
     * 调用微信开放接口（仅 Node.js 环境）
     */
    callWxOpenApi(wxOpenApiOptions: any, opts?: cloudbase.ICustomReqOpts): Promise<any>
    /**
     * 调用微信支付接口（仅 Node.js 环境）
     */
    callWxPayApi(wxOpenApiOptions: any, opts?: cloudbase.ICustomReqOpts): Promise<any>
    /**
     * 调用微信云托管接口（仅 Node.js 环境）
     */
    wxCallContainerApi(wxOpenApiOptions: any, opts?: cloudbase.ICustomReqOpts): Promise<any>
    /**
     * 调用微信兼容开放接口（仅 Node.js 环境）
     */
    callCompatibleWxOpenApi(wxOpenApiOptions: any, opts?: cloudbase.ICustomReqOpts): Promise<any>
    /**
     * 获取文件访问权限（仅 Node.js 环境）
     *
     * @param params 文件列表参数
     * @param opts 可选，请求配置
     */
    getFileAuthority(
      params: { fileList: Array<{ type: string; path: string }> },
      opts?: cloudbase.ICustomReqOpts,
    ): Promise<any>
    /**
     * 调用已开放的 API（仅 Node.js 环境）
     */
    callApis(callApiOptions: any, opts?: cloudbase.ICustomReqOpts): Promise<any>
  }
}

declare namespace cloudbase.auth {
  interface App {
    /**
     * 获取终端用户信息（仅 Node.js 环境）
     * 不传 uid 时返回当前请求用户信息，传 uid 时查询指定用户
     */
    getEndUserInfo(uid?: string): Promise<cloudbase.IGetEndUserInfoResult>
    /**
     * 创建自定义登录 Ticket（仅 Node.js 环境）
     */
    createTicket(uid: string, options?: cloudbase.ICreateTicketOpts): Promise<string>
    /**
     * 按条件查询用户信息（管理端接口，仅 Node.js 环境）
     */
    queryUserInfo(query: cloudbase.IUserInfoQuery): Promise<any>
    /**
     * 获取客户端 IP 地址（仅 Node.js 环境）
     */
    getClientIP(): string
    /**
     * 获取 Auth Context（从运行环境中解析，仅 Node.js 环境）
     */
    getAuthContext(context?: any): cloudbase.INodeAuthContext
    /**
     * 获取客户端凭证（仅 Node.js 环境）
     */
    getClientCredential(opts?: cloudbase.ICustomReqOpts): Promise<any>
  }
}

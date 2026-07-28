import { ICloudbaseConfig, KV, ICloudbase } from '.'
import { authModels, UserInfo } from '@cloudbase/oauth'
import { ICloudbaseEventEmitter } from './events'

export type ICloudbaseAuthConfig = Pick<
ICloudbaseConfig,
| 'env'
| 'clientId'
| 'region'
| 'persistence'
| 'debug'
| '_fromApp'
| 'oauthInstance'
| 'wxCloud'
| 'i18n'
| 'accessKey'
| 'useWxCloud'
| 'auth'
> &
ICloudbaseConfig['auth']
& {eventBus?: ICloudbaseEventEmitter}

export interface IAccessTokenInfo {
  accessToken: string
  env: string
}
export interface ICredential {
  // refreshToken: string;
  accessToken?: string
  accessTokenExpire?: string
}
export interface IAuthProvider {
  signInWithRedirect: () => any
}
export interface IUserInfo {
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
export interface IUser extends IUserInfo {
  checkLocalInfo: () => void
  checkLocalInfoAsync: () => Promise<void>
  linkWithTicket?: (ticket: string) => Promise<void>
  linkWithRedirect?: (provider: IAuthProvider) => void
  getLinkedUidList?: () => Promise<{ hasPrimaryUid: boolean; users: IUserInfo[] }>
  setPrimaryUid?: (uid: string) => Promise<void>
  unlink?: (loginType: 'CUSTOM' | 'WECHAT-OPEN' | 'WECHAT-PUBLIC' | 'WECHAT-UNION') => Promise<void>
  update: (userinfo: authModels.UserProfile) => Promise<void>
  refresh: (params?: { version?: string }) => Promise<authModels.UserInfo>
}
export interface ILoginState {
  user: IUser
}

/**
 * v1 兼容事件回调收到的载荷。
 *
 * 运行时实际传入的是 `ILoginState` 与事件元数据（`eventType` 等）的混合对象；
 * 在某些时机（如未登录、首次立即回调）可能为 `null`。这里用一个开放的载荷类型
 * 精确表达其形态，取代原先的裸 `Function`，同时保持对既有回调写法的非破坏。
 */
export type IAuthEventPayload =
  | (Partial<ILoginState> & {
    /** 事件类型标识（如 `SIGN_IN` / `SIGN_OUT` / `CREDENTIALS_ERROR` 等）。 */
    eventType?: string
    /** 事件携带的原始数据。 */
    data?: KV<any>
    [key: string]: any
  })
  | null

/**
 * v1 兼容事件回调签名。
 *
 * @deprecated 推荐改用 `onAuthStateChange((event, session, info) => {})` 监听，
 * 该回调仅为兼容旧代码保留。
 */
export type IAuthEventCallback = (payload: IAuthEventPayload) => void

/**
 * 认证核心能力：状态字段与核心方法，均为**非可选**（与 `ICloudbase` 拆分同款）。
 */
export interface AuthCore {
  config: ICloudbaseConfig
  loginType: string
  getAccessToken: () => IAccessTokenInfo
  getLoginState: () => Promise<ILoginState | null>
  hasLoginState: () => Promise<ILoginState | null>
  getUserInfo: () => Promise<UserInfo & IUser>
  getAuthHeader: () => Promise<KV<string>>
  /** 当前登录用户，未登录时为 null */
  currentUser: IUser | null
}

/**
 * 认证事件监听能力（v1 兼容）。
 *
 * @deprecated 这些监听器均为兼容旧代码保留，推荐统一改用
 * `onAuthStateChange((event, session, info) => {})`。回调签名已从裸 `Function`
 * 收紧为精确类型 {@link IAuthEventCallback}，对既有 `(state) => {}` 写法非破坏。
 */
export interface AuthEventCapability {
  onLoginStateChanged: (callback: IAuthEventCallback) => void
  onLoginStateExpired: (callback: IAuthEventCallback) => void
  onAccessTokenRefreshed: (callback: IAuthEventCallback) => void
  onAnonymousConverted: (callback: IAuthEventCallback) => void
  onLoginTypeChanged: (callback: IAuthEventCallback) => void
  /** 决定是否刷新 accessToken 的钩子，返回 `true` 表示需要刷新。 */
  shouldRefreshAccessToken: (hook: () => boolean) => void
}

/**
 * 认证身份源提供方能力。三个 provider 由 `registerProvider` 动态注册，
 * 类型收敛为 {@link IAuthProvider}（取代原先的 `any`）。
 */
export interface AuthProviderCapability {
  weixinAuthProvider: IAuthProvider
  anonymousAuthProvider: IAuthProvider
  customAuthProvider: IAuthProvider
}

/**
 * 认证客户端总类型。
 *
 * 由 {@link AuthCore} + {@link AuthEventCapability} + {@link AuthProviderCapability}
 * 交叉组合而成，与原先的单一大接口**结构等价**（字段无增删，仅按能力分层 +
 * 收紧回调/provider 类型），因此对既有代码非破坏。
 */
export type ICloudbaseAuth = AuthCore & AuthEventCapability & AuthProviderCapability

/**
 * 按需组合的认证客户端泛型。
 *
 * 默认等价于完整的 {@link ICloudbaseAuth}；也可只声明需要的能力，例如
 * `CloudbaseAuthClient<AuthEventCapability>` 只暴露事件监听，为 tree-shaking
 * 与精确 API 面铺路。
 */
export type CloudbaseAuthClient<
  Caps = AuthEventCapability & AuthProviderCapability,
> = AuthCore & Caps

type IProvider = new (...args: any[]) => any

export interface ICloudbaseAuthModule {
  registerAuth: (app: ICloudbase) => void
  registerProvider: (name: string, provider: IProvider) => void
}

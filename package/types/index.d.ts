import { CloudbaseAdapter, SDKAdapterInterface, ResponseObject } from '@cloudbase/adapter-interface'
import { ICloudbaseComponent, ICloudbaseHook } from './component'
import { ICloudbaseRequest } from './request'
import { ICloudbaseCache } from './cache'
import { ICloudbaseAuth } from './auth'
import { ICallFunctionOptions, ICallFunctionResponse } from './functions'
import {
  ICloudbaseUploadFileParams,
  ICloudbaseUploadFileResult,
  ICloudbaseDeleteFileParams,
  ICloudbaseDeleteFileResult,
  ICloudbaseGetTempFileURLParams,
  ICloudbaseGetTempFileURLResult,
  ICloudbaseDownloadFileParams,
  ICloudbaseDownloadFileResult,
  ICloudbaseCopyFileParams,
  ICloudbaseCopyFileResult,
} from './storage'
import { cloudbase } from '../cloudbase/index'

// 统一返回判别联合与错误契约（可辨识联合范式）
export { Result, SafeResult } from './result'
export { ICloudbaseError, CloudbaseErrorBrand, CloudbaseErrorLike } from './error'

export enum LANGS {
  ZH = 'zh-CN',
  EN = 'en-US',
}

export type Persistence = 'local' | 'session' | 'none'

export interface KV<T> {
  [key: string]: T
}

export interface KVstring {
  [key: string]: string
}

export type EndPointKey = 'CLOUD_API' | 'GATEWAY'

/** 自定义登录凭证信息（从控制台下载的私钥文件） */
export interface ICredentialsInfo {
  /** 私钥 ID */
  private_key_id: string;
  /** RSA 私钥内容 */
  private_key: string;
  /** 所属环境 ID */
  env_id: string;
}

export interface ICloudbaseConfig {
  env: string
  intl?: boolean,
  region?: string
  timeout?: number
  persistence?: Persistence
  oauthClient?: any
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
  endPointMode?: EndPointKey // auth请求域名模式，默认CLOUD_API
  useWxCloud?: boolean // 是否使用微信云开发链路
  auth?: {
    detectSessionInUrl?: boolean
    secretId?: string
    secretKey?: string
    sessionToken?: string
    secretType?: 'SESSION_SECRET' | 'SECRET'
    credentials?: ICredentialsInfo // 自定义登录私钥信息，node端使用
  }
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
// 可更新的配置字段
export type ICloudbaseUpgradedConfig = Pick<ICloudbaseConfig, 'persistence' | 'region' | 'debug'>

export interface ICloudbaseExtension {
  name: string
  invoke: (opts: any, app: ICloudbase) => Promise<any>
}

declare type MethodType = 'request' | 'post' | 'get' | 'head' | 'patch' | 'delete' | 'put'
export interface ICloudbaseApis {
  [apiName: string]: {
    [method in MethodType]: (callApiOptions: ICallApiOptions, opts?: KV<any>) => Promise<ResponseObject['data']>
  }
}

/**
 * Cloudbase 核心能力（始终存在，与运行时是否注册某个业务组件无关）。
 *
 * 这些字段/方法由 SDK 初始化流程直接提供，因此**不是可选的**。
 * 业务能力（auth / functions / storage / database / ai / models / mysql 等）
 * 被拆分到独立的 `*Capability` 接口，通过下面的 `ICloudbase` 交叉类型组合。
 */
export interface CloudbaseCore {
  config: ICloudbaseConfig
  platform: ICloudbasePlatformInfo
  cache: ICloudbaseCache
  request: ICloudbaseRequest
  oauthClient: any
  localCache: ICloudbaseCache
  authInstance?: ICloudbaseAuth
  oauthInstance?: any
  apis: ICloudbaseApis
  init: (config: ICloudbaseConfig & { lang?: LANGS }) => cloudbase.app
  updateConfig: (config: ICloudbaseUpgradedConfig) => void
  registerExtension: (ext: ICloudbaseExtension) => void
  invokeExtension: (name: string, opts: any) => Promise<any>
  useAdapters: (adapters: CloudbaseAdapter | CloudbaseAdapter[], options?: any) => void
  registerComponent: (component: ICloudbaseComponent) => void
  registerHook: (hook: ICloudbaseHook) => void
  registerVersion: (version: string) => void
  fire?: (...args: any[]) => void
  updateLang?: (lang: LANGS) => void
  /**
   * 检查当前 Cloudbase 实例是否已完成初始化
   * @returns 是否已初始化
   */
  isInitialized?: () => boolean
  getEndPointWithKey?: (key: EndPointKey) => {
    BASE_URL: string
    PROTOCOL: string
  }
}

/** 身份鉴权能力（`registerAuth` 注册后可用）。 */
export interface AuthCapability {
  auth?: (options?: { persistence: cloudbase.auth.Persistence }) => cloudbase.auth.App
}

/** 云函数能力（`registerFunctions` 注册后可用）。 */
export interface FunctionsCapability {
  /** 调用云函数 */
  callFunction?: <T = any>(
    options: ICallFunctionOptions,
    callback?: (err: Error | null, res: ICallFunctionResponse<T> | null) => void,
  ) => Promise<ICallFunctionResponse<T>>
}

/** 数据库能力（`registerDatabase` 注册后可用）。 */
export interface DatabaseCapability {
  /** 获取数据库实例 */
  database?: (dbConfig?: { instance?: string; database?: string }) => cloudbase.database.App
}

/** 云存储能力（`registerStorage` 注册后可用）。 */
export interface StorageCapability {
  /** Storage 命名空间实例（from 分流 + Bucket 管理） */
  storage?: cloudbase.storage.StorageClient
  /** 上传文件 */
  uploadFile?: (params: ICloudbaseUploadFileParams, callback?: Function) => Promise<ICloudbaseUploadFileResult>
  /** 下载文件 */
  downloadFile?: (params: ICloudbaseDownloadFileParams, callback?: Function) => Promise<ICloudbaseDownloadFileResult>
  /** 删除云端文件 */
  deleteFile?: (params: ICloudbaseDeleteFileParams, callback?: Function) => Promise<ICloudbaseDeleteFileResult>
  /** 获取文件临时下载链接 */
  getTempFileURL?: (params: ICloudbaseGetTempFileURLParams, callback?: Function) => Promise<ICloudbaseGetTempFileURLResult>
  /** 复制/移动文件 */
  copyFile?: (params: ICloudbaseCopyFileParams, callback?: Function) => Promise<ICloudbaseCopyFileResult>
}

/**
 * 完整的 Cloudbase 实例类型。
 *
 * = 核心能力 `CloudbaseCore` + 各业务能力 `*Capability` 的交叉组合。
 * 结构上等价于旧的单一大接口，但拆分后可读性更好、可按需组合，
 * 也为未来 tree-shaking 友好的模块化 client 打基础。
 *
 * 如需只声明「用到的能力子集」，可直接使用 {@link CloudbaseClient} 泛型组合，
 * 例如 `CloudbaseClient<AuthCapability & FunctionsCapability>`。
 */
export type ICloudbase = CloudbaseCore
  & AuthCapability
  & FunctionsCapability
  & DatabaseCapability
  & StorageCapability

/**
 * 按需组合的 Cloudbase 客户端类型。
 *
 * 始终包含核心能力 `CloudbaseCore`，并叠加调用方声明的能力集合 `Caps`。
 *
 * @example
 * ```ts
 * // 只用到 auth 与云函数能力
 * type MyClient = CloudbaseClient<AuthCapability & FunctionsCapability>
 * ```
 *
 * @typeParam Caps - 需要叠加的能力集合，默认叠加全部内置能力（等价于 `ICloudbase`）
 */
export type CloudbaseClient<
  Caps = AuthCapability & FunctionsCapability & DatabaseCapability & StorageCapability,
> = CloudbaseCore & Caps

/**
 * Node.js 端适配器扩展方法
 */
export interface INodeAdapterExtend {
  /**
   * 从环境变量中获取腾讯云临时密钥信息
   * 用于 API 请求签名
   */
  getSecretInfo?: (config?: ICloudbaseConfig) => {
    env: string
    secretId: string
    secretKey: string
    sessionToken: string
    accessKey: string
    secretType: string
    credentials?: string
  }
  /**
   * 初始化 Node.js 端工具方法，挂载到 js-sdk app 实例上
   * 包含：auth 相关方法、模板消息推送、context 解析
   */
  nodeTool?: (
    /** js-sdk cloudbase 实例 */
    app: any,
    /** 配置信息，包含认证凭证和环境 ID */
    config: ICloudbaseConfig,
  ) => void
}
export interface ICloudbasePlatformInfo {
  adapter?: SDKAdapterInterface & INodeAdapterExtend
  runtime?: string
}

export interface IGenericError<T extends string, P = any> extends Error {
  type: T
  payload: P
  generic: boolean
}

export interface ICallApiOptions {
  /** api标识 */
  name?: string
  /** 请求的path */
  path?: string
  method?: string
  headers?: KV<any>
  /** 请求体，根据content-type可以是不同类型 */
  body?: KV<any> | string
  token?: string
}

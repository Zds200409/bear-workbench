import { KV } from '.'

export interface ICallFunctionOptions {
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

export interface ICallFunctionResponse<T = any> {
  requestId: string
  /**
   * 云函数返回值。
   *
   * 默认 `any` 以保持对既有调用方（直接访问 `res.result.xxx`）的**非破坏**兼容；
   * 推荐通过泛型参数指定精确类型以获得类型安全：`callFunction<{ n: number }>(...)`。
   */
  result: T
}

export type ICallFunction = <T = any>(
  options: ICallFunctionOptions,
  callback?: (err: Error | null, res: ICallFunctionResponse<T> | null) => void,
) => Promise<ICallFunctionResponse<T>>

export interface IRetryOptions {
  retries?: number
  factor?: number
  minTimeout?: number
  maxTimeout?: number
  randomize?: boolean
  timeouts?: number[]
  timeoutOps?: {
    timeout: number
    cb: (...args: any[]) => void
  }
}

export interface ICustomReqOpts {
  timeout?: number
  retryOptions?: IRetryOptions
  from?: 'node-sdk'
}

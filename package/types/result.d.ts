import { ICloudbaseError } from './error'

/**
 * `{ data, error }` 统一返回结构（可辨识联合 / Discriminated Union）。
 *
 * 判别字段为 `error` 是否为 `null`：
 * - 成功：`{ data: T; error: null }`
 * - 失败：`{ data: null; error: E }`
 *
 * @example
 * ```ts
 * const res = await sdk.callFunction<{ n: number }>({ name: 'foo' })
 * if (res.error === null) {
 *   // 此处 res.data 被自动收窄为 { n: number }（非 null）
 *   console.log(res.data.n)
 * } else {
 *   // 此处 res.data 被收窄为 null，res.error 为 E
 *   console.error(res.error.message)
 * }
 * ```
 *
 * @typeParam T - 成功时的数据类型
 * @typeParam E - 失败时的错误类型，默认 `ICloudbaseError`
 */
export type Result<T, E extends ICloudbaseError = ICloudbaseError> =
  | { data: T; error: null }
  | { data: null; error: E }

/**
 * 安全解构变体：失败分支的 `data` 不是 `null`，而是把成功 shape 的每个字段映射成 `null`。
 *
 * 这样即使不先判空 `error`，也能安全解构成功结构里的字段（值可能为 `null`）：
 *
 * @example
 * ```ts
 * // 无需先判 res.data === null 即可解构
 * const { data: { user, session } } = await auth.signInWithPassword({ ... })
 * ```
 *
 * 该类型用于「已有 `{ data: { ... } }` 嵌套结构、需要平滑升级为判别联合」的场景（如 auth）。
 * 相比 `Result<T>`，它对既有解构代码是**非破坏性**的升级。
 *
 * @typeParam T - 成功时的数据结构（必须为对象）
 * @typeParam E - 失败时的错误类型，默认 `ICloudbaseError`
 */
export type SafeResult<T extends object, E extends ICloudbaseError = ICloudbaseError> =
  | { data: T; error: null }
  | { data: { [K in keyof T]: null }; error: E }

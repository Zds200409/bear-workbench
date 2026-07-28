/**
 * Cloudbase 统一错误结构契约。
 *
 * 这是一个**结构化契约**（structural contract），而非要求所有错误都继承同一个 class。
 * 各模块的具体错误类（如 auth 的 `AuthError`、storage 的 `StorageError`）只要满足此结构，
 * 即可作为 `Result<T, E>` / `SafeResult<T, E>` 的错误分支类型 `E`。
 *
 * 运行时判别推荐使用各模块的类型守卫（如 `isStorageError`），
 * 或检查隐藏标记字段（如 `__isStorageError`），而非 `instanceof`
 * （`instanceof` 在跨 bundle / 跨 realm 场景会失效）。
 */
export interface ICloudbaseError extends Error {
  /** 错误名称，用于二级判别（如 `'StorageApiError'`）。 */
  name: string
  /** 人类可读的错误描述。 */
  message: string
  /** 便于 `JSON.stringify` 时不丢失关键字段（原生 Error 序列化会丢 name/message）。 */
  toJSON?: () => Record<string, unknown>
}

/**
 * Cloudbase 体系内错误的隐藏标记字段集合。
 *
 * 各模块的错误类都携带其中之一（在其构造函数中设为 `true`）：
 * - `__isAuthError`     —— {@link !AuthError}（`@cloudbase/oauth`）
 * - `__isStorageError`  —— `StorageError`（`@cloudbase/storage`）
 *
 * 之所以用隐藏标记而非 `instanceof`，是因为多个 SDK 副本共存（跨 bundle / 跨 realm）
 * 时 `instanceof` 会失效，而标记字段始终可靠。
 */
export type CloudbaseErrorBrand = '__isAuthError' | '__isStorageError'

/**
 * 统一的跨模块错误判别类型。
 *
 * 任何携带 {@link CloudbaseErrorBrand} 标记之一的对象，都被视为 Cloudbase 体系内的错误，
 * 满足 {@link ICloudbaseError} 契约。各模块另提供具体的运行时守卫（`isAuthError` /
 * `isStorageError`），本类型用于在类型层统一表达「这是一个 Cloudbase 错误」。
 */
export type CloudbaseErrorLike = ICloudbaseError & Partial<Record<CloudbaseErrorBrand, boolean>>

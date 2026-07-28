import { KVstring } from '.'
import { ICustomReqOpts } from './functions'

/**
 * 上传/下载时的原始文件内容，覆盖浏览器与 Node 两端形态：
 * - Node 端：`Buffer`（属于 `Uint8Array`）、可读流（含 `size`/`byteLength` 的对象）
 * - 浏览器端：`Blob` / `File` / `ArrayBuffer` / TypedArray 等 `ArrayBufferView`
 * - 纯文本内容：`string`
 *
 * 末尾的 `{ size?: number; byteLength?: number }` 兼容自定义流对象（实现层据此推算
 * content-length）。这是一个开放联合：既约束常见形态，又不排除运行时特殊对象。
 */
export type FileContent =
  | Blob
  | ArrayBuffer
  | ArrayBufferView
  | Uint8Array
  | string
  | { size?: number; byteLength?: number; [key: string]: any };

export interface ICloudbaseUploadFileParams {
  cloudPath: string;
  filePath: string;
  method?: 'post' | 'put';
  headers?: KVstring;
  onUploadProgress?: Function;
  /** 文件内容：Buffer / 可读流（Node 端）或 Blob / ArrayBuffer（浏览器端） */
  fileContent?: FileContent;
  customReqOpts?: ICustomReqOpts;
}

export interface ICloudbaseUploadFileByPutParams {
  cloudPath: string;
  filePath: string;
  headers?: KVstring;
  onUploadProgress?: Function;
}

export interface ICloudbaseUploadFileResult {
  fileID: string;
  requestId: string;
}

export type ICloudbaseUploadFile = (params: ICloudbaseUploadFileParams, callback?: Function) => Promise<ICloudbaseUploadFileResult>;

export interface ICloudbaseGetUploadMetadataParams {
  cloudPath: string;
  customReqOpts?: ICustomReqOpts;
}

export type ICloudbaseGetUploadMetadata = (params: ICloudbaseGetUploadMetadataParams, callback?: Function) => Promise<any>;

export interface ICloudbaseDeleteFileParams {
  fileList: string[];
  customReqOpts?: ICustomReqOpts;
}

export type ICloudbaseDeleteFile = (params: ICloudbaseDeleteFileParams, callback?: Function) => Promise<ICloudbaseDeleteFileResult>;

export interface ICloudbaseDeleteFileResult {
  code?: string;
  message?: string;
  fileList?: {
    code?: string;
    fileID: string;
  }[];
  requestId?: string;
}

export interface ICloudbaseFileInfo {
  fileID: string;
  maxAge: number;
}

export interface ICloudbaseGetTempFileURLParams {
  fileList: string[] | ICloudbaseFileInfo[];
  customReqOpts?: ICustomReqOpts;
}
export interface ICloudbaseGetTempFileURLResult {
  code?: string;
  message?: string;
  fileList?: {
    code?: string;
    message?: string;
    fileID: string;
    tempFileURL: string;
    download_url?: string;
  }[];
  requestId?: string;
}

export interface ICloudbaseCopyFileParams {
  fileList: Array<{
    srcPath: string
    dstPath: string
    overwrite?: boolean
    removeOriginal?: boolean
  }>
  customReqOpts?: ICustomReqOpts;
}


export interface ICloudbaseCopyFileResult {
  fileList: Array<{
    fileId?: string
    code?: string
    message?: string
  }>
  requestId?: string;
}

export type ICloudbaseGetTempFileURL = (params: ICloudbaseGetTempFileURLParams, callback?: Function) => Promise<ICloudbaseGetTempFileURLResult>;

export interface ICloudbaseDownloadFileParams {
  fileID: string;
  tempFilePath?: string;
  customReqOpts?: ICustomReqOpts;
}

export interface ICloudbaseDownloadFileResult {
  code?: string;
  message?: string;
  /** 下载得到的文件内容：Buffer / 流（Node 端）或 Blob / ArrayBuffer（浏览器端） */
  fileContent?: FileContent;
  requestId?: string;
}

export type ICloudbaseDownloadFile = (params: ICloudbaseDownloadFileParams, callback?: Function) => Promise<ICloudbaseDownloadFileResult>;

export interface ICloudbaseFileMetaData {
  url: string;
  token: string;
  authorization: string;
  fileId: string;
  cosFileId: string;
  download_url: string;
  code?: string;
  message?: string;
}

export interface ICloudbaseFileMetaDataRes {
  data: ICloudbaseFileMetaData;
  requestId: string;
}

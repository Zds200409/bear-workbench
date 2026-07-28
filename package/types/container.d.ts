import { ICloudbaseConfig } from '.'

export interface IContianerConfig {
  /**
   * wasm sdk 地址
   */
  wasmUrl?: string;
  /**
   * js sdk 地址
   */
  jsUrl?:
  | string
  | {
    vender?: string;
    vm?: string;
  };
  /**
   * 账号ID
   */
  uin: string;
  /**
   * 网关id
   */
  gatewayId: string;
  /**
   * 网关请求 host port
   */
  host: string;
  port: string;
  /**
   * 是否上报数据
   */
  report?: boolean | object;
  /**
   * public key
   */
  publicKey?: string;
  i18n?: ICloudbaseConfig['i18n'];
}

export interface ICallContainerOptions {
  /**
   * 填入业务自定义url和参数
   * 根目录，就是 /
   */
  url: string;
  /**
   * 请求网关api子路由
   */
  pathname?: string;
  /**
   * 按照自己的业务开发，选择对应的方法
   * @default GET
   */
  method?: string;
  /**
   * 设置请求的 header，header 中不能设置 Referer
   */
  header?: Record<string, string>;
  /**
   * 请求参数
   */
  data?: Object;
  /**
   * 超时时间，单位毫秒，默认60000
   */
  timeout?: number;
  /**
   * 超时提示细腻系
   */
  timeoutMsg?: string;

  /**
   * 响应 parse 类型
   */
  dataType?: 'json' | string;
  /**
   * 响应类型
   */
  responseType?: 'text' | 'arrayBuffer';
  /**
   * 是否上报数据
   */
  report?: boolean;
  /**
   * 请求 withCredentials
   */
  withCredentials?: boolean;
  /**
   * 请求是否为透明模式
   */
  transparent?: boolean;
}

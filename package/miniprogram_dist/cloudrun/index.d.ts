import { ICloudbase } from '@cloudbase/types';
import { ICallFunctionOptions, ICustomReqOpts } from '@cloudbase/types/functions';
export declare function requestContainer(this: any, options: ICallFunctionOptions, customReqOpts?: ICustomReqOpts): Promise<any>;
export declare function registerCloudrun(app: Pick<ICloudbase, 'registerComponent'>): void;

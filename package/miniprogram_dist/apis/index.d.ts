import type { ICloudbase } from '@cloudbase/types';
import { generateApis } from './callApis';
declare function registerApis(app: ICloudbase): void;
export { generateApis, registerApis };
export * from './type';

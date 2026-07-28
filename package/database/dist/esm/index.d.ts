import { Point } from './geo/point';
import { CollectionReference } from './collection';
import { Command } from './command';
export interface IDbConfig {
    env?: string;
    instance?: string;
    database?: string;
    [key: string]: any;
}
interface GeoTeyp {
    Point: typeof Point;
}
export { Query } from './query';
export { CollectionReference } from './collection';
export { DocumentReference } from './document';
export declare class Db {
    Geo: GeoTeyp;
    command: typeof Command;
    RegExp: any;
    serverDate: any;
    startTransaction: any;
    runTransaction: any;
    logicCommand: any;
    updateCommand: any;
    queryCommand: any;
    config: IDbConfig;
    static ws: any;
    static reqClass: any;
    static wsClass: any;
    static wsClientClass: any;
    static createSign: Function;
    static getAccessToken: Function;
    static dataVersion: string;
    static runtime: string;
    static appSecretInfo: any;
    static createRequest(config: IDbConfig): any;
    constructor(config?: IDbConfig);
    collection(collName: string): CollectionReference;
    createCollection(collName: string): any;
}

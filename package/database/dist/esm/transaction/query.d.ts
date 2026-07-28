import { Transaction } from './index';
import { OrderByDirection } from '../constant';
interface QueryOrder {
    field?: string;
    direction?: 'asc' | 'desc';
}
interface QueryOption {
    limit?: number;
    offset?: number;
    projection?: Object;
}
interface GetResult {
    data: any[];
    requestId: string;
    total?: number;
    limit?: number;
    offset?: number;
}
interface UpdateResult {
    requestId: string;
    updated: number;
}
interface DeleteResult {
    requestId: string;
    deleted: number | string;
}
export declare class Query {
    protected _transaction: Transaction;
    constructor(transaction: Transaction, coll: string, fieldFilters?: Object, fieldOrders?: QueryOrder[], queryOptions?: QueryOption);
    where(query: object): Query;
    orderBy(fieldPath: string, directionStr: OrderByDirection): Query;
    limit(limit: number): Query;
    skip(offset: number): Query;
    field(projection: any): Query;
    get(): Promise<GetResult>;
    count(): Promise<{
        requestId: string;
        total: number;
    }>;
    update(data: Object): Promise<UpdateResult>;
    remove(): Promise<DeleteResult>;
}
export {};

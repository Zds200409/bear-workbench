import { QueryCommand } from '../commands/query';
import { LogicCommand } from '../commands/logic';
export type IQueryCondition = Record<string, any> | LogicCommand;
export declare class QuerySerializer {
    constructor();
    static encode(query: IQueryCondition | QueryCommand | LogicCommand): IQueryCondition;
}

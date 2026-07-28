import { DocumentReference } from './document';
import { Query } from './query';
import Aggregation from './aggregate';
export declare class CollectionReference extends Query {
    get name(): string;
    doc(docID?: string | number): DocumentReference;
    add(data: Object | Object[], callback?: any): Promise<any>;
    aggregate(): Aggregation;
}

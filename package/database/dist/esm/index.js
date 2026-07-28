import * as Geo from './geo/index';
import { CollectionReference } from './collection';
import { Command } from './command';
import { ServerDateConstructor } from './serverDate/index';
import { RegExpConstructor } from './regexp/index';
import { startTransaction, runTransaction } from './transaction/index';
import { LogicCommand } from './commands/logic';
import { QueryCommand } from './commands/query';
import { UpdateCommand } from './commands/update';
export { Query } from './query';
export { CollectionReference } from './collection';
export { DocumentReference } from './document';
var Db = (function () {
    function Db(config) {
        this.config = config;
        this.Geo = Geo;
        this.serverDate = ServerDateConstructor;
        this.command = Command;
        this.RegExp = RegExpConstructor;
        this.startTransaction = startTransaction;
        this.runTransaction = runTransaction;
        this.logicCommand = LogicCommand;
        this.updateCommand = UpdateCommand;
        this.queryCommand = QueryCommand;
    }
    Db.createRequest = function (config) {
        var request = new Db.reqClass(config);
        var originalSend = request.send;
        request.send = function (action, data) {
            if (config.instance) {
                data.instance = config.instance;
            }
            if (config.database) {
                data.database = config.database;
            }
            return originalSend.call(this, action, data);
        };
        return request;
    };
    Db.prototype.collection = function (collName) {
        if (!collName) {
            throw new Error('Collection name is required');
        }
        return new CollectionReference(this, collName);
    };
    Db.prototype.createCollection = function (collName) {
        var request = Db.createRequest(this.config);
        var params = {
            collectionName: collName
        };
        return request.send('database.addCollection', params);
    };
    return Db;
}());
export { Db };

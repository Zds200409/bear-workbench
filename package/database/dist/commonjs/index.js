"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Db = exports.DocumentReference = exports.CollectionReference = exports.Query = void 0;
var Geo = require("./geo/index");
var collection_1 = require("./collection");
var command_1 = require("./command");
var index_1 = require("./serverDate/index");
var index_2 = require("./regexp/index");
var index_3 = require("./transaction/index");
var logic_1 = require("./commands/logic");
var query_1 = require("./commands/query");
var update_1 = require("./commands/update");
var query_2 = require("./query");
Object.defineProperty(exports, "Query", { enumerable: true, get: function () { return query_2.Query; } });
var collection_2 = require("./collection");
Object.defineProperty(exports, "CollectionReference", { enumerable: true, get: function () { return collection_2.CollectionReference; } });
var document_1 = require("./document");
Object.defineProperty(exports, "DocumentReference", { enumerable: true, get: function () { return document_1.DocumentReference; } });
var Db = (function () {
    function Db(config) {
        this.config = config;
        this.Geo = Geo;
        this.serverDate = index_1.ServerDateConstructor;
        this.command = command_1.Command;
        this.RegExp = index_2.RegExpConstructor;
        this.startTransaction = index_3.startTransaction;
        this.runTransaction = index_3.runTransaction;
        this.logicCommand = logic_1.LogicCommand;
        this.updateCommand = update_1.UpdateCommand;
        this.queryCommand = query_1.QueryCommand;
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
        return new collection_1.CollectionReference(this, collName);
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
exports.Db = Db;

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionReference = void 0;
var document_1 = require("./document");
var query_1 = require("./query");
var CollectionReference = (function (_super) {
    __extends(CollectionReference, _super);
    function CollectionReference(transaction, coll) {
        return _super.call(this, transaction, coll) || this;
    }
    Object.defineProperty(CollectionReference.prototype, "name", {
        get: function () {
            return this._coll;
        },
        enumerable: false,
        configurable: true
    });
    CollectionReference.prototype.doc = function (docID) {
        if (typeof docID !== 'string' && typeof docID !== 'number') {
            throw new Error('docId必须为字符串或数字');
        }
        return new document_1.DocumentReference(this._transaction, this._coll, docID);
    };
    CollectionReference.prototype.add = function (data) {
        var docID;
        if (data._id !== undefined) {
            docID = data._id;
        }
        var docRef = new document_1.DocumentReference(this._transaction, this._coll, docID);
        return docRef.create(data);
    };
    return CollectionReference;
}(query_1.Query));
exports.CollectionReference = CollectionReference;

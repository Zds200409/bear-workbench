var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { EJSON } from 'bson';
import { ErrorCode } from '../constant';
import { Validate } from '../validate';
import { QuerySerializer } from '../serializer/query';
import { UpdateSerializer } from '../serializer/update';
import { Util } from '../util';
var GET_DOC = 'database.getInTransaction';
var UPDATE_DOC = 'database.updateDocInTransaction';
var DELETE_DOC = 'database.deleteDocInTransaction';
var Query = (function () {
    function Query(transaction, coll, fieldFilters, fieldOrders, queryOptions) {
        this._coll = coll;
        this._transaction = transaction;
        this._fieldFilters = fieldFilters;
        this._fieldOrders = fieldOrders || [];
        this._queryOptions = queryOptions || {};
        this._request = this._transaction.getRequestMethod();
        this._transactionId = this._transaction.getTransactionId();
    }
    Query.prototype.where = function (query) {
        if (Object.prototype.toString.call(query).slice(8, -1) !== 'Object') {
            throw Error(ErrorCode.QueryParamTypeError);
        }
        var keys = Object.keys(query);
        var checkFlag = keys.some(function (item) {
            return query[item] !== undefined;
        });
        if (keys.length && !checkFlag) {
            throw Error(ErrorCode.QueryParamValueError);
        }
        return new Query(this._transaction, this._coll, QuerySerializer.encode(query), this._fieldOrders, this._queryOptions);
    };
    Query.prototype.orderBy = function (fieldPath, directionStr) {
        Validate.isFieldPath(fieldPath);
        Validate.isFieldOrder(directionStr);
        var newOrder = {
            field: fieldPath,
            direction: directionStr
        };
        var combinedOrders = this._fieldOrders.concat(newOrder);
        return new Query(this._transaction, this._coll, this._fieldFilters, combinedOrders, this._queryOptions);
    };
    Query.prototype.limit = function (limit) {
        Validate.isInteger('limit', limit);
        var option = __assign({}, this._queryOptions);
        option.limit = limit;
        return new Query(this._transaction, this._coll, this._fieldFilters, this._fieldOrders, option);
    };
    Query.prototype.skip = function (offset) {
        Validate.isInteger('offset', offset);
        var option = __assign({}, this._queryOptions);
        option.offset = offset;
        return new Query(this._transaction, this._coll, this._fieldFilters, this._fieldOrders, option);
    };
    Query.prototype.field = function (projection) {
        for (var k in projection) {
            if (projection[k]) {
                if (typeof projection[k] !== 'object') {
                    projection[k] = 1;
                }
            }
            else {
                projection[k] = 0;
            }
        }
        var option = __assign({}, this._queryOptions);
        option.projection = projection;
        return new Query(this._transaction, this._coll, this._fieldFilters, this._fieldOrders, option);
    };
    Query.prototype.get = function () {
        return __awaiter(this, void 0, void 0, function () {
            var newOrder, param, res, data, documents, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newOrder = [];
                        if (this._fieldOrders) {
                            this._fieldOrders.forEach(function (order) {
                                newOrder.push(order);
                            });
                        }
                        param = {
                            collectionName: this._coll,
                            transactionId: this._transactionId
                        };
                        if (this._fieldFilters) {
                            param.query = this._fieldFilters;
                        }
                        if (newOrder.length > 0) {
                            param.order = newOrder;
                        }
                        if (this._queryOptions.offset) {
                            param.offset = this._queryOptions.offset;
                        }
                        if (this._queryOptions.limit) {
                            param.limit = this._queryOptions.limit < 1000 ? this._queryOptions.limit : 1000;
                        }
                        else {
                            param.limit = 100;
                        }
                        if (this._queryOptions.projection) {
                            param.projection = this._queryOptions.projection;
                        }
                        return [4, this._request.send(GET_DOC, param)];
                    case 1:
                        res = _a.sent();
                        if (res.code)
                            throw res;
                        data = res.data !== 'null' ? EJSON.parse(res.data) : null;
                        documents = data ? (Array.isArray(data) ? Util.formatResDocumentData(data) : [Util.formatField(data)]) : [];
                        result = {
                            data: documents,
                            requestId: res.requestId
                        };
                        if (res.total !== undefined)
                            result.total = res.total;
                        if (res.limit !== undefined)
                            result.limit = res.limit;
                        if (res.offset !== undefined)
                            result.offset = res.offset;
                        return [2, result];
                }
            });
        });
    };
    Query.prototype.count = function () {
        return __awaiter(this, void 0, void 0, function () {
            var param, res, data, total;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        param = {
                            collectionName: this._coll,
                            transactionId: this._transactionId
                        };
                        if (this._fieldFilters) {
                            param.query = this._fieldFilters;
                        }
                        return [4, this._request.send(GET_DOC, param)];
                    case 1:
                        res = _a.sent();
                        if (res.code)
                            throw res;
                        data = res.data !== 'null' ? EJSON.parse(res.data) : null;
                        total = Array.isArray(data) ? data.length : (data ? 1 : 0);
                        return [2, {
                                requestId: res.requestId,
                                total: res.total !== undefined ? res.total : total
                            }];
                }
            });
        });
    };
    Query.prototype.update = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var param, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!data || typeof data !== 'object') {
                            throw new Error('参数必需是非空对象');
                        }
                        if (data.hasOwnProperty('_id')) {
                            throw new Error('不能更新_id的值');
                        }
                        param = {
                            collectionName: this._coll,
                            transactionId: this._transactionId,
                            query: this._fieldFilters,
                            data: EJSON.stringify(UpdateSerializer.encode(data), { relaxed: false })
                        };
                        return [4, this._request.send(UPDATE_DOC, param)];
                    case 1:
                        res = _a.sent();
                        if (res.code)
                            throw res;
                        return [2, __assign(__assign({}, res), { updated: EJSON.parse(res.updated) })];
                }
            });
        });
    };
    Query.prototype.remove = function () {
        return __awaiter(this, void 0, void 0, function () {
            var param, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (Object.keys(this._queryOptions).length > 0) {
                            console.warn('`offset`, `limit` and `projection` are not supported in remove() operation');
                        }
                        if (this._fieldOrders.length > 0) {
                            console.warn('`orderBy` is not supported in remove() operation');
                        }
                        param = {
                            collectionName: this._coll,
                            transactionId: this._transactionId,
                            query: this._fieldFilters
                        };
                        return [4, this._request.send(DELETE_DOC, param)];
                    case 1:
                        res = _a.sent();
                        if (res.code)
                            throw res;
                        return [2, __assign(__assign({}, res), { deleted: EJSON.parse(res.deleted) })];
                }
            });
        });
    };
    return Query;
}());
export { Query };

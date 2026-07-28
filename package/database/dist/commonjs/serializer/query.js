"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuerySerializer = void 0;
var query_1 = require("../commands/query");
var logic_1 = require("../commands/logic");
var symbol_1 = require("../helper/symbol");
var type_1 = require("../utils/type");
var operator_map_1 = require("../operator-map");
var common_1 = require("./common");
var QuerySerializer = (function () {
    function QuerySerializer() {
    }
    QuerySerializer.encode = function (query) {
        var encoder = new QueryEncoder();
        return encoder.encodeQuery(query);
    };
    return QuerySerializer;
}());
exports.QuerySerializer = QuerySerializer;
var QueryEncoder = (function () {
    function QueryEncoder() {
    }
    QueryEncoder.prototype.encodeQuery = function (query, key) {
        var _a;
        if ((0, common_1.isConversionRequired)(query)) {
            if ((0, logic_1.isLogicCommand)(query)) {
                return this.encodeLogicCommand(query);
            }
            else if ((0, query_1.isQueryCommand)(query)) {
                return this.encodeQueryCommand(query);
            }
            else {
                return _a = {}, _a[key] = this.encodeQueryObject(query), _a;
            }
        }
        else {
            if ((0, type_1.isObject)(query)) {
                return this.encodeQueryObject(query);
            }
            else {
                return query;
            }
        }
    };
    QueryEncoder.prototype.encodeRegExp = function (query) {
        return {
            $regex: query.source,
            $options: query.flags
        };
    };
    QueryEncoder.prototype.encodeLogicCommand = function (query) {
        var _a, _b, _c, _d, _e, _f, _g;
        var _this = this;
        switch (query.operator) {
            case logic_1.LOGIC_COMMANDS_LITERAL.NOR:
            case logic_1.LOGIC_COMMANDS_LITERAL.AND:
            case logic_1.LOGIC_COMMANDS_LITERAL.OR: {
                var $op = (0, operator_map_1.operatorToString)(query.operator);
                var subqueries = query.operands.map(function (oprand) {
                    return _this.encodeQuery(oprand, query.fieldName);
                });
                return _a = {},
                    _a[$op] = subqueries,
                    _a;
            }
            case logic_1.LOGIC_COMMANDS_LITERAL.NOT: {
                var $op = (0, operator_map_1.operatorToString)(query.operator);
                var operatorExpression = query.operands[0];
                if ((0, type_1.isRegExp)(operatorExpression)) {
                    return _b = {},
                        _b[query.fieldName] = (_c = {},
                            _c[$op] = this.encodeRegExp(operatorExpression),
                            _c),
                        _b;
                }
                else {
                    var subqueries = this.encodeQuery(operatorExpression)[query.fieldName];
                    return _d = {},
                        _d[query.fieldName] = (_e = {},
                            _e[$op] = subqueries,
                            _e),
                        _d;
                }
            }
            default: {
                var $op = (0, operator_map_1.operatorToString)(query.operator);
                if (query.operands.length === 1) {
                    var subquery = this.encodeQuery(query.operands[0]);
                    return _f = {},
                        _f[$op] = subquery,
                        _f;
                }
                else {
                    var subqueries = query.operands.map(this.encodeQuery.bind(this));
                    return _g = {},
                        _g[$op] = subqueries,
                        _g;
                }
            }
        }
    };
    QueryEncoder.prototype.encodeQueryCommand = function (query) {
        if ((0, query_1.isComparisonCommand)(query)) {
            return this.encodeComparisonCommand(query);
        }
        else {
            return this.encodeComparisonCommand(query);
        }
    };
    QueryEncoder.prototype.encodeComparisonCommand = function (query) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        if (query.fieldName === symbol_1.SYMBOL_UNSET_FIELD_NAME) {
            throw new Error('Cannot encode a comparison command with unset field name');
        }
        var $op = (0, operator_map_1.operatorToString)(query.operator);
        switch (query.operator) {
            case query_1.QUERY_COMMANDS_LITERAL.EQ:
            case query_1.QUERY_COMMANDS_LITERAL.NEQ:
            case query_1.QUERY_COMMANDS_LITERAL.LT:
            case query_1.QUERY_COMMANDS_LITERAL.LTE:
            case query_1.QUERY_COMMANDS_LITERAL.GT:
            case query_1.QUERY_COMMANDS_LITERAL.GTE:
            case query_1.QUERY_COMMANDS_LITERAL.ELEM_MATCH:
            case query_1.QUERY_COMMANDS_LITERAL.EXISTS:
            case query_1.QUERY_COMMANDS_LITERAL.SIZE:
            case query_1.QUERY_COMMANDS_LITERAL.MOD: {
                return _a = {},
                    _a[query.fieldName] = (_b = {},
                        _b[$op] = (0, common_1.encodeInternalDataType)(query.operands[0]),
                        _b),
                    _a;
            }
            case query_1.QUERY_COMMANDS_LITERAL.IN:
            case query_1.QUERY_COMMANDS_LITERAL.NIN:
            case query_1.QUERY_COMMANDS_LITERAL.ALL: {
                return _c = {},
                    _c[query.fieldName] = (_d = {},
                        _d[$op] = (0, common_1.encodeInternalDataType)(query.operands),
                        _d),
                    _c;
            }
            case query_1.QUERY_COMMANDS_LITERAL.GEO_NEAR: {
                var options = query.operands[0];
                return _e = {},
                    _e[query.fieldName] = {
                        $nearSphere: {
                            $geometry: options.geometry.toJSON(),
                            $maxDistance: options.maxDistance,
                            $minDistance: options.minDistance
                        }
                    },
                    _e;
            }
            case query_1.QUERY_COMMANDS_LITERAL.GEO_WITHIN: {
                var options = query.operands[0];
                return _f = {},
                    _f[query.fieldName] = {
                        $geoWithin: {
                            $geometry: options.geometry.toJSON()
                        }
                    },
                    _f;
            }
            case query_1.QUERY_COMMANDS_LITERAL.GEO_INTERSECTS: {
                var options = query.operands[0];
                return _g = {},
                    _g[query.fieldName] = {
                        $geoIntersects: {
                            $geometry: options.geometry.toJSON()
                        }
                    },
                    _g;
            }
            default: {
                return _h = {},
                    _h[query.fieldName] = (_j = {},
                        _j[$op] = (0, common_1.encodeInternalDataType)(query.operands[0]),
                        _j),
                    _h;
            }
        }
    };
    QueryEncoder.prototype.encodeQueryObject = function (query) {
        var flattened = (0, common_1.flattenQueryObject)(query);
        for (var key in flattened) {
            var val = flattened[key];
            if ((0, logic_1.isLogicCommand)(val)) {
                flattened[key] = val._setFieldName(key);
                var condition = this.encodeLogicCommand(flattened[key]);
                this.mergeConditionAfterEncode(flattened, condition, key);
            }
            else if ((0, query_1.isComparisonCommand)(val)) {
                flattened[key] = val._setFieldName(key);
                var condition = this.encodeComparisonCommand(flattened[key]);
                this.mergeConditionAfterEncode(flattened, condition, key);
            }
            else if ((0, common_1.isConversionRequired)(val)) {
                flattened[key] = (0, common_1.encodeInternalDataType)(val);
            }
        }
        return flattened;
    };
    QueryEncoder.prototype.mergeConditionAfterEncode = function (query, condition, key) {
        if (!condition[key]) {
            delete query[key];
        }
        for (var conditionKey in condition) {
            if (query[conditionKey]) {
                if ((0, type_1.isArray)(query[conditionKey])) {
                    query[conditionKey] = query[conditionKey].concat(condition[conditionKey]);
                }
                else if ((0, type_1.isObject)(query[conditionKey])) {
                    if ((0, type_1.isObject)(condition[conditionKey])) {
                        Object.assign(query, condition);
                    }
                    else {
                        console.warn("unmergable condition, query is object but condition is ".concat((0, type_1.getType)(condition), ", can only overwrite"), condition, key);
                        query[conditionKey] = condition[conditionKey];
                    }
                }
                else {
                    console.warn("to-merge query is of type ".concat((0, type_1.getType)(query), ", can only overwrite"), query, condition, key);
                    query[conditionKey] = condition[conditionKey];
                }
            }
            else {
                query[conditionKey] = condition[conditionKey];
            }
        }
    };
    return QueryEncoder;
}());

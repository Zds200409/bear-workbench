"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPlainObject = exports.isInternalObject = exports.isRegExp = exports.isDate = exports.isArray = exports.isFunction = exports.isPromise = exports.isNumber = exports.isString = exports.isObject = exports.getType = void 0;
var symbol_1 = require("./symbol");
var getType = function (x) { return Object.prototype.toString.call(x).slice(8, -1).toLowerCase(); };
exports.getType = getType;
var isObject = function (x) { return (0, exports.getType)(x) === 'object'; };
exports.isObject = isObject;
var isString = function (x) { return (0, exports.getType)(x) === 'string'; };
exports.isString = isString;
var isNumber = function (x) { return (0, exports.getType)(x) === 'number'; };
exports.isNumber = isNumber;
var isPromise = function (x) { return (0, exports.getType)(x) === 'promise'; };
exports.isPromise = isPromise;
var isFunction = function (x) { return typeof x === 'function'; };
exports.isFunction = isFunction;
var isArray = function (x) { return Array.isArray(x); };
exports.isArray = isArray;
var isDate = function (x) { return (0, exports.getType)(x) === 'date'; };
exports.isDate = isDate;
var isRegExp = function (x) { return (0, exports.getType)(x) === 'regexp'; };
exports.isRegExp = isRegExp;
var isInternalObject = function (x) { return x && (x._internalType instanceof symbol_1.InternalSymbol); };
exports.isInternalObject = isInternalObject;
var isPlainObject = function (obj) {
    if (typeof obj !== 'object' || obj === null)
        return false;
    var proto = obj;
    while (Object.getPrototypeOf(proto) !== null) {
        proto = Object.getPrototypeOf(proto);
    }
    return Object.getPrototypeOf(obj) === proto;
};
exports.isPlainObject = isPlainObject;

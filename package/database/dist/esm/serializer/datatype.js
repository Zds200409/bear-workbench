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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { SYMBOL_GEO_POINT, SYMBOL_SERVER_DATE, SYMBOL_REGEXP } from '../helper/symbol';
import { getType, isObject, isArray, isDate, isNumber, isInternalObject, isRegExp } from '../utils/type';
import { Point } from '../geo/index';
import { ServerDate } from '../serverDate/index';
export function serialize(val) {
    return serializeHelper(val, [val]);
}
function serializeHelper(val, visited) {
    if (isInternalObject(val)) {
        switch (val._internalType) {
            case SYMBOL_GEO_POINT: {
                return val.toJSON();
            }
            case SYMBOL_SERVER_DATE: {
                return val.parse();
            }
            case SYMBOL_REGEXP: {
                return val.parse();
            }
            default: {
                return val.toJSON ? val.toJSON() : val;
            }
        }
    }
    else if (isDate(val)) {
        return {
            $date: +val,
        };
    }
    else if (isRegExp(val)) {
        return {
            $regex: val.source,
            $options: val.flags,
        };
    }
    else if (isArray(val)) {
        return val.map(function (item) {
            if (visited.indexOf(item) > -1) {
                throw new Error('Cannot convert circular structure to JSON');
            }
            return serializeHelper(item, __spreadArray(__spreadArray([], __read(visited), false), [
                item,
            ], false));
        });
    }
    else if (isObject(val)) {
        var ret = __assign({}, val);
        for (var key in ret) {
            if (visited.indexOf(ret[key]) > -1) {
                throw new Error('Cannot convert circular structure to JSON');
            }
            ret[key] = serializeHelper(ret[key], __spreadArray(__spreadArray([], __read(visited), false), [
                ret[key],
            ], false));
        }
        return ret;
    }
    else {
        return val;
    }
}
export function deserialize(object) {
    var ret = __assign({}, object);
    for (var key in ret) {
        switch (key) {
            case '$date': {
                switch (getType(ret[key])) {
                    case 'number': {
                        return new Date(ret[key]);
                    }
                    case 'object': {
                        return new ServerDate(ret[key]);
                    }
                }
                break;
            }
            case 'type': {
                switch (ret.type) {
                    case 'Point': {
                        if (isArray(ret.coordinates) && isNumber(ret.coordinates[0]) && isNumber(ret.coordinates[1])) {
                            return new Point(ret.coordinates[0], ret.coordinates[1]);
                        }
                        break;
                    }
                }
                break;
            }
        }
    }
    return object;
}

import { SYMBOL_SERVER_DATE } from '../helper/symbol';
var ServerDate = (function () {
    function ServerDate(_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.offset, offset = _c === void 0 ? 0 : _c;
        this.offset = offset;
    }
    Object.defineProperty(ServerDate.prototype, "_internalType", {
        get: function () {
            return SYMBOL_SERVER_DATE;
        },
        enumerable: false,
        configurable: true
    });
    ServerDate.prototype.parse = function () {
        return {
            $date: {
                offset: this.offset
            }
        };
    };
    return ServerDate;
}());
export { ServerDate };
export function ServerDateConstructor(opt) {
    return new ServerDate(opt);
}

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
exports.isCancelledError = exports.CancelledError = exports.isTimeoutError = exports.TimeoutError = exports.isGenericError = exports.isSDKError = exports.CloudSDKError = void 0;
var type_1 = require("./type");
var error_config_1 = require("../config/error.config");
var CloudSDKError = (function (_super) {
    __extends(CloudSDKError, _super);
    function CloudSDKError(options) {
        var _this = _super.call(this, options.errMsg) || this;
        _this.errCode = 'UNKNOWN_ERROR';
        Object.defineProperties(_this, {
            message: {
                get: function () {
                    return ("errCode: ".concat(this.errCode, " ").concat(error_config_1.ERR_CODE[this.errCode] ||
                        '', " | errMsg: ") + this.errMsg);
                },
                set: function (msg) {
                    this.errMsg = msg;
                }
            }
        });
        _this.errCode = options.errCode || 'UNKNOWN_ERROR';
        _this.errMsg = options.errMsg;
        return _this;
    }
    Object.defineProperty(CloudSDKError.prototype, "message", {
        get: function () {
            return "errCode: ".concat(this.errCode, " | errMsg: ") + this.errMsg;
        },
        set: function (msg) {
            this.errMsg = msg;
        },
        enumerable: false,
        configurable: true
    });
    return CloudSDKError;
}(Error));
exports.CloudSDKError = CloudSDKError;
function isSDKError(error) {
    return (error && error instanceof Error && (0, type_1.isString)(error.errMsg));
}
exports.isSDKError = isSDKError;
var isGenericError = function (e) { return e.generic; };
exports.isGenericError = isGenericError;
var TimeoutError = (function (_super) {
    __extends(TimeoutError, _super);
    function TimeoutError(message) {
        var _this = _super.call(this, message) || this;
        _this.type = 'timeout';
        _this.payload = null;
        _this.generic = true;
        return _this;
    }
    return TimeoutError;
}(Error));
exports.TimeoutError = TimeoutError;
var isTimeoutError = function (e) {
    return e.type === 'timeout';
};
exports.isTimeoutError = isTimeoutError;
var CancelledError = (function (_super) {
    __extends(CancelledError, _super);
    function CancelledError(message) {
        var _this = _super.call(this, message) || this;
        _this.type = 'cancelled';
        _this.payload = null;
        _this.generic = true;
        return _this;
    }
    return CancelledError;
}(Error));
exports.CancelledError = CancelledError;
var isCancelledError = function (e) {
    return e.type === 'cancelled';
};
exports.isCancelledError = isCancelledError;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWsInstance = exports.autoCount = exports.sleep = void 0;
var __1 = require("../");
var sleep = function (ms) {
    if (ms === void 0) { ms = 0; }
    return new Promise(function (r) { return setTimeout(r, ms); });
};
exports.sleep = sleep;
var counters = {};
var autoCount = function (domain) {
    if (domain === void 0) { domain = 'any'; }
    if (!counters[domain]) {
        counters[domain] = 0;
    }
    return counters[domain]++;
};
exports.autoCount = autoCount;
var wsList = {};
function getWsInstance(db) {
    if (!__1.Db.wsClientClass) {
        throw new Error('to use realtime you must import realtime module first');
    }
    var env = db.config.env;
    if (!wsList[env]) {
        wsList[env] = new __1.Db.wsClientClass({
            context: {
                appConfig: {
                    docSizeLimit: 1000,
                    realtimePingInterval: 10000,
                    realtimePongWaitTimeout: 5000,
                    request: __1.Db.createRequest(db.config)
                }
            }
        });
    }
    return wsList[env];
}
exports.getWsInstance = getWsInstance;

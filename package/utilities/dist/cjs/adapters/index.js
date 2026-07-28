"use strict";
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDefaultAdapter = exports.useAdapters = exports.RUNTIME = void 0;
var Web = __importStar(require("./platforms/web"));
var util_1 = require("../libs/util");
var RUNTIME;
(function (RUNTIME) {
    RUNTIME["WEB"] = "web";
    RUNTIME["WX_MP"] = "wx_mp";
})(RUNTIME = exports.RUNTIME || (exports.RUNTIME = {}));
function useAdapters(adapters, options) {
    var adapterList = (0, util_1.isArray)(adapters)
        ? adapters
        : [adapters];
    for (var _i = 0, adapterList_1 = adapterList; _i < adapterList_1.length; _i++) {
        var adapter = adapterList_1[_i];
        var isMatch = adapter.isMatch, genAdapter = adapter.genAdapter, runtime = adapter.runtime;
        if (isMatch()) {
            return {
                adapter: __assign({ isMatch: isMatch }, genAdapter(options)),
                runtime: runtime,
            };
        }
    }
}
exports.useAdapters = useAdapters;
function useDefaultAdapter() {
    return {
        adapter: __assign({}, Web.genAdapter()),
        runtime: RUNTIME.WEB,
    };
}
exports.useDefaultAdapter = useDefaultAdapter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYWRhcHRlcnMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLG1EQUFzQztBQUN0QyxxQ0FBc0M7QUFFdEMsSUFBWSxPQUdYO0FBSEQsV0FBWSxPQUFPO0lBQ2pCLHNCQUFXLENBQUE7SUFDWCwwQkFBZSxDQUFBO0FBQ2pCLENBQUMsRUFIVyxPQUFPLEdBQVAsZUFBTyxLQUFQLGVBQU8sUUFHbEI7QUFNRCxTQUFnQixXQUFXLENBQUMsUUFBaUQsRUFBRSxPQUFhO0lBQzFGLElBQU0sV0FBVyxHQUF3QixJQUFBLGNBQU8sRUFBQyxRQUFRLENBQUM7UUFDeEQsQ0FBQyxDQUFFLFFBQWdDO1FBQ25DLENBQUMsQ0FBQyxDQUFDLFFBQTZCLENBQUMsQ0FBQTtJQUNuQyxLQUFzQixVQUFXLEVBQVgsMkJBQVcsRUFBWCx5QkFBVyxFQUFYLElBQVcsRUFBRTtRQUE5QixJQUFNLE9BQU8sb0JBQUE7UUFDUixJQUFBLE9BQU8sR0FBMEIsT0FBTyxRQUFqQyxFQUFFLFVBQVUsR0FBYyxPQUFPLFdBQXJCLEVBQUUsT0FBTyxHQUFLLE9BQU8sUUFBWixDQUFZO1FBQ2hELElBQUksT0FBTyxFQUFFLEVBQUU7WUFDYixPQUFPO2dCQUNMLE9BQU8sYUFBSSxPQUFPLFNBQUEsSUFBSyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUU7Z0JBQzVDLE9BQU8sU0FBQTthQUNSLENBQUE7U0FDRjtLQUNGO0FBQ0gsQ0FBQztBQWJELGtDQWFDO0FBRUQsU0FBZ0IsaUJBQWlCO0lBQy9CLE9BQU87UUFDTCxPQUFPLGVBQU8sR0FBRyxDQUFDLFVBQVUsRUFBRSxDQUFFO1FBQ2hDLE9BQU8sRUFBRSxPQUFPLENBQUMsR0FBRztLQUNyQixDQUFBO0FBQ0gsQ0FBQztBQUxELDhDQUtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2xvdWRiYXNlQWRhcHRlciwgU0RLQWRhcHRlckludGVyZmFjZSwgTm9kZUFkYXB0ZXJJbnRlcmZhY2UgfSBmcm9tICdAY2xvdWRiYXNlL2FkYXB0ZXItaW50ZXJmYWNlJ1xuaW1wb3J0ICogYXMgV2ViIGZyb20gJy4vcGxhdGZvcm1zL3dlYidcbmltcG9ydCB7IGlzQXJyYXkgfSBmcm9tICcuLi9saWJzL3V0aWwnXG5cbmV4cG9ydCBlbnVtIFJVTlRJTUUge1xuICBXRUIgPSAnd2ViJyxcbiAgV1hfTVAgPSAnd3hfbXAnLCAvLyDlvq7kv6HlsI/nqIvluo9cbn1cblxudHlwZSBJQ2xvdWRiYXNlQWRhcHRlciA9IENsb3VkYmFzZUFkYXB0ZXIgJiB7XG4gIGdlbkFkYXB0ZXI6IChvcHRpb25zPzogYW55KSA9PiBTREtBZGFwdGVySW50ZXJmYWNlIHwgTm9kZUFkYXB0ZXJJbnRlcmZhY2Vcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VBZGFwdGVycyhhZGFwdGVyczogSUNsb3VkYmFzZUFkYXB0ZXIgfCBJQ2xvdWRiYXNlQWRhcHRlcltdLCBvcHRpb25zPzogYW55KSB7XG4gIGNvbnN0IGFkYXB0ZXJMaXN0OiBJQ2xvdWRiYXNlQWRhcHRlcltdID0gaXNBcnJheShhZGFwdGVycylcbiAgICA/IChhZGFwdGVycyBhcyBJQ2xvdWRiYXNlQWRhcHRlcltdKVxuICAgIDogW2FkYXB0ZXJzIGFzIElDbG91ZGJhc2VBZGFwdGVyXVxuICBmb3IgKGNvbnN0IGFkYXB0ZXIgb2YgYWRhcHRlckxpc3QpIHtcbiAgICBjb25zdCB7IGlzTWF0Y2gsIGdlbkFkYXB0ZXIsIHJ1bnRpbWUgfSA9IGFkYXB0ZXJcbiAgICBpZiAoaXNNYXRjaCgpKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBhZGFwdGVyOiB7IGlzTWF0Y2gsIC4uLmdlbkFkYXB0ZXIob3B0aW9ucykgfSxcbiAgICAgICAgcnVudGltZSxcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVzZURlZmF1bHRBZGFwdGVyKCkge1xuICByZXR1cm4ge1xuICAgIGFkYXB0ZXI6IHsgLi4uV2ViLmdlbkFkYXB0ZXIoKSB9LFxuICAgIHJ1bnRpbWU6IFJVTlRJTUUuV0VCLFxuICB9XG59XG4iXX0=
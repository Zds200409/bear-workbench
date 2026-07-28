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
import * as Web from './platforms/web';
import { isArray } from '../libs/util';
export var RUNTIME;
(function (RUNTIME) {
    RUNTIME["WEB"] = "web";
    RUNTIME["WX_MP"] = "wx_mp";
})(RUNTIME || (RUNTIME = {}));
export function useAdapters(adapters, options) {
    var adapterList = isArray(adapters)
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
export function useDefaultAdapter() {
    return {
        adapter: __assign({}, Web.genAdapter()),
        runtime: RUNTIME.WEB,
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYWRhcHRlcnMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFDQSxPQUFPLEtBQUssR0FBRyxNQUFNLGlCQUFpQixDQUFBO0FBQ3RDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxjQUFjLENBQUE7QUFFdEMsTUFBTSxDQUFOLElBQVksT0FHWDtBQUhELFdBQVksT0FBTztJQUNqQixzQkFBVyxDQUFBO0lBQ1gsMEJBQWUsQ0FBQTtBQUNqQixDQUFDLEVBSFcsT0FBTyxLQUFQLE9BQU8sUUFHbEI7QUFNRCxNQUFNLFVBQVUsV0FBVyxDQUFDLFFBQWlELEVBQUUsT0FBYTtJQUMxRixJQUFNLFdBQVcsR0FBd0IsT0FBTyxDQUFDLFFBQVEsQ0FBQztRQUN4RCxDQUFDLENBQUUsUUFBZ0M7UUFDbkMsQ0FBQyxDQUFDLENBQUMsUUFBNkIsQ0FBQyxDQUFBO0lBQ25DLEtBQXNCLFVBQVcsRUFBWCwyQkFBVyxFQUFYLHlCQUFXLEVBQVgsSUFBVyxFQUFFO1FBQTlCLElBQU0sT0FBTyxvQkFBQTtRQUNSLElBQUEsT0FBTyxHQUEwQixPQUFPLFFBQWpDLEVBQUUsVUFBVSxHQUFjLE9BQU8sV0FBckIsRUFBRSxPQUFPLEdBQUssT0FBTyxRQUFaLENBQVk7UUFDaEQsSUFBSSxPQUFPLEVBQUUsRUFBRTtZQUNiLE9BQU87Z0JBQ0wsT0FBTyxhQUFJLE9BQU8sU0FBQSxJQUFLLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBRTtnQkFDNUMsT0FBTyxTQUFBO2FBQ1IsQ0FBQTtTQUNGO0tBQ0Y7QUFDSCxDQUFDO0FBRUQsTUFBTSxVQUFVLGlCQUFpQjtJQUMvQixPQUFPO1FBQ0wsT0FBTyxlQUFPLEdBQUcsQ0FBQyxVQUFVLEVBQUUsQ0FBRTtRQUNoQyxPQUFPLEVBQUUsT0FBTyxDQUFDLEdBQUc7S0FDckIsQ0FBQTtBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDbG91ZGJhc2VBZGFwdGVyLCBTREtBZGFwdGVySW50ZXJmYWNlLCBOb2RlQWRhcHRlckludGVyZmFjZSB9IGZyb20gJ0BjbG91ZGJhc2UvYWRhcHRlci1pbnRlcmZhY2UnXG5pbXBvcnQgKiBhcyBXZWIgZnJvbSAnLi9wbGF0Zm9ybXMvd2ViJ1xuaW1wb3J0IHsgaXNBcnJheSB9IGZyb20gJy4uL2xpYnMvdXRpbCdcblxuZXhwb3J0IGVudW0gUlVOVElNRSB7XG4gIFdFQiA9ICd3ZWInLFxuICBXWF9NUCA9ICd3eF9tcCcsIC8vIOW+ruS/oeWwj+eoi+W6j1xufVxuXG50eXBlIElDbG91ZGJhc2VBZGFwdGVyID0gQ2xvdWRiYXNlQWRhcHRlciAmIHtcbiAgZ2VuQWRhcHRlcjogKG9wdGlvbnM/OiBhbnkpID0+IFNES0FkYXB0ZXJJbnRlcmZhY2UgfCBOb2RlQWRhcHRlckludGVyZmFjZVxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHVzZUFkYXB0ZXJzKGFkYXB0ZXJzOiBJQ2xvdWRiYXNlQWRhcHRlciB8IElDbG91ZGJhc2VBZGFwdGVyW10sIG9wdGlvbnM/OiBhbnkpIHtcbiAgY29uc3QgYWRhcHRlckxpc3Q6IElDbG91ZGJhc2VBZGFwdGVyW10gPSBpc0FycmF5KGFkYXB0ZXJzKVxuICAgID8gKGFkYXB0ZXJzIGFzIElDbG91ZGJhc2VBZGFwdGVyW10pXG4gICAgOiBbYWRhcHRlcnMgYXMgSUNsb3VkYmFzZUFkYXB0ZXJdXG4gIGZvciAoY29uc3QgYWRhcHRlciBvZiBhZGFwdGVyTGlzdCkge1xuICAgIGNvbnN0IHsgaXNNYXRjaCwgZ2VuQWRhcHRlciwgcnVudGltZSB9ID0gYWRhcHRlclxuICAgIGlmIChpc01hdGNoKCkpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGFkYXB0ZXI6IHsgaXNNYXRjaCwgLi4uZ2VuQWRhcHRlcihvcHRpb25zKSB9LFxuICAgICAgICBydW50aW1lLFxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdXNlRGVmYXVsdEFkYXB0ZXIoKSB7XG4gIHJldHVybiB7XG4gICAgYWRhcHRlcjogeyAuLi5XZWIuZ2VuQWRhcHRlcigpIH0sXG4gICAgcnVudGltZTogUlVOVElNRS5XRUIsXG4gIH1cbn1cbiJdfQ==
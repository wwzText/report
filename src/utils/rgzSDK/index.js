import methods from "./methods.json";
import register from "./handler.json";
import base64 from "./base64.js";
import './../Native/WebViewJavascriptBridge';

var setupWebViewJavascriptBridge;
// 安卓JSbridge
if (navigator.userAgent.match(/android/i)) {
    // 链接安卓jsbridge
    setupWebViewJavascriptBridge = function setupWebViewJavascriptBridge(
        callback
    ) {
        if (window.WebViewJavascriptBridge) {
            callback(WebViewJavascriptBridge);
        } else {
            window.document.addEventListener(
                "WebViewJavascriptBridgeReady",
                function () {
                    callback(WebViewJavascriptBridge);
                },
                false
            );
        }
    };

    // 安卓特殊处理
    setupWebViewJavascriptBridge(function (bridge) {
        // 注册以下函数，不然回调方法不会被调用
        bridge.init(function (message, responseCallback) {
            responseCallback(data);
        });
    });
}

// IOS JSbridge
if (navigator.userAgent.match(/ip(ad|hone)/i)) {
    // 初始化
    setupWebViewJavascriptBridge = function setupWebViewJavascriptBridge(
        callback
    ) {
        if (window.WebViewJavascriptBridge) {
            return callback(WebViewJavascriptBridge);
        }
        if (window.WVJBCallbacks) {
            return window.WVJBCallbacks.push(callback);
        }
        window.WVJBCallbacks = [callback];
        var WVJBIframe = window.document.createElement("iframe");
        WVJBIframe.style.display = "none";
        WVJBIframe.src = "wvjbscheme://__BRIDGE_LOADED__";
        window.document.documentElement.appendChild(WVJBIframe);
        setTimeout(function () {
            window.document.documentElement.removeChild(WVJBIframe);
        }, 0);
        // IOS特殊处理
        setupWebViewJavascriptBridge(function (bridge) { });
    };
}

window.crh = {
    handles: [],
    $on: function (name, callbackHandle) {
        typeof callbackHandle === "function" &&
            this.handles.push({
                name,
                callbackHandle
            });
    },
    $off: function (name, fn) {
        let i = this.handles.findIndex(val => {
            return val.name == name && val.callbackHandle === fn;
        });
        ~i && this.handles.splice(i, 1);
    },
    $emit: function (name, ...params) {
        this.handles.map(o => {
            if (o.name === name) {
                o.callbackHandle(...params);
            }
        });
    }
};
window.crhReady = function (init) {
    setupWebViewJavascriptBridge(function (bridge) {
        for (let method of methods) {
            crh[method.name] = obj => {
                bridge.callHandler(
                    method.mark,
                    obj && obj.param ? obj.param : {},
                    function (res) {
                        res = JSON.parse(res);
                        switch (res.returnCode) {
                            case "Y":
                                obj.success(JSON.parse(base64.decode(res.returnData)));
                                break;
                            case "N":
                                if (obj.fail) {
                                    obj.fail(res);
                                }
                                break;
                            case "C":
                                if (obj.cancel) {
                                    obj.cancel();
                                }
                                break;
                        }
                        if (obj.complete) {
                            obj.complete();
                        }
                    }
                );
            };
        }
        for (let r of register) {
            bridge.registerHandler(r.mark, function (data, responseCallback) {
                crh.$emit(r.name, data);
            });
        }

        if (init) {
            init();
        }
    });
};

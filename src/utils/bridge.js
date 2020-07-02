/**
 * @description 调用原生方法封装
 */
let setupWebViewJavascriptBridge;

if (navigator.userAgent.match(/android/i)) {
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
} else {

    // IOS处理代码
    setupWebViewJavascriptBridge = function setupWebViewJavascriptBridge(callback) {

        if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
        if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
        window.WVJBCallbacks = [callback];
        var WVJBIframe = document.createElement('iframe');
        WVJBIframe.style.display = 'none';
        WVJBIframe.src = 'https://__bridge_loaded__';
        document.documentElement.appendChild(WVJBIframe);
        setTimeout(function () { document.documentElement.removeChild(WVJBIframe) }, 0)
    }
}

export default {

    // 仅可前端主动调用原生方法
    callhandler(data, callback) {
        setupWebViewJavascriptBridge(function (bridge) {
            bridge.callHandler('webSend', data, callback)
        })

    },

    registerhandler(name, callback) {
        setupWebViewJavascriptBridge(function (bridge) {
            bridge.registerHandler(name, function (data, responseCallback) {
                callback(data, responseCallback)
            })
        })
    }

}

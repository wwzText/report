let setupWebViewJavascriptBridge;

if(navigator.userAgent.match(/android/i)) {
    console.log('this\'s android')
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
        console.log('初始化')
        // 注册以下函数，不然回调方法不会被调用
        bridge.init(function (message, responseCallback) {
            responseCallback(data);
        });
    });
} else {

    setupWebViewJavascriptBridge = function setupWebViewJavascriptBridge(callback) {

        if (window.WebViewJavascriptBridge) {
    
            return callback(window.WebViewJavascriptBridge)
        }
    
        if (window.WVJBCallbacks) {
    
            return window.WVJBCallbacks.push(callback)
        }
    
        window.WVJBCallbacks = [callback]
    
        let WVJBIframe = document.createElement('iframe')
    
        WVJBIframe.style.display = 'none'
    
        WVJBIframe.src = 'https://__bridge_loaded__' + document.documentElement.appendChild(WVJBIframe)
    
        setTimeout(() => {
    
            document.documentElement.removeChild(WVJBIframe)
        }, 0)
    
    }
}

export default {

    callhandler(name, data, callback) {

        setupWebViewJavascriptBridge(function (bridge) {
            bridge.callHandler(name, data, callback)
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

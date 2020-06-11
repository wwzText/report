import WebViewJavascriptBridge from './WebViewJavascriptBridge';

export const NATIVE = {
    /**
     * 获取系统类型 （根据userAgent判断）
     * IOS 苹果
     * ANDROID 安卓
     * UNKOWN 未知
     */
    getOSType: function () {
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isAndroid) {
            return 'ANDROID';
        } else if (isiOS) {
            return 'IOS';
        } else {
            return 'UNKOWN';
        }
    },

    /**
     * android系统js桥接口设置
     * @param {Object} callback 桥接口回调函数 桥接方式固定写法
     */
    setUpAndroidBridge: function (callback) {
        if (window.WebViewJavascriptBridge) {
            return callback(WebViewJavascriptBridge);
        } else {
            document.addEventListener(
                'WebViewJavascriptBridgeReady',
                function () {
                    return callback(WebViewJavascriptBridge);
                },
                false
            );
        }
    },

    /**
     * IOS系统js桥接口设置
     * @param {Object} callback 桥接口回调函数 桥接方式固定写法
     */
    setUpIOSBridge: function (callback) {
        if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
        if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
        window.WVJBCallbacks = [callback];
        var WVJBIframe = document.createElement('iframe');
        WVJBIframe.style.display = 'none';
        WVJBIframe.src = 'https://__bridge_loaded__';
        document.documentElement.appendChild(WVJBIframe);
        setTimeout(function () { document.documentElement.removeChild(WVJBIframe) }, 0)
    },

    setUpBridge: function (data, resultCallback) {
        var osType = this.getOSType();//获取系统类型
        //按系统类型 分别执行原生交互
        if (osType == 'IOS') {
            //苹果手机交互方式 消息体为字面量对象(json格式)： action 代表执行的动作 data 代表传递的数据
            this.setUpIOSBridge(function (bridge) {
                bridge.callHandler('IOSNativeApp', data, function (response) {
                    if (typeof resultCallback == 'function') {
                        resultCallback(response);
                    }
                });
            });
        } else if (osType == 'ANDROID') {
            //安卓手机交互方式
            this.setUpAndroidBridge(function (bridge) {
                bridge.callHandler('AndroidNativeApp', data, function (response) {
                    if (typeof resultCallback == 'function') {
                        resultCallback(response);
                    }
                });
            });
        } else {
            //其他类型
        }
    },

    getCurrentUserInfo: function (resultCallback) {
        var data = {
            'action': 'AndroidSend',
            'data': '获取用户信息'
        };
        this.setUpBridge(data, resultCallback);
    },
}

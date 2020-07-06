import axios from 'axios';
import Vue from 'vue';

import apis from './apis';

import store from '@/store';

import { SECRET_KEY } from '@/config/md5.config';
import md5 from 'js-md5';

class Http {
    static instance = axios.create({
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        baseURL: 'http://appuat.cresz.com.cn'
    })
    // 获取服务端时间的时间戳
    static async getWebTime() {
        return new Promise((resolve, reject) => {
            Http.instance.post(apis['getWebTime']).then(res => {
                if (res.data.msg === 'success') {
                    resolve(res.data.data)
                } else {
                    reject(res.data)
                }
            }).catch(err => {
                reject(err)
            })
        })
    }

    // 参数签名方法
    static dataSign(data, webTimeBack) {
        let dataObj = JSON.parse(JSON.stringify(data))
        // 最后实际返回的签名字段
        let sign = '';

        // 接收排序后的对象
        const newData = {};

        dataObj['timestamp'] = webTimeBack.appserver_time;

        // 参数对象升序
        Object.keys(dataObj).sort().forEach(function (key) {
            newData[key] = dataObj[key];
        });

        // 参数对象拼接数组
        for (let key in newData) {
            sign += `${key}=${newData[key]}&`;
        }

        // 拼接上私钥
        sign += `key=${SECRET_KEY}`

        // md5加密
        sign = md5(sign).toUpperCase();

        return sign;
    }

    // 验证用户信息，不存在时主动获取app接口提供的信息
    static async verificationUserInfo() {
        if (store.state.userInfoStore.userInfo) {
            return store.state.userInfoStore.userInfo;
        } else {
            return await store.dispatch('getUserInfo');
        }
    }

    // 发送ajax请求
    static async request(url, data = {}, method = 'post',) {

        console.log(data)
        let userInfo = await Http.verificationUserInfo();

        // 服务器时间返回的数据
        let webTimeBack = await Http.getWebTime();

        // 参数签名
        let sign = Http.dataSign(data, webTimeBack);

        // 服务器时间戳
        let timestamp = webTimeBack.appserver_time;

        // 拼接url
        url = 'http://appuat.cresz.com.cn' + apis[url];

        // 实际调用axios
        return await axios({
            method,
            url,
            data: {
                data: JSON.stringify(data),
                sign,
                timestamp,
                imei: userInfo.imei,
                user_token: userInfo.user_token,
            },

            transformRequest: [
                function (data) {
                    let ret = ''
                    for (let it in data) {
                        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                    }
                    ret = ret.substring(0, ret.lastIndexOf('&'));
                    return ret
                }
            ],
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        }).then(res => {
            if (res.data.errcode === 200) {
                console.log('接口返回原始数据', res.data.data)
                return res.data.data
            } else if (res.data.errcode == 1112) {
                Vue.prototype.$bridge.callhandler({
                    type: "loginOut"
                  });
                // Vue.prototype.$showToast(res.data.msg)
                Vue.prototype.$hideLoading()
            }
        })
    }
}
export {
    Http
}
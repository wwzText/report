import axios from 'axios';

import apis from './apis';
// axios.defaults.baseURL = '/api';
import { SECRET_KEY } from '@/config/md5.config';
import md5 from 'js-md5';

class Http {
    static instance = axios.create({
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        baseURL: 'https://appuat.cresz.com.cn'
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
        // 最后实际返回的签名字段
        let sign = '';

        // 接收排序后的对象
        const newData = {};

        // 参数对象升序
        Object.keys(data).sort().forEach(function (key) {
            newData[key] = data[key];
        });

        // 参数对象拼接数组
        for (let key in newData) {
            sign += `${key}=${newData[key]}&`;
        }

        // 拼接上私钥
        sign += `timestamp=${webTimeBack.appserver_time}&key=${SECRET_KEY}`
        console.log(sign)

        // md5加密
        sign = md5(sign).toUpperCase();

        return sign;
    }

    // 发送ajax请求
    static async request(url, data = {}, method = 'post', ) {
        // 服务器时间返回的数据
        let webTimeBack = await Http.getWebTime();

        // 参数签名
        let sign = Http.dataSign(data, webTimeBack);

        // 服务器时间戳
        let timestamp = webTimeBack.appserver_time;
        
        url = 'https://appuat.cresz.com.cn' + apis[url];
        return await axios({
            method,
            url,
            data: {
                data: JSON.stringify(data),
                sign,
                timestamp,
                imei: "865360032826820",
                user_token: "eee859bbfb7543f2a0c993e4e18677ee",
                
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
            if(res.data.errcode === 200) {
                return res.data.data
            }
        })
    }
}
export {
    Http
}
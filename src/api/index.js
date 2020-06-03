import axios from 'axios';

import apis from './apis';

// Vue.use(axios);

class Http {
    static instance = axios.create({
        baseURL: 'https://appuat.cresz.com.cn'
    })

    static async request(url, method = 'post', data = {}) {

        return new Promise((resolve, reject) => {

            Http.instance[method](apis[url], data).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    }
}
export {
    Http
}
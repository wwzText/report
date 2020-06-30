import Vue from 'vue';
const userInfoStore = {
    state: () => ({
        userInfo: {
            appuser: '11223344',
            partner: '0011223344',
            appxs: 'X',
            appgl: 'X',
            appdc: 'X'
        }
        // userInfo: null
    }),

    mutations: {
        setUserInfo(state, payload) {
            state.userInfo = JSON.parse(payload.res)
        }
    },
    actions: {
        // 异步获取userInfo
        async getUserInfo(context) {
            return new Promise(resolve => {
                Vue.prototype.$bridge.callhandler({
                    type: "getUserInfo"
                }, res => {
                    context.commit('setUserInfo', {
                        res
                    })
                    resolve(JSON.parse(res))
                })
            })
        }
    }
}

export {
    userInfoStore
}

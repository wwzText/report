import Vue from 'vue';
const userInfoStore = {
    state: () => ({
        userInfo: null
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

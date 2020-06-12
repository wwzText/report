const userInfoStore = {
    state: () => ({
        userInfo: null
    }),

    mutations: {
        // 从原生获取用户信息回来后绑定到全局
        setUserInfo(state, payload) {
            state.userInfo = payload.userInfo;
        }
    }
    
}

export {
    userInfoStore
}
import {NATIVE} from '@/utils/Native';

const userInfoStore = {
    state: () => ({
        userInfo: null
    }),

    mutations: {
        // 从原生获取用户信息回来后绑定到全局
        getUserInfo(state) {
            NATIVE.getCurrentUserInfo(res => {
                state.userInfo = res;
                return res
            });
        }
    }
    
}

export {
    userInfoStore
}
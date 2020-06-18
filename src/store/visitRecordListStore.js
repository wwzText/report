import { Http } from '@/api';
const visitRecordListStore = {
    state: () => ({

    }),

    mutations: {
        handleItemMessage(state, payload) {
            return payload.item
        }
    },

    actions: {
        // 获取终端拜访列表
        async getVisitRecordList(context, payload) {
            // 不做数据缓存，每次进入页面获取最新的
            let list = await Http.request('getVisitRecordList', {
                appuser: payload.appuser
            });
            // 列表返回数据出来
            list.map(item => {
                let newItem = context.commit('handleItemMessage', {
                    item
                })
            })
            return list
        }
    }
}

export {
    visitRecordListStore
}
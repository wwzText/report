import { Http } from '@/api';
const visitRecordListStore = {
    state: () => ({

    }),

    mutations: {
        handleItemMessage(state, payload) {
            console.log(payload.item)
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
                console.log(newItem)
            })
            return list
        }
    }
}

export {
    visitRecordListStore
}
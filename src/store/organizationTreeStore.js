import { Http } from '@/api';
import store from '@/store';
const organizationTreeStore = {
    state: () => ({
        // 组织树
        organizationTree: [],
    }),

    mutations: {


    },

    actions: {
        // 获取组织树，如果已获取直接返回，没有就调用接口获取并存储
        async getLocalOrganizationTree(context) {
            if (context.state.organizationTree.length) {
                return context.state.organizationTree
            } else {
                return await context.dispatch('getOrganizationTreeOfWebRequest')
            }
        },

        // 接口调用获取组织树
        async getOrganizationTreeOfWebRequest(context) {
            let orgInfo = await Http.request("getOrgInfo", {
                appuser: store.state.userInfoStore.userInfo.appuser
            });
            // orgLevel 登陆人权限等级 0-大区 1-业务部 2-工作站 3-普通员工
            // 用于判断组织树 organizationTree 的范围
            let orgLevel = 3;
            if (orgInfo.et_sales_office.length > 1) {
                orgLevel = 0;
            } else if (orgInfo.et_sales_group.length > 0) {
                orgLevel = 1;
            } else if (orgInfo.et_sales_station.length > 1) {
                orgLevel = 2;
            }

            let organizationList = await Http.request("getOrganizationList", {
                appuser: store.state.userInfoStore.userInfo.appuser
            });

            return await context.dispatch('verificationAndSetOrganization', {
                orgLevel,
                organizationList
            })
        },

        // 验证权限等级并设置组织树
        verificationAndSetOrganization(context, payload) {
            if (payload.orgLevel === 0) {
                // this.organizationList = payload.organizationList;
                context.state.organizationTree = payload.organizationList;
                return payload.organizationList;
            } else {
                context.dispatch('verificationAndSetOrganization', {
                    orgLevel: payload.orgLevel - 1,
                    organizationList: payload.organizationList[0].children
                })
                // this.splitRightOrganizationList(payload.organizationList[0].children, payload.orgLevel - 1)
            }
        }
    }

}

export {
    organizationTreeStore
}
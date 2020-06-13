import { Http } from '@/api';
import {
    getImgOriginalUrl,
    timeStampToTime,
} from '@/utils'
const terminalVisitReportStore = {
    state: {
        // 用于分享的终端拜访详情
        shareWorkCircleDetail: null,

        // 业务员拜访按单日查询数据数据
        userReportOfDay: {}, 

        //页面展示人员信息还是组织信息
        userOrOrganization: 'user',

        // 页面展示日期时间状态 date为按天查询 month按月查询
        dateOrMonth: 'date',
    },

    mutations: {
        /**
         * @param {Object} workCircleDetail 设置工作圈分享的数据
         */
        setShareWorkCircleDetail(state, payload) {
            state.shareWorkCircleDetail = payload.workCircleDetail
        },

        setUserReportOfDay(state, payload) {
            state.userReportOfDay = payload.userReportOfDay
        }
    },

    actions: {
        /**
         * @param {*} obj 前端用于请求数据的参数
         * @description 获取工作圈分享的数据，仅一次
         */
        async getShareTerminalVisitDetail(context, payload) {
            let workCircleDetail = await Http.request("getWorkCircleDetail", {
                ...payload.obj
            });
            workCircleDetail = workCircleDetail[0];
            console.log(workCircleDetail)
            // 实际用户头像换取
            workCircleDetail.user_head = await getImgOriginalUrl(workCircleDetail.user_head)
            workCircleDetail.leave_data = timeStampToTime(workCircleDetail.visit_out_time, 'MM月DD日 W');
            // 拜访时长
            workCircleDetail.visit_long_time = ((workCircleDetail.visit_out_time - workCircleDetail.visit_in_time) / 1000).toFixed(0)

            // 拜访照片
            let list = [];
            workCircleDetail.photo_info.map(item => {
                list.push(item.photoid)
            })
            let visitImgList = await getImgOriginalUrl(list)
            workCircleDetail['visit_photo_list'] = [];
            visitImgList.map(item => {
                workCircleDetail.visit_photo_list.push(item.value)
            })

            
            // 进店离店时间
            workCircleDetail.visit_in_time = timeStampToTime(workCircleDetail.visit_in_time, 'M:S');
            workCircleDetail.visit_out_time = timeStampToTime(workCircleDetail.visit_out_time, 'M:S');

            context.commit('setShareWorkCircleDetail', workCircleDetail);
            
            return workCircleDetail
        },

        /**
         * @description 获取员工指定日的报表数据
         */
        async getUserReportOfDay(context, payload) {
            let userReportOfDay = await Http.request('getUserReportOfDay', payload);
            context.commit('setUserReportOfDay', {
                userReportOfDay
            })
            return userReportOfDay
        }
    }

}

export {
    terminalVisitReportStore
}
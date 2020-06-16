import { Http } from '@/api';
import {
    getImgOriginalUrl,
    timeStampToTime,
} from '@/utils'
const terminalVisitReportStore = {
    state: {
        // 用于分享的终端拜访对象详情
        shareWorkCircleDetail: null,

        // 业务员拜访按单日查询数据数据
        userReportOfDay: {},

        // 页面展示日期时间状态 date为按天查询 month按月查询
        dateOrMonth: 'date',

        // 页面展示人员信息还是组织信息
        userOrOrganization: 'user',

        // 目标类别 terminal终端 distributor经销商
        targetType: 'terminal',

        // 报表类型 BF拜访 ZF走访 DC督查
        reoprtType: 'BF',

        // 终端拜访查询时间段
        terminalVisitQueryTime: "",
        
        // 按日期查看时业务员或组织信息
        es_summary: {}
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
        },

        changeUserOrOrganization(state) {
            state.userOrOrganization = 
                (state.userOrOrganization === 'user') ? 
                    'organization ' : 'user';
        },

        setTerminalUserOrOrganization(state, payload) {
            state.userOrOrganization = payload.type;
        },

        // 改变日期时间状态
        changeDateOrMonth(state) {
            state.dateOrMonth = 
                (state.dateOrMonth === 'date') ?
                    'month' : 'date'
        },

        // 修改 targetType 和 reoprtType
        changeTargetAndReportType(state, payload) {
            state.targetType = payload.targetType;
            state.reoprtType = payload.reoprtType;
        },

        // 改变终端拜访查询时间
        // 可能带日期可能不带日期，根据 state.dateOrMonth 来判断显示日期
        changeTerminalVisitQueryTime(state, payload) {
            state.terminalVisitQueryTime = payload.showSelectDate;
        },

        // 修改终端拜访人员还是组织
        changeTerminalUserOrOrganization(state, payload) {
            state.userOrOrganization = payload.type;
        },

        // 设置按日期查看报表时业务员或组织展示信息
        setEsSummary(state, payload) {
            state.es_summary = payload.es_summary;
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
         * @description 获取报表数据
         */
        async getReportData(context, payload) {
            let reportMessage = await Http.request(payload.url, payload.queryObj);
            
            return reportMessage
        }
    }

}

export {
    terminalVisitReportStore
}
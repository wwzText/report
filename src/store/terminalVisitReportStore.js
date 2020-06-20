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

        // 页面展示日期时间状态 DR为按天查询 DY按月查询
        dateOrMonth: 'DR',

        // 页面展示人员信息还是组织信息
        userOrOrganization: 'RY',

        // 目标类别 terminal终端 distributor经销商
        targetType: 'ZD',

        // 报表类型 BF拜访 ZF走访 DC督查
        reportType: 'BF',

        // 终端拜访查询时间段
        terminalVisitQueryTime: "",

        // 
        reportMessage: {}
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
                (state.userOrOrganization === 'RY') ?
                    'ZZ ' : 'RY';
        },

        setTerminalUserOrOrganization(state, payload) {
            state.userOrOrganization = payload.type;
        },

        // 改变日期时间状态
        changeDateOrMonth(state) {
            state.dateOrMonth =
                (state.dateOrMonth === 'DR') ?
                    'DY' : 'DR'
        },

        // 修改 targetType 和 reportType
        changeTargetAndReportType(state, payload) {
            state.targetType = payload.targetType;
            state.reportType = payload.reportType;
        },

        // 改变终端拜访查询时间
        // 可能带日期可能不带日期，根据 state.dateOrMonth 来判断显示日期
        changeTerminalVisitQueryTime(state, payload) {
            state.terminalVisitQueryTime = payload.showSelectDate;
        },

        // 修改终端拜访人员还是组织
        changeTerminalUserOrOrganization(state, payload) {
            state.userOrOrganization = payload.type;
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

            // 头部板块，仅将数据返回就好
            let headerMessage = {
                ...reportMessage.es_visit_summary,
                ...reportMessage.es_summary
            };

            context.state.reportMessage = reportMessage;
            context.state.headerMessage = headerMessage;
        }
    }

}

export {
    terminalVisitReportStore
}
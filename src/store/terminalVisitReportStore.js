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

        // 目标类别 terminal终端 distributor经销商
        targetType: 'ZD',

        // 报表类型 BF拜访 ZF走访 DC督查
        reportType: 'BF',

        // 页面展示日期时间状态 DR为按天查询 DY按月查询
        dateOrMonth: 'DR',

        // 页面展示人员信息还是组织信息
        userOrOrganization: 'RY',

        // 终端拜访查询时间段
        terminalVisitQueryTime: "",

        // 
        reportMessage: {},

        headerMessage: {},

        swiperList: [],
        swiperNavList: []
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
            let swiperList = [];
            let swiperNavList = [];
            switch (payload.url) {
                case 'ZD_BF_DR_RY':
                    swiperList = [
                        {
                            visitData: [
                                {
                                    name: '拜访总时长',
                                    value: headerMessage.visit_total_time,
                                    util: '小时'
                                }, {
                                    name: '拜访总数',
                                    value: headerMessage.visit_time,
                                    util: '次'
                                }, {
                                    name: '平均拜访时长',
                                    value: headerMessage.avg_time,
                                    util: 'min/次'
                                }
                            ],
                            rankLists: [
                                {
                                    title: '所在工作站排行榜',
                                    desc: '拜访总时长',
                                    list: reportMessage.et_total_visit_time,
                                    onlyValue: 'total_visit_time',
                                    header: [
                                        {
                                            name: '拜访总时长',
                                            value: 'total_visit_time',
                                            util: '小时'
                                        }, {
                                            name: '拜访总数',
                                            value: 'visit_time',
                                            util: '小时'
                                        }, {
                                            name: '平均拜访时长',
                                            value: 'avg_time',
                                            util: '小时'
                                        }
                                    ]
                                }
                            ]
                        }
                    ];
                    break;
                case 'ZD_BF_DY_RY':
                    swiperNavList = ['拜访效率', '拜访时长', '拜访有效率']
                    swiperList = [
                        {
                            title: '拜访效率',
                            visitData: [
                                {
                                    name: '日均家数',
                                    value: headerMessage.average_number,
                                    util: '家'
                                }, {
                                    name: '日均次数',
                                    value: headerMessage.average_visit_time,
                                    util: '次'
                                }, {
                                    name: '拜访天数',
                                    value: headerMessage.visit_days,
                                    util: '天'
                                }, {
                                    name: '日均拜访时长',
                                    value: headerMessage.average_day_time,
                                    util: '小时'
                                }
                            ],
                            rankLists: [
                                {
                                    title: '所在工作站排行榜',
                                    desc: '日均拜访家数',
                                    list: reportMessage.et_total_visit_rank,
                                    onlyValue: 'total_visit_time',
                                    header: [
                                        {
                                            name: '日均拜访家数',
                                            value: 'total_visit_time',
                                            util: '家'
                                        }, {
                                            name: '日均次数',
                                            value: 'visit_time',
                                            util: '次'
                                        }, {
                                            name: '拜访天数',
                                            value: 'average_number',
                                            util: '天'
                                        }, {
                                            name: '日均拜访时长',
                                            value: 'average_number',
                                            util: '小时'
                                        }
                                    ]
                                }
                            ]
                        }, {
                            title: '拜访时长',
                            visitData: [
                                {
                                    name: '拜访总时长',
                                    value: headerMessage.visit_total_time,
                                    util: '小时'
                                }, {
                                    name: '拜访总数',
                                    value: headerMessage.visit_time,
                                    util: '次'
                                }, {
                                    name: '平均拜访时长',
                                    value: headerMessage.avg_time,
                                    util: 'min/次'
                                }
                            ],
                            rankLists: [
                                {
                                    title: '所在工作站排行榜',
                                    desc: '拜访总时长',
                                    list: reportMessage.et_total_visit_time,
                                    onlyValue: 'visit_total_time',
                                    header: [
                                        {
                                            name: '拜访总时长',
                                            value: 'visit_total_time',
                                            util: '小时'
                                        }, {
                                            name: '拜访总数',
                                            value: 'visit_time',
                                            util: '次'
                                        }, {
                                            name: '平均拜访时长',
                                            value: 'avg_time',
                                            util: 'min/次'
                                        }
                                    ]
                                }
                            ]
                        }, {
                            title: '拜访有效率',
                            visitData: [
                                {
                                    name: '有效拜访率',
                                    value: headerMessage.visit_efficient
                                }, {
                                    name: '拜访率',
                                    value: headerMessage.visit_rate
                                }
                            ],
                            rankLists: [
                                {
                                    title: '所在工作站排行榜',
                                    desc: '拜访总时长',
                                    list: reportMessage.et_total_visit_efficient,
                                    onlyValue: 'visit_efficient',
                                    header: [
                                        {
                                            name: '有效拜访率',
                                            value: 'visit_efficient',
                                        }, {
                                            name: '有效拜访',
                                            value: 'visit_num2',
                                            util: '家'
                                        }, {
                                            name: '拜访率',
                                            value: 'visit_rate',
                                        }, {
                                            name: '拜访总数',
                                            value: 'visit_num1',
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
            }
            context.state.swiperList = swiperList;
            context.state.swiperNavList = swiperNavList;

            context.state.reportMessage = reportMessage;
            context.state.headerMessage = headerMessage;
        }
    }

}

export {
    terminalVisitReportStore
}
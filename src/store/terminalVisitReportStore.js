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

        // 用于获取报表数据的参数
        reportAjaxData: null,

        // 报表详情页url
        reportUrl: '',

        // 报表详情页数据
        reportMessage: {},

        // 用户或组织信息
        headerMessage: {},

        swiperList: [],

        swiperNavList: [],

        swiperIndex: 0,

        rankIndex: 0,

    },

    mutations: {

        // 保存拜访详情页swiper下标
        saveSwiperTitleIndex(state, payload) {
            state.swiperIndex = payload.index
        },
        clearReoprtAjaxData(state) {
            state.reportAjaxData = null;
            state.terminalVisitQueryTime = "";
            state.swiperIndex = 0;
            state.reportUrl = ''
        },
        // 首页重置swiper下标
        removeSwiperIndex(state) {
            state.swiperIndex = 0
        },
        clearVisitTime(state) {
            state.terminalVisitQueryTime = "";
        },
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
            state.reportAjaxData = payload.reportAjaxData;
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
        },

        // 修改排名列表中分类的下表
        changeSwiperIndex(state, payload) {
            state.swiperIndex = payload.index; // swiper的下标
            state.rankIndex = payload.i;// 排名列表的下标
        }
    },

    actions: {
        /**
         * @param {*} obj 前端用于请求数据的参数
         * @description 获取工作圈分享的数据，仅一次
         */
        async getShareTerminalVisitDetail(context, payload) {
            
            let workCircleDetail = await Http.share("getWorkCircleDetail", {
                ...payload.obj
            });
            workCircleDetail = workCircleDetail[0];

            
            // 实际用户头像换取
            workCircleDetail.user_head = await getImgOriginalUrl(workCircleDetail.user_head)

            workCircleDetail.leave_data = timeStampToTime(workCircleDetail.visit_out_time, 'MM月DD日 W');
            // 拜访时长
            let a = (workCircleDetail.visit_out_time - workCircleDetail.visit_in_time)
            workCircleDetail.visit_long_time = `${(a/1000/60).toFixed(0)}`

            if (workCircleDetail.photo_info.length) {
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
            }
            

            // 进店离店时间
            workCircleDetail.visit_in_time = timeStampToTime(workCircleDetail.visit_in_time, 'H:M');
            workCircleDetail.visit_out_time = timeStampToTime(workCircleDetail.visit_out_time, 'H:M');
            context.commit('setShareWorkCircleDetail', {
                workCircleDetail
            });

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

            context.state.reportUrl = payload.url;

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
                                    util: '分/次'
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
                                            util: '分/次'
                                        }
                                    ]
                                }
                            ]
                        }
                    ];
                    break;
                case 'ZD_BF_DY_RY':
                    swiperNavList = ['拜访效率', '拜访时长', '拜访有效率', '当月拜访计划']
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
                            trend: true,
                            rankLists: [
                                {
                                    title: '所在工作站排行榜',
                                    desc: '日均拜访家数',
                                    list: reportMessage.et_total_visit_rank,
                                    onlyValue: 'average_number',
                                    onlyUtil: '家',
                                    header: [
                                        {
                                            name: '日均拜访家数',
                                            value: 'average_number',
                                            util: '家'
                                        }, {
                                            name: '日均次数',
                                            value: 'average_visit_time',
                                            util: '次'
                                        }, {
                                            name: '拜访天数',
                                            value: 'visit_days',
                                            util: '天'
                                        }, {
                                            name: '日均拜访时长',
                                            value: 'average_day_time',
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
                                    util: '分/次'
                                }
                            ],
                            rankLists: [
                                {
                                    title: '所在工作站排行榜',
                                    desc: '拜访总时长',
                                    list: reportMessage.et_total_visit_time,
                                    onlyValue: 'visit_total_time',
                                    onlyUtil: '小时',
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
                                            util: '分/次'
                                        }
                                    ]
                                }
                            ]
                        }, {
                            title: '拜访有效率',
                            visitData: [
                                {
                                    name: '有效拜访率',
                                    value: headerMessage.visit_efficient,
                                    utilValue: headerMessage.visit_num2,
                                    util: '家'
                                }, {
                                    name: '拜访率',
                                    value: headerMessage.visit_rate,
                                    utilValue: headerMessage.visit_num1,
                                    util: '家'
                                }
                            ],
                            showPlace: true,
                            rankLists: [
                                {
                                    title: '所在工作站排行榜',
                                    desc: '有效拜访率',
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
                                            util: '家'
                                        }
                                    ]
                                }
                            ]
                        }, {
                            visitData: [
                                {
                                    name: '计划完成率',
                                    value: headerMessage.plan_rate
                                }, {
                                    name: '计划完成比例',
                                    value: headerMessage.plan_percent
                                }
                            ],
                            planList: reportMessage.et_visit_plan
                        }
                    ];
                    break;
                case 'ZD_BF_DR_ZZ':
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
                                    util: '分/次'
                                }
                            ],
                            rankLists: [
                                {
                                    title: '同级排行榜',
                                    desc: '拜访总时长',
                                    list: reportMessage.et_rank_sameorg_egvtimes,
                                    onlyValue: 'visit_total_time',
                                    onlyUtil: '小时',
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
                                            util: '分/次'
                                        }
                                    ]
                                }, {
                                    title: '下级排行榜',
                                    desc: '拜访总时长',
                                    list: reportMessage.et_rank_suborg_egvtimes,
                                    onlyValue: 'visit_total_time',
                                    onlyUtil: '小时',
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
                                            util: '分/次'
                                        }
                                    ]
                                }
                            ]
                        }
                    ];
                    break;
                case 'ZD_BF_DY_ZZ':
                    swiperNavList = ['拜访效率', '拜访时长', '拜访有效率']
                    swiperList = [
                        {
                            title: '拜访效率',
                            visitData: [
                                {
                                    name: '日均家数',
                                    value: headerMessage.average_number,
                                    util: '家/人'
                                }, {
                                    name: '日均次数',
                                    value: headerMessage.average_visit_time,
                                    util: '次/人'
                                }, {
                                    name: '拜访天数',
                                    value: headerMessage.visit_days,
                                    util: '天/人'
                                }, {
                                    name: '日均拜访时长',
                                    value: headerMessage.average_day_time,
                                    util: '小时/人'
                                }
                            ],
                            rankLists: [
                                {
                                    title: '同级排行榜',
                                    desc: '日均家数',
                                    list: reportMessage.et_rank_sameorg_egvnumber,
                                    onlyValue: 'average_number',
                                    onlyUtil: '家/人',
                                    header: [
                                        {
                                            name: '日均拜访家数',
                                            value: 'average_number',
                                            util: '家'
                                        }, {
                                            name: '日均次数',
                                            value: 'average_visit_time',
                                            util: '次'
                                        }, {
                                            name: '拜访天数',
                                            value: 'visit_days',
                                            util: '天'
                                        }, {
                                            name: '日均拜访时长',
                                            value: 'average_day_time',
                                            util: '小时'
                                        }
                                    ]
                                }, {
                                    title: '下级排行榜',
                                    desc: '日均家数',
                                    list: reportMessage.et_rank_suborg_egvnumber,
                                    onlyValue: 'average_number',
                                    onlyUtil: '家',
                                    header: [
                                        {
                                            name: '日均拜访家数',
                                            value: 'average_number',
                                            util: '家'
                                        }, {
                                            name: '日均次数',
                                            value: 'average_visit_time',
                                            util: '次'
                                        }, {
                                            name: '拜访天数',
                                            value: 'visit_days',
                                            util: '天'
                                        }, {
                                            name: '日均拜访时长',
                                            value: 'average_day_time',
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
                                    util: '小时/人'
                                }, {
                                    name: '拜访总数',
                                    value: headerMessage.visit_time,
                                    util: '次/人'
                                }, {
                                    name: '平均拜访时长',
                                    value: headerMessage.avg_time,
                                    util: '分/次'
                                }
                            ],
                            rankLists: [
                                {
                                    title: '同级排行榜',
                                    desc: '拜访总时长',
                                    list: reportMessage.et_rank_sameorg_egvtimes,
                                    onlyValue: 'visit_total_time',
                                    onlyUtil: '小时/人',
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
                                            util: '分/次'
                                        }
                                    ]
                                }, {
                                    title: '下级排行榜',
                                    desc: '拜访总时长',
                                    list: reportMessage.et_rank_suborg_egvtimes,
                                    onlyValue: 'visit_total_time',
                                    onlyUtil: '小时',
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
                                            util: '分/次'
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
                            showPlace: true,
                            rankLists: [
                                {
                                    title: '同级排行榜',
                                    desc: '有效拜访率',
                                    list: reportMessage.et_rank_sameorg_efficient,
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
                                }, {
                                    title: '下级排行榜',
                                    desc: '有效拜访率',
                                    list: reportMessage.et_rank_suborg_efficient,
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
                    ];
                    break;
                case 'JXS_BF_DR_RY':
                    swiperList = [
                        {
                            visitData: [
                                {
                                    name: '拜访总数',
                                    value: headerMessage.visit_number,
                                    util: '家'
                                }
                            ]
                        }
                    ];
                    break;
                case 'JXS_BF_DY_RY':
                    swiperList = [
                        {
                            visitData: [
                                {
                                    name: '拜访总数',
                                    value: headerMessage.visit_number,
                                    util: '家'
                                }
                            ]
                        }
                    ];
                    break;
                case 'JXS_BF_DR_ZZ':
                    swiperList = [
                        {
                            visitData: [
                                {
                                    name: '拜访总数',
                                    value: headerMessage.visit_number,
                                    util: '家'
                                }, {
                                    name: '人均拜访数',
                                    value: headerMessage.average_number,
                                    util: '家/人'
                                }, {
                                    name: '有问题经销商数',
                                    value: headerMessage.question_number,
                                    util: '家'
                                }
                            ]
                        }
                    ];
                    break;
                case 'JXS_BF_DY_ZZ':
                    swiperList = [
                        {
                            visitData: [
                                {
                                    name: '拜访总数',
                                    value: headerMessage.visit_number,
                                    util: '家'
                                }, {
                                    name: '人均拜访数',
                                    value: headerMessage.average_number,
                                    util: '家'
                                }
                            ],
                        }
                    ];
                    break;
                case 'ZD_ZF_DR_RY':
                    swiperList = [
                        {
                            visitData: [
                                {
                                    name: '走访总时长',
                                    value: headerMessage.visit_total_time,
                                    util: '小时'
                                }, {
                                    name: '走访总数',
                                    value: headerMessage.visit_time,
                                    util: '次'
                                }, {
                                    name: '平均走访时长',
                                    value: headerMessage.avg_time,
                                    util: '分/次'
                                }
                            ],

                            rankLists: [
                                {
                                    title: '所在业务部排行榜',
                                    desc: '走访总时长',
                                    list: reportMessage.et_visit_time,
                                    onlyValue: 'visit_total_time',
                                    onlyUtil: '小时',
                                    header: [
                                        {
                                            name: '走访总时长',
                                            value: 'visit_total_time',
                                            util: '小时'
                                        }, {
                                            name: '走访总数',
                                            value: 'visit_time',
                                            util: '次'
                                        }, {
                                            name: '平均走访时长',
                                            value: 'avg_time',
                                            util: '分/次'
                                        }
                                    ]
                                }
                            ],
                            question: reportMessage.et_visit_quest
                        }
                    ];
                    break;
                case 'ZD_ZF_DY_RY':
                    swiperNavList = ['走访效率', '走访时长']
                    swiperList = [
                        {
                            visitData: [
                                {
                                    name: '日均家数',
                                    value: headerMessage.average_number,
                                    util: '家'
                                }, {
                                    name: '走访天数',
                                    value: headerMessage.visit_days,
                                    util: '天'
                                }, {
                                    name: '日均走访时长',
                                    value: headerMessage.average_time,
                                    util: '小时'
                                }
                            ],
                            trend: true,
                            rankLists: [
                                {
                                    title: '所在工作站排行榜',
                                    desc: '日均走访家数',
                                    list: reportMessage.et_visit_rank,
                                    onlyValue: 'average_number',
                                    onlyUtil: '家',
                                    header: [
                                        {
                                            name: '日均走访家数',
                                            value: 'average_number',
                                            util: '家'
                                        }, {
                                            name: '拜访天数',
                                            value: 'visit_days',
                                            util: '天'
                                        }, {
                                            name: '日均走访时长',
                                            value: 'average_time',
                                            util: '小时'
                                        }
                                    ]
                                }
                            ]
                        }, {
                            title: '走访时长',
                            visitData: [
                                {
                                    name: '走访总时长',
                                    value: headerMessage.visit_total_time,
                                    util: '小时'
                                }, {
                                    name: '走访总数',
                                    value: headerMessage.visit_time,
                                    util: '次'
                                }, {
                                    name: '平均走访时长',
                                    value: headerMessage.avg_time,
                                    util: '分/次'
                                }
                            ],
                            rankLists: [
                                {
                                    title: '所在工作站排行榜',
                                    desc: '走访总时长',
                                    list: reportMessage.et_visit_time,
                                    onlyValue: 'visit_total_time',
                                    onlyUtil: '小时',
                                    header: [
                                        {
                                            name: '走访总时长',
                                            value: 'visit_total_time',
                                            util: '小时'
                                        }, {
                                            name: '走访总数',
                                            value: 'visit_time',
                                            util: '次'
                                        }, {
                                            name: '平均走访时长',
                                            value: 'avg_time',
                                            util: '分/次'
                                        }
                                    ]
                                }
                            ],
                            question: reportMessage.et_visit_quest
                        }
                    ];
                    break;
                case 'ZD_ZF_DR_ZZ':
                    swiperList = [
                        {
                            visitData: [
                                {
                                    name: '走访总时长',
                                    value: headerMessage.visit_total_time,
                                    util: '小时'
                                }, {
                                    name: '走访总数',
                                    value: headerMessage.visit_time,
                                    util: '次'
                                }, {
                                    name: '平均走访时长',
                                    value: headerMessage.avg_time,
                                    util: '分/次'
                                }
                            ],
                            question: reportMessage.et_visit_quest
                        }
                    ];
                    break;
                case 'ZD_ZF_DY_ZZ':
                    swiperNavList = ['走访效率', '走访时长']
                    swiperList = [
                        {
                            visitData: [
                                {
                                    name: '日均家数',
                                    value: headerMessage.average_number,
                                    util: '家/人'
                                }, {
                                    name: '走访天数',
                                    value: headerMessage.visit_days,
                                    util: '天/人'
                                }, {
                                    name: '日均走访时长',
                                    value: headerMessage.average_day_time,
                                    util: '小时/人'
                                }
                            ],
                            rankLists: [
                                {
                                    title: '同级排行榜',
                                    desc: '日均走访家数',
                                    list: reportMessage.et_rank_sameorg_egvtimes,
                                    onlyValue: 'average_number',
                                    onlyUtil: '家',
                                    header: [
                                        {
                                            name: '日均走访家数',
                                            value: 'average_number',
                                            util: '家/人'
                                        }, {
                                            name: '走访天数',
                                            value: 'visit_days',
                                            util: '天/人'
                                        }, {
                                            name: '日均走访时长',
                                            value: 'average_day_time',
                                            util: '小时/人'
                                        }
                                    ]
                                }, {
                                    title: '下级排行榜',
                                    desc: '日均走访家数',
                                    list: reportMessage.et_rank_suborg_egvtimes,
                                    onlyValue: 'average_number',
                                    onlyUtil: '家',
                                    header: [
                                        {
                                            name: '日均走访家数',
                                            value: 'average_number',
                                            util: '家/人'
                                        }, {
                                            name: '走访天数',
                                            value: 'visit_days',
                                            util: '天/人'
                                        }, {
                                            name: '日均走访时长',
                                            value: 'average_day_time',
                                            util: '小时/人'
                                        }
                                    ]
                                }, {
                                    title: '直属管理员排行榜',
                                    desc: '日均走访家数',
                                    list: reportMessage.et_rank_direct_egvtimes,
                                    onlyValue: 'average_number',
                                    onlyUtil: '家',
                                    header: [
                                        {
                                            name: '日均走访家数',
                                            value: 'average_number',
                                            util: '家'
                                        }, {
                                            name: '拜访天数',
                                            value: 'visit_days',
                                            util: '天'
                                        }, {
                                            name: '日均走访时长',
                                            value: 'average_day_time',
                                            util: '小时'
                                        }
                                    ]
                                }
                            ]
                        }, {
                            visitData: [
                                {
                                    name: '走访总时长',
                                    value: headerMessage.visit_total_time,
                                    util: '小时'
                                }, {
                                    name: '走访总数',
                                    value: headerMessage.visit_time,
                                    util: '次'
                                }, {
                                    name: '平均走访时长',
                                    value: headerMessage.avg_time,
                                    util: '分/次'
                                }
                            ],

                            rankLists: [
                                {
                                    title: '同级排行榜',
                                    desc: '走访总时长',
                                    list: reportMessage.et_rank_sameorg_totaltime,
                                    onlyValue: 'visit_total_time',
                                    onlyUtil: '小时',
                                    header: [
                                        {
                                            name: '走访总时长',
                                            value: 'visit_total_time',
                                            util: '家'
                                        }, {
                                            name: '走访总数',
                                            value: 'visit_time',
                                            util: '天'
                                        }, {
                                            name: '平均走访时长',
                                            value: 'avg_time',
                                            util: '分/次'
                                        }
                                    ]
                                }, {
                                    title: '下级排行榜',
                                    desc: '走访总时长',
                                    list: reportMessage.et_rank_suborg_totaltime,
                                    onlyValue: 'visit_total_time',
                                    onlyUtil: '小时',
                                    header: [
                                        {
                                            name: '走访总时长',
                                            value: 'visit_total_time',
                                            util: '家'
                                        }, {
                                            name: '走访次数',
                                            value: 'visit_time',
                                            util: '天'
                                        }, {
                                            name: '平均走访时长',
                                            value: 'avg_time',
                                            util: '分/次'
                                        }
                                    ]
                                }, {
                                    title: '直属管理员排行榜',
                                    desc: '走访总时长',
                                    list: reportMessage.et_rank_direct_totaltime,
                                    onlyValue: 'visit_total_time',
                                    onlyUtil: '小时',
                                    header: [
                                        {
                                            name: '走访总时长',
                                            value: 'visit_total_time',
                                            util: '家'
                                        }, {
                                            name: '走访次数',
                                            value: 'visit_time',
                                            util: '天'
                                        }, {
                                            name: '平均走访时长',
                                            value: 'avg_time',
                                            util: '分/次'
                                        }
                                    ]
                                }
                            ],
                            question: reportMessage.et_visit_quest
                        }
                    ];
                    break;
                case 'JXS_ZF_DR_RY':
                    swiperList = [
                        {
                            visitData: [
                                {
                                    name: '走访总数',
                                    value: headerMessage.visit_number,
                                    util: '家'
                                }, {
                                    name: '有问题经销商数',
                                    value: headerMessage.question_number,
                                    util: '家'
                                }
                            ],
                        }
                    ];
                    break;
                case 'JXS_ZF_DY_RY':
                    swiperList = [
                        {
                            visitData: [
                                {
                                    name: '走访总数',
                                    value: headerMessage.visit_number,
                                    util: '家'
                                }, {
                                    name: '有问题经销商数',
                                    value: headerMessage.question_number,
                                    util: '家'
                                }
                            ],
                            question: reportMessage.et_visit_quest
                        }
                    ];
                    break;
                case 'JXS_ZF_DR_ZZ':
                    swiperList = [
                        {
                            visitData: [
                                {
                                    name: '走访总数',
                                    value: headerMessage.visit_number,
                                    util: '家'
                                }, {
                                    name: '日均走访数',
                                    value: headerMessage.ave_number,
                                    util: '家'
                                }, {
                                    name: '有问题经销商数',
                                    value: headerMessage.question_number,
                                    util: '家'
                                }
                            ]
                        }
                    ];
                    break;
                case 'JXS_ZF_DY_ZZ':
                    swiperList = [
                        {
                            visitData: [
                                {
                                    name: '走访总数',
                                    value: headerMessage.visit_number,
                                    util: '家'
                                }, {
                                    name: '日均走访数',
                                    value: headerMessage.ave_number,
                                    util: '家'
                                }, {
                                    name: '有问题经销商数',
                                    value: headerMessage.question_number,
                                    util: '家'
                                }
                            ],
                            question: reportMessage.et_visit_quest
                        }
                    ];
                    break;
                case 'ZD_DC_DR_RY':
                    swiperList = [
                        {
                            visitData: [
                                {
                                    name: '督查总数',
                                    value: headerMessage.visit_number,
                                    util: '家'
                                }
                            ],
                            rankLists: [
                                {
                                    title: '所在工作站排行榜',
                                    desc: '督查总数',
                                    list: reportMessage.et_visit_number,
                                    onlyValue: 'visit_number',
                                    onlyUtil: '家',
                                    header: [
                                        {
                                            name: '督查总数',
                                            value: 'visit_number',
                                            util: '家'
                                        }
                                    ]
                                }
                            ],
                            question: reportMessage.et_visit_quest
                        }
                    ];
                    break;
                case 'ZD_DC_DY_RY':

                    swiperList = [
                        {
                            visitData: [
                                {
                                    name: '督查总数',
                                    value: headerMessage.visit_number,
                                    util: '家'
                                }
                            ],
                            rankLists: [
                                {
                                    title: '所在工作站排行榜',
                                    desc: '督查总数',
                                    list: reportMessage.et_visit_number,
                                    onlyValue: 'visit_number',
                                    onlyUtil: '家',
                                    header: [
                                        {
                                            name: '督查总数',
                                            value: 'visit_number',
                                            util: '家'
                                        }
                                    ]
                                }
                            ],
                            question: reportMessage.et_visit_quest
                        }
                    ];
                    break;
                case 'ZD_DC_DR_ZZ':
                    swiperList = [
                        {
                            visitData: [
                                {
                                    name: '督查总数',
                                    value: headerMessage.visit_number,
                                    util: '家'
                                }, {
                                    name: '人均督查数',
                                    value: headerMessage.ave_number,
                                    util: '家/人'
                                }, {
                                    name: '终端总数',
                                    value: headerMessage.termial_number,
                                    util: '家'
                                },

                            ],
                            rankLists: [
                                {
                                    title: '同级排行榜',
                                    desc: '人均督查总数',
                                    list: reportMessage.et_rank_sameorg_egvnum,
                                    onlyValue: 'ave_number',
                                    onlyUtil: '家',
                                    header: [
                                        {
                                            name: '人均督查数',
                                            value: 'ave_number',
                                            util: '家/人'
                                        }, {
                                            name: '督查总数',
                                            value: 'visit_number',
                                            util: '家'
                                        }, {
                                            name: '终端总数',
                                            value: 'termial_number',
                                            util: '家'
                                        }
                                    ]
                                }, {
                                    title: '下级排行榜',
                                    desc: '人均督查总数',
                                    list: reportMessage.et_rank_suborg_egvnum,
                                    onlyValue: 'visit_number',
                                    onlyUtil: '家',
                                    header: [
                                        {
                                            name: '督查总数',
                                            value: 'visit_number',
                                            util: '家'
                                        }, {
                                            name: '人均督查数',
                                            value: 'ave_number',
                                            util: '家/人'
                                        }, {
                                            name: '终端总数',
                                            value: 'termial_number',
                                            util: '家'
                                        }
                                    ]
                                }, {
                                    title: '直属管理员排行榜',
                                    desc: '人均督查总数',
                                    list: reportMessage.et_rank_direct_egvnum,
                                    onlyValue: 'ave_number',
                                    onlyUtil: '家',
                                    header: [
                                        {
                                            name: '督查总数',
                                            value: 'visit_number',
                                            util: '家'
                                        }, {
                                            name: '人均督查数',
                                            value: 'ave_number',
                                            util: '家/人'
                                        }, {
                                            name: '终端总数',
                                            value: 'termial_number',
                                            util: '家'
                                        }
                                    ]
                                }
                            ],
                            question: reportMessage.et_visit_quest
                        }
                    ];
                    break;
                case 'ZD_DC_DY_ZZ':
                    swiperList = [
                        {
                            visitData: [
                                {
                                    name: '已督查家数',
                                    value: headerMessage.visit_number,
                                    util: '家'
                                }, {
                                    name: '日均督查数',
                                    value: headerMessage.ave_number,
                                    util: '家/人'
                                }, {
                                    name: '终端总数',
                                    value: headerMessage.termial_number,
                                    util: '家'
                                },

                            ],
                            rankLists: [
                                {
                                    title: '同级排行榜',
                                    desc: '人均督查总数',
                                    list: reportMessage.et_rank_sameorg_egvnum,
                                    onlyValue: 'ave_number',
                                    onlyUtil: '家/人',
                                    header: [
                                        {
                                            name: '日均督查数',
                                            value: 'ave_number',
                                            util: '家/人'
                                        }, {
                                            name: '终端总数',
                                            value: 'termial_number',
                                            util: '家'
                                        }, {
                                            name: '已督查家数',
                                            value: 'visit_number',
                                            util: '家'
                                        }
                                    ]
                                }, {
                                    title: '下级排行榜',
                                    desc: '人均督查总数',
                                    list: reportMessage.et_rank_suborg_egvnum,
                                    onlyValue: 'ave_number',
                                    onlyUtil: '家',
                                    header: [
                                        {
                                            name: '督查总数',
                                            value: 'ave_number',
                                            util: '家'
                                        }, {
                                            name: '日均督查数',
                                            value: 'ave_number',
                                            util: '家/人'
                                        }, {
                                            name: '终端总数',
                                            value: 'termial_number',
                                            util: '家'
                                        }
                                    ]
                                }, {
                                    title: '直属管理员排行榜',
                                    desc: '人均督查总数',
                                    list: reportMessage.et_rank_direct_egvnum,
                                    onlyValue: 'ave_number',
                                    onlyUtil: '家',
                                    header: [
                                        {
                                            name: '督查总数',
                                            value: 'visit_number',
                                            util: '家'
                                        }, {
                                            name: '日均督查数',
                                            value: 'ave_number',
                                            util: '家/人'
                                        }, {
                                            name: '终端总数',
                                            value: 'termial_number',
                                            util: '家'
                                        }
                                    ]
                                }
                            ],
                            question: reportMessage.et_visit_quest
                        }
                    ];
                    break;
                case 'JXS_DC_DR_RY':
                    swiperList = [
                        {
                            visitData: [
                                {
                                    name: '督查总数',
                                    value: headerMessage.visit_number,
                                    util: '家'
                                }, {
                                    name: '有问题经销商数',
                                    value: headerMessage.question_number,
                                    util: '家'
                                }
                            ],
                        }
                    ];
                    break;
                case 'JXS_DC_DY_RY':
                    swiperList = [
                        {
                            visitData: [
                                {
                                    name: '督查总数',
                                    value: headerMessage.visit_number,
                                    util: '家'
                                }, {
                                    name: '有问题经销商数',
                                    value: headerMessage.question_number,
                                    util: '家'
                                }
                            ],
                            question: reportMessage.et_visit_quest
                        }
                    ];
                    break;
                case 'JXS_DC_DR_ZZ':
                    swiperList = [
                        {
                            visitData: [
                                {
                                    name: '督查总数',
                                    value: headerMessage.visit_number,
                                    util: '家'
                                }, {
                                    name: '日均督查数',
                                    value: headerMessage.ave_number,
                                    util: '家/人'
                                }, {
                                    name: '有问题经销商数',
                                    value: headerMessage.question_number,
                                    util: '家'
                                }
                            ]
                        }
                    ];
                    break;
                case 'JXS_DC_DY_ZZ':
                    swiperList = [
                        {
                            visitData: [
                                {
                                    name: '督查总数',
                                    value: headerMessage.visit_number,
                                    util: '家'
                                }, {
                                    name: '日均督查数',
                                    value: headerMessage.ave_number,
                                    util: '家/人'
                                }, {
                                    name: '有问题经销商数',
                                    value: headerMessage.question_number,
                                    util: '家'
                                }
                            ],
                            question: reportMessage.et_visit_quest
                        }
                    ];
                    break;

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
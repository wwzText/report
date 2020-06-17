import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import { headerNavStore } from './headerNavStore'; // 顶部导航栏数据分析及处理
import { terminalVisitReportStore } from './terminalVisitReportStore'; // 终端拜访报表
import { userInfoStore } from './userInfoStore'; // 用户信息仓库
import { organizationTreeStore } from './organizationTreeStore'; // 组织树
import { visitRecordListStore } from './visitRecordListStore'; // 拜访记录列表

export default new Vuex.Store({
  modules: {
    headerNavStore,
    terminalVisitReportStore,
    userInfoStore,
    organizationTreeStore,
    visitRecordListStore,
  }
})

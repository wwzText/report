import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import { headerNavStore } from './headerNavStore';
import {terminalVisitReportStore} from './terminalVisitReportStore'

export default new Vuex.Store({
  modules: {
    headerNavStore,
    terminalVisitReportStore
  }
})

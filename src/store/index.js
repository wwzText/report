import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import { headerNavStore } from './headerNavStore';

export default new Vuex.Store({
  state: {
    ...headerNavStore.state,
  },
  mutations: {
    ...headerNavStore.mutations,
  },
  actions: {

  },
  getters: {

  }
})

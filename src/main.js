import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import './assets/iconfont/iconfont.css' // iconfont
import './assets/css/index.css';  // 通用样式
import './assets/less/theme.less';  // 主题less配置

import headerNav from '@/components/common/headerNav';
Vue.component('HeaderNav', headerNav)
import dataMonthChange from './components/common/dataMonthChange';
Vue.component('DataMonthChange', dataMonthChange)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

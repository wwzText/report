import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import '@/assets/iconfont/iconfont.css'
import './assets/less/theme.less';

import headerNav from '@/components/common/headerNav';

Vue.component('HeaderNav', headerNav)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

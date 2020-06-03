import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import './assets/iconfont/iconfont.css' // iconfont
import './assets/css/index.css';  // 通用样式
import './assets/less/theme.less';  // 主题less配置
import 'vant/lib/button/style';

// 全局使用的vant中的引入使用及注册
import useVantComponent from './config/useVantComponent.config';
for (let item in useVantComponent) {
  Vue.component(item, useVantComponent[item])
}

// 全局多处使用的自定义组件引入及注册
import useCommonComponent from './config/useCommonComponent.config';
for (let item in useCommonComponent) {
  Vue.component(item, useCommonComponent[item])
}


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

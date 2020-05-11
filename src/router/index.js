import Vue from 'vue';
import VueRouter from 'vue-router';

import Index from '@/pages/index';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: Index
  }, {
    path: '/about',
    name: 'About',
    component: () => import('@/pages/terminalReport')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

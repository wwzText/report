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
    path: '/terminalVisitReport',
    name: 'TerminalVisitReport',
    component: () => import('@/pages/terminalVisitReport')
  }
]

export {
    routes
}
import Vue from 'vue';
import VueRouter from 'vue-router';
import Entry from '@/pages/entry';
import Index from '@/pages/index';
import terminalVisitReport from '@/pages/terminalVisitReport';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/workCircle',
  }, {
    path: '/workCircle',
    name: 'workCircleEntry',
    component: Entry,
    children: [
      {
        path: '',
        component: () => import('@/pages/index'),
      }, {
        path: 'terminalVisitReport',
        component: () => import('@/pages/terminalVisitReport')
      }
    ]
  }, {
    path: '/share',
    name: 'wotkCircleShare',
    component: () => import('@/pages/wotkCircleShare')
  }
]

export {
  routes
}
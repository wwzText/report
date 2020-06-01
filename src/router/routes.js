const routes = [
  {
    path: '/',
    redirect: '/report',
  }, {
    path: '/report',
    name: 'workCircleEntry',
    component: () => import('@/pages/entry'),
    children: [
      {
        path: '',
        component: () => import('@/pages/index'),
      }, {
        path: 'terminalVisitReport',
        component: () => import('@/pages/terminalVisitReport')
      }, {
        path: 'visitRecordList',
        component: () => import('@/pages/visitRecordList')
      }
    ]
  }, {
    path: '/workCirclevisit',
    name: 'workCirclevisit',
    component: () => import('@/pages/workCirclevisit')
  }
]

export {
  routes
}
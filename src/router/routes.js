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
        path: 'visitRanking',
        component: () => import('@/pages/visitRanking')
      }, {
        path: 'placeVisitEfficiency',
        component: () => import('@/pages/placeVisitEfficiency')
      }, {
        path: 'visitTrend', 
        component: () => import('@/pages/visitTrend')
      }
    ]
  }, {
    path: '/workCirclevisit',
    name: 'workCirclevisit',
    component: () => import('@/pages/workCirclevisit')
  }, {
    path: '/shareVisitDetail',
    name: 'shareVisitDetail',
    component: () => import('@/pages/shareVisitDetail')
  }
]

export {
  routes
}
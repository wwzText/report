const routes = [
  {
    path: '/',
    redirect: '/workCircle',
  }, {
    path: '/workCircle',
    name: 'workCircleEntry',
    component: () => import('@/pages/entry'),
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
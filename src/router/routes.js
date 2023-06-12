import config from '@/config'

export default function getBaseRoutes(routes) {
  const _config = config

  let rootRoute = {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home'),
    meta: {
      title: '后台',
      keepAlive: false,
      requiresAuth: config.homePermissions,
      // icon: () => import('@/assets/images/console.svg') // svg 图标方式
      icon: '' // icon-font symbol 方式
    }
  }

  if (routes) {
    rootRoute = {
      ...rootRoute,
      redirect: { name: config.defaultRouteName },
      // 选择布局组件
      component: () => import(`@/layouts/${_config.layout}`),
      children: routes
    }
  }

  return [
    {
      path: '/login',
      name: 'login',
      component: () => Promise.resolve(LOGIN_COMPONENT),
      meta: {
        title: '登录',
        keepAlive: false,
        requiresAuth: false
      }
    },
    rootRoute,
    {
      path: '/404',
      name: 'notFound',
      component: () => import('@/views/NotFound'),
      meta: {
        title: '404',
        keep: false,
        requiresAuth: false
      }
    },
    {
      path: '*', // 此处需特别注意至于最底部
      redirect: { name: 'notFound' }
    }
  ]
}

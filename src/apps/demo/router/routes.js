export default [
  {
    path: 'console',
    name: 'console',
    component: resolve => require.ensure(
      [],
      () => resolve(require('@/apps/demo/views/Console')),
      'chunk-console'
    ),
    meta: {
      title: '控制台',
      keepAlive: false,
      requiresAuth: true,
      icon: 'icon-menu-sjkb'
    }
  },
  {
    path: 'accounts',
    name: 'accounts',
    component: resolve => require.ensure(
      [],
      () => resolve(require('@/apps/demo/views/Accounts')),
      'chunk-accounts'
    ),
    meta: {
      title: '账户管理',
      keepAlive: false,
      requiresAuth: true,
      icon: 'icon-menu-xtgl'
    }
  }
]

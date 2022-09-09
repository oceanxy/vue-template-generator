import Vue from 'vue'
import VueRouter from 'vue-router'
import config from '@/config'
import TGRouterView from '@/layouts/components/TGRouterView'
import store from '@/store/client'

Vue.use(VueRouter)

/**
 * 路由
 */
export const routes = [
  /**
   * 登录/注册相关路由
   */
  {
    path: '/auth',
    component: () => import('@/layouts/BNLogin'),
    meta: {
      title: '',
      keepAlive: false,
      requiresAuth: false
    },
    children: [
      {
        path: '',
        component: () => import('@/views/client/Login'),
        meta: {
          title: '',
          keepAlive: false,
          requiresAuth: false
        },
        children: [
          {
            path: '',
            name: 'loginBefore',
            component: () => import('@/views/client/Login/components/loginBefore'),
            meta: {
              title: '',
              keepAlive: false,
              requiresAuth: false
            }
          },
          {
            path: '',
            name: 'loginAfter',
            component: () => import('@/views/client/Login/components/loginAfter'),
            meta: {
              title: '首页',
              keepAlive: true,
              requiresAuth: true
            }
          }
        ]
      },
      {
        path: 'login',
        name: 'login',
        component: () => import('@/views/client/Login/Login'),
        meta: {
          title: '登录',
          keepAlive: false,
          requiresAuth: false
        }
      },
      {
        path: 'logon',
        name: 'logon',
        component: () => import('@/views/client/Login/Logon'),
        meta: {
          title: '企业注册',
          keepAlive: false,
          requiresAuth: false
        }
      }
    ]
  },
  /**
   * 企业服务中心相关路由
   */
  {
    path: '/',
    // 选择布局组件
    component: () => import('@/layouts/TGProfile'),
    meta: {
      title: '企业服务中心',
      keepAlive: false,
      requiresAuth: true,
      icon: () => import('@/layouts/components/TGMenu/assets/images/enterpriseServiceCenter')
    },
    children: [
      // 需要展示在menu菜单中的路由在这里面添加
      {
        path: '',
        name: 'home',
        component: () => import('@/views/client/Home'),
        meta: {
          title: '企业服务中心',
          keepAlive: false,
          requiresAuth: true
        }
      },
      {
        path: 'basic',
        component: TGRouterView,
        meta: {
          title: '基础服务',
          keepAlive: false,
          requiresAuth: true,
          icon: () => import('@/layouts/components/TGMenu/assets/images/basicServices')
        },
        redirect: { name: 'contract' },
        children: [
          {
            path: 'contract',
            name: 'contract',
            component: () => import('@/views/client/basis/Contract'),
            meta: {
              title: '我的合同',
              keepAlive: false,
              requiresAuth: true
            }
          },
          {
            path: 'report-form',
            component: TGRouterView,
            meta: {
              title: '我的报表',
              keepAlive: false,
              requiresAuth: true,
              hideChildren: true
            },
            children: [
              {
                path: '',
                name: 'reportForm',
                component: () => import('@/views/client/basis/ReportForm'),
                meta: {
                  title: '我的报表',
                  keepAlive: false,
                  requiresAuth: true
                }
              },
              {
                path: 'form',
                name: 'reportFForm',
                component: () => import('@/views/client/basis/ReportForm/Form'),
                meta: {
                  title: '立即填报',
                  keepAlive: false,
                  requiresAuth: true
                }
              },
              {
                path: 'record',
                name: 'reportFormRecord',
                component: () => import('@/views/client/basis/ReportForm/Record'),
                meta: {
                  title: '填报记录',
                  keepAlive: false,
                  requiresAuth: true
                }
              }
            ]
          },
          {
            path: 'cor-info',
            name: 'corInfo',
            component: () => import('@/views/client/basis/CorporateInformation'),
            meta: {
              title: '企业信息管理',
              keepAlive: false,
              requiresAuth: true
            }
          },
          {
            path: 'news',
            name: 'news',
            component: () => import('@/views/client/basis/News'),
            meta: {
              title: '我的消息',
              keepAlive: false,
              requiresAuth: true
            }
          },
          {
            path: 'park-news',
            component: TGRouterView,
            meta: {
              title: '园区新闻',
              keepAlive: false,
              requiresAuth: true,
              hideChildren: true
            },
            children: [
              {
                path: '',
                name: 'parkNews',
                meta: {
                  title: '园区新闻',
                  keepAlive: false,
                  requiresAuth: true
                },
                component: () => import('@/views/client/basis/ParkNews')
              },
              {
                path: 'detail',
                name: 'parkNewsDetail',
                meta: {
                  title: '园区新闻详情',
                  keepAlive: false,
                  requiresAuth: true
                },
                component: () => import('@/views/client/basis/ParkNews/components/details')
              }
            ]
          }
        ]
      },
      {
        path: 'finance',
        component: TGRouterView,
        meta: {
          title: '财务服务',
          keepAlive: false,
          requiresAuth: true,
          icon: () => import('@/layouts/components/TGMenu/assets/images/financialServices')
        },
        redirect: { name: 'bill' },
        children: [
          {
            path: 'bill',
            name: 'bill',
            component: () => import('@/views/client/finance/Bills'),
            meta: {
              title: '我的账单',
              keepAlive: false,
              requiresAuth: true
            }
          },
          {
            path: 'payment-record',
            name: 'paymentRecord',
            component: () => import('@/views/client/finance/Records'),
            meta: {
              title: '缴费记录',
              keepAlive: false,
              requiresAuth: true
            }
          },
          {
            path: 'invoice',
            name: 'invoice',
            component: () => import('@/views/client/finance/Invoices'),
            meta: {
              title: '我的发票',
              keepAlive: false,
              requiresAuth: true
            }
          }
        ]
      },
      {
        path: 'commercial-service',
        component: TGRouterView,
        meta: {
          title: '物业服务',
          keepAlive: false,
          requiresAuth: true,
          icon: () => import('@/layouts/components/TGMenu/assets/images/commercialService')
        },
        redirect: { name: 'reservation' },
        children: [
          {
            path: 'reservation',
            component: TGRouterView,
            meta: {
              title: '会议室预约',
              keepAlive: false,
              requiresAuth: true,
              hideChildren: true
            },
            children: [
              {
                path: '',
                name: 'reservation',
                component: () => import('@/views/client/properties/BookMeetingRoom'),
                meta: {
                  title: '会议室预约',
                  keepAlive: false,
                  requiresAuth: true
                }
              },
              {
                path: 'book',
                name: 'book',
                component: () => import('@/views/client/properties/BookMeetingRoom/Book'),
                meta: {
                  title: '立即预约',
                  keepAlive: false,
                  requiresAuth: true
                }
              },
              {
                path: 'records',
                name: 'appointmentRecord',
                component: () => import('@/views/client/properties/BookMeetingRoom/Records'),
                meta: {
                  title: '我的预约记录',
                  keepAlive: false,
                  requiresAuth: true
                }
              }
            ]
          },
          {
            path: 'repair',
            name: 'repair',
            component: () => import('@/views/client/properties/Repair'),
            meta: {
              title: '物业报修',
              keepAlive: false,
              requiresAuth: true
            }
          },
          {
            path: 'complaint',
            name: 'complaint',
            component: () => import('@/views/client/properties/Complaints'),
            meta: {
              title: '在线投诉',
              keepAlive: false,
              requiresAuth: true
            }
          }
        ]
      },
      {
        path: 'moveInto',
        name: 'moveInto',
        component: () => import('@/views/client/MoveInto'),
        meta: {
          title: '申请入驻',
          keepAlive: false,
          requiresAuth: true,
          icon: () => import('@/layouts/components/TGMenu/assets/images/basicServices')
        }
      }
    ]
  },
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

/* ======生成用于菜单显示的路由，根据 routes 生成========= */
const filterRoutes = routes.filter(route => route.path === '/')

const rootRoute = {
  ...filterRoutes[0],
  children: null
}

export const menuRoutes = filterRoutes[0].children.reduce((menuRoutes, route) => {
  if (!route.path) {
    menuRoutes.push(rootRoute)
  } else {
    menuRoutes.push(route)
  }

  return menuRoutes
}, [])
/* ==================================================== */

const router = new VueRouter({
  routes,
  base: process.env.VUE_APP_PUBLIC_PATH,
  mode: 'history'
})

router.beforeEach(async (to, from, next) => {
  let title = to.meta.title || ''

  if (title) {
    title += ' | '
  }

  document.title = title + config.systemName

  //判断是否自动登录
  if (to.query.token) {
    const res = await store.dispatch('login/bbsLogin', to.query.token)

    if (res.status) {
      next({ name: 'loginAfter' })
    } else {
      window.location.href = res.data
    }

    return
  }

  // 判断该路由是否需要登录权限
  // 获取存储在sessionStorage内的token，防止刷新页面导致vuex被清空而跳转到登录页
  const token = sessionStorage.getItem('token')

  if (to.meta.requiresAuth) {
    if (token) {
      next()
    } else {
      next({
        name: 'loginBefore',
        query: {
          // 将跳转的路由path作为参数，登录成功后跳转到该路由
          redirect: to.path,
          ...to.query
        }
      })
    }
  } else {
    if ((to.name === 'loginBefore' || to.name === 'login') && token) {
      next({ name: 'loginAfter' })
    } else {
      next()
    }
  }
})

export default router

import Vue from 'vue'
import VueRouter from 'vue-router'
import config from '@/config'
import TGRouterView from '@/layouts/components/TGRouterView'

Vue.use(VueRouter)

/**
 * 路由
 */
export const routes = [
  /**
   * 登录/注册相关路由
   */
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/manager/Login'),
    meta: {
      title: '登录',
      keepAlive: false,
      requiresAuth: false
    }
  },
  /**
   * 企业服务中心相关路由
   */
  {
    path: '/',
    // 选择布局组件
    component: () => import('@/layouts/TGBackendSystem'),
    meta: {
      title: '控制台',
      keepAlive: true,
      requiresAuth: true,
      icon: () => import('@/layouts/components/TGMenu/assets/images/console.svg')
    },
    children: [
      // 需要展示在menu菜单中的路由在这里面添加
      {
        path: '',
        name: 'home',
        component: () => import('@/views/manager/Home'),
        meta: {
          title: '控制台',
          keepAlive: true,
          requiresAuth: true,
          hideBreadCrumb: true
        }
      },
      {
        path: 'park-status',
        name: 'parkStatus',
        component: () => import('@/views/manager/ParkStatus'),
        meta: {
          title: '园区状态',
          keepAlive: true,
          requiresAuth: true,
          hideBreadCrumb: true,
          icon: () => import('@/layouts/components/TGMenu/assets/images/parkStatus.svg')
        }
      },
      {
        path: 'basic',
        component: TGRouterView,
        meta: {
          title: '基础数据',
          keepAlive: true,
          requiresAuth: true,
          icon: () => import('@/layouts/components/TGMenu/assets/images/basicServices')
        },
        redirect: { name: 'businesses' },
        children: [
          {
            path: 'businesses',
            component: TGRouterView,
            redirect: 'businesses',
            meta: {
              title: '企业管理',
              keepAlive: true,
              requiresAuth: true,
              hideChildren: true
            },
            children: [
              {
                path: '',
                name: 'businesses',
                component: () => import('@/views/manager/basis/Businesses'),
                meta: {
                  title: '企业管理',
                  keepAlive: true,
                  requiresAuth: true
                }
              },
              {
                path: 'details',
                name: 'businessesDetails',
                component: () => import('@/views/manager/basis/Businesses/Details'),
                meta: {
                  title: '详情',
                  keepAlive: false,
                  requiresAuth: true
                }
              }
            ]
          },
          {
            path: 'payment-record',
            name: 'paymentRecord',
            component: () => import('@/views/client/finance/Records'),
            meta: {
              title: '缴费记录',
              keepAlive: true,
              requiresAuth: true
            }
          },
          {
            path: 'invoice',
            name: 'invoice',
            component: () => import('@/views/client/finance/Invoices'),
            meta: {
              title: '我的发票',
              keepAlive: true,
              requiresAuth: true
            }
          }
        ]
      },
      {
        path: 'park-supervision-tb',
        component: TGRouterView,
        meta: {
          title: '园区监管(科技局)',
          keepAlive: true,
          requiresAuth: true,
          icon: () => import('@/layouts/components/TGMenu/assets/images/parkSupervision.svg')
        },
        redirect: { name: 'reservation' },
        children: [
          {
            path: 'reservation',
            component: TGRouterView,
            meta: {
              title: '科技局',
              keepAlive: true,
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
                  keepAlive: true,
                  requiresAuth: true
                }
              },
              {
                path: 'book',
                name: 'book',
                component: () => import('@/views/client/properties/BookMeetingRoom/Book'),
                meta: {
                  title: '立即预约',
                  keepAlive: true,
                  requiresAuth: true
                }
              },
              {
                path: 'records',
                name: 'appointmentRecord',
                component: () => import('@/views/client/properties/BookMeetingRoom/Records'),
                meta: {
                  title: '我的预约记录',
                  keepAlive: true,
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
              keepAlive: true,
              requiresAuth: true
            }
          },
          {
            path: 'complaint',
            name: 'complaint',
            component: () => import('@/views/client/properties/Complaints'),
            meta: {
              title: '在线投诉',
              keepAlive: true,
              requiresAuth: true
            }
          }
        ]
      },
      {
        path: 'park-supervision-ru',
        component: TGRouterView,
        meta: {
          title: '园区监管(监管单位)',
          keepAlive: true,
          requiresAuth: true,
          icon: () => import('@/layouts/components/TGMenu/assets/images/parkSupervision.svg')
        }
      },
      {
        path: 'park-investment',
        component: TGRouterView,
        meta: {
          title: '园区招商',
          keepAlive: true,
          requiresAuth: true,
          icon: () => import('@/layouts/components/TGMenu/assets/images/parkInvestment.svg')
        }
      },
      {
        path: 'discounts-lock',
        component: TGRouterView,
        meta: {
          title: '优惠管理',
          keepAlive: true,
          requiresAuth: true,
          icon: () => import('@/layouts/components/TGMenu/assets/images/discountsLock.svg')
        }
      },
      {
        path: 'contract-mana',
        component: TGRouterView,
        meta: {
          title: '签约管理',
          keepAlive: true,
          requiresAuth: true,
          icon: () => import('@/layouts/components/TGMenu/assets/images/contractManagement.svg')
        }
      },
      {
        path: 'financial-mana',
        component: TGRouterView,
        meta: {
          title: '财务管理',
          keepAlive: true,
          requiresAuth: true,
          icon: () => import('@/layouts/components/TGMenu/assets/images/financialManagement.svg')
        }
      },
      {
        path: 'content-release',
        component: TGRouterView,
        meta: {
          title: '内容发布',
          keepAlive: true,
          requiresAuth: true,
          icon: () => import('@/layouts/components/TGMenu/assets/images/contentRelease.svg')
        }
      },
      {
        path: 'questionnaire',
        component: TGRouterView,
        meta: {
          title: '调查问卷',
          keepAlive: true,
          requiresAuth: true,
          icon: () => import('@/layouts/components/TGMenu/assets/images/questionnaire.svg')
        }
      },
      {
        path: 'suggestions',
        component: TGRouterView,
        meta: {
          title: '投诉/建议管理',
          keepAlive: true,
          requiresAuth: true,
          icon: () => import('@/layouts/components/TGMenu/assets/images/suggestions.svg')
        }
      },
      {
        path: 'cancellation-mana',
        component: TGRouterView,
        meta: {
          title: '解约管理',
          keepAlive: true,
          requiresAuth: true,
          icon: () => import('@/layouts/components/TGMenu/assets/images/cancellationManagement.svg')
        }
      },
      {
        path: 'ent-ann-ass',
        component: TGRouterView,
        meta: {
          title: '企业年度考核',
          keepAlive: true,
          requiresAuth: true,
          icon: () => import('@/layouts/components/TGMenu/assets/images/enterpriseAnnualAssessment.svg')
        }
      },
      {
        path: 'conf-room-mana',
        component: TGRouterView,
        meta: {
          title: '会议室管理',
          keepAlive: true,
          requiresAuth: true,
          icon: () => import('@/layouts/components/TGMenu/assets/images/conferenceRoomManagement.svg')
        }
      },
      {
        path: 'work-order-mana',
        component: TGRouterView,
        meta: {
          title: '工单管理',
          keepAlive: true,
          requiresAuth: true,
          icon: () => import('@/layouts/components/TGMenu/assets/images/workOrderManagement.svg')
        }
      },
      {
        path: 'data-col',
        component: TGRouterView,
        meta: {
          title: '数据采集',
          keepAlive: true,
          requiresAuth: true,
          icon: () => import('@/layouts/components/TGMenu/assets/images/dataCollection.svg')
        }
      },
      {
        path: 'system-mana',
        component: TGRouterView,
        meta: {
          title: '系统管理',
          keepAlive: true,
          requiresAuth: true,
          icon: () => import('@/layouts/components/TGMenu/assets/images/systemManagement.svg')
        }
      }
    ]
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('@/views/NotFound'),
    meta: {
      title: '404',
      keep: false,
      requiresAuth: false
    }
  },
  {
    path: '*', // 此处需特别注意至于最底部
    redirect: '/404'
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

router.beforeEach((to, from, next) => {
  let title = to.meta.title || ''
  if (title) {
    title += ' | '
  }

  document.title = title + config.systemName

  // 判断该路由是否需要登录权限
  // 获取存储在sessionStorage内的token，防止刷新页面导致vuex被清空而跳转到登录页
  const token = sessionStorage.getItem('token')

  if (to.meta.requiresAuth) {
    if (token) {
      next()
    } else {
      next({
        name: 'login',
        query: {
          // 将跳转的路由path作为参数，登录成功后跳转到该路由
          redirect: to.path,
          ...to.query
        }
      })
    }
  } else {
    if (to.name === 'login' && token) {
      next({
        name: 'home'
      })
    } else {
      next()
    }
  }
})

export default router

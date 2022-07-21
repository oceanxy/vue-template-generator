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
      keepAlive: false,
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
          keepAlive: false,
          requiresAuth: true,
          hideBreadCrumb: true
        }
      },
      {
        path: 'park-status',
        name: 'parkStatus',
        component: () => import('@/views/manager/ParkStatus'),
        meta: {
          title: '中心状态',
          keepAlive: false,
          requiresAuth: true,
          hideBreadCrumb: true,
          icon: () => import('@/layouts/components/TGMenu/assets/images/parkStatus.svg')
        }
      },
      {
        path: 'basic',
        component: TGRouterView,
        redirect: { name: 'businesses' },
        meta: {
          title: '基础数据',
          keepAlive: false,
          requiresAuth: true,
          icon: () => import('@/layouts/components/TGMenu/assets/images/basicServices')
        },
        children: [
          {
            path: 'businesses',
            component: TGRouterView,
            redirect: 'businesses',
            meta: {
              title: '企业管理',
              keepAlive: false,
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
                  keepAlive: false,
                  requiresAuth: true
                }
              },
              {
                path: 'businesses-details',
                component: () => import('@/layouts/components/BNContainerWithBusinesses'),
                meta: {
                  title: '详情',
                  keepAlive: false,
                  requiresAuth: true
                },
                children: [
                  {
                    path: '',
                    name: 'businessesDetails',
                    component: () => import('@/views/manager/basis/Businesses/Details'),
                    meta: {
                      title: '详情',
                      keepAlive: false,
                      requiresAuth: true
                    }
                  }
                ]
              }
            ]
          },
          {
            path: 'teams',
            component: TGRouterView,
            redirect: 'teams',
            meta: {
              title: '团队管理',
              keepAlive: false,
              requiresAuth: true,
              hideChildren: true
            },
            children: [
              {
                path: '',
                name: 'teams',
                component: () => import('@/views/manager/basis/Teams'),
                meta: {
                  title: '团队管理',
                  keepAlive: false,
                  requiresAuth: true
                }
              },
              {
                path: 'team-members',
                name: 'teamMembers',
                component: () => import('@/views/manager/basis/Teams/Members'),
                meta: {
                  title: '成员管理',
                  keepAlive: false,
                  requiresAuth: true
                }
              }
            ]
          },
          {
            path: 'merchants',
            name: 'merchants',
            component: () => import('@/views/manager/basis/Merchants'),
            meta: {
              title: '招商人员管理',
              keepAlive: false,
              requiresAuth: true
            }
          },
          {
            path: 'buildings',
            name: 'buildings',
            component: () => import('@/views/manager/basis/Buildings'),
            meta: {
              title: '楼栋管理',
              keepAlive: false,
              requiresAuth: true
            }
          },
          {
            path: 'housing-resources',
            name: 'housingResources',
            component: () => import('@/views/manager/basis/HousingResources'),
            meta: {
              title: '房源管理',
              keepAlive: false,
              requiresAuth: true
            }
          }
        ]
      },
      {
        path: 'park-supervision',
        component: TGRouterView,
        redirect: { name: 'parks' },
        meta: {
          title: '中心监管',
          keepAlive: false,
          requiresAuth: true,
          icon: () => import('@/layouts/components/TGMenu/assets/images/parkSupervision.svg')
        },
        children: [
          {
            path: 'parks',
            name: 'parks',
            component: () => import('@/views/manager/parkSupervision/Parks'),
            meta: {
              title: '中心管理',
              keepAlive: false,
              requiresAuth: true,
              hideChildren: true
            }
          },
          {
            path: 'units',
            name: 'units',
            component: () => import('@/views/manager/parkSupervision/Units'),
            meta: {
              title: '单位管理',
              keepAlive: false,
              requiresAuth: true
            }
          },
          {
            path: 'account-opening',
            name: 'accountOpening',
            component: () => import('@/views/manager/parkSupervision/AccountOpening'),
            meta: {
              title: '账号开通审核',
              keepAlive: false,
              requiresAuth: true
            }
          },
          {
            path: 'park-info',
            name: 'parkInfo',
            component: () => import('@/views/manager/parkSupervision/ParkInfo'),
            meta: {
              title: '中心信息管理',
              keepAlive: false,
              requiresAuth: true
            }
          },
          {
            path: 'apply-account',
            name: 'applyAccount',
            component: () => import('@/views/manager/parkSupervision/ApplyAccount'),
            meta: {
              title: '账号开通申请',
              keepAlive: false,
              requiresAuth: true
            }
          },
          {
            path: 'park-account',
            name: 'parkAccount',
            component: () => import('@/views/manager/parkSupervision/ParkAccount'),
            meta: {
              title: '中心账号管理',
              keepAlive: false,
              requiresAuth: true
            }
          }
        ]
      },
      {
        path: 'park-investment',
        component: TGRouterView,
        redirect: { name: 'clues' },
        meta: {
          title: '中心招商',
          keepAlive: false,
          requiresAuth: true,
          icon: () => import('@/layouts/components/TGMenu/assets/images/parkInvestment.svg')
        },
        children: [
          {
            path: 'clues',
            name: 'clues',
            component: () => import('@/views/manager/parkInvestment/Clues'),
            meta: {
              title: '线索管理',
              keepAlive: false,
              requiresAuth: true
            }
          },
          {
            path: 'task-statistics',
            name: 'taskStatistics',
            component: () => import('@/views/manager/parkInvestment/TaskStatistics'),
            meta: {
              title: '任务统计',
              keepAlive: false,
              requiresAuth: true
            }
          },
          // {
          //   path: 'venue-reservation',
          //   name: 'venueReservation',
          //   component: () => import('@/views/manager/parkInvestment/VenueReservation'),
          //   meta: {
          //     title: '场地预定',
          //     keepAlive: false,
          //     requiresAuth: true
          //   }
          // },
          {
            path: 'my-clues',
            name: 'myClues',
            component: () => import('@/views/manager/parkInvestment/MyClues'),
            meta: {
              title: '我的线索',
              keepAlive: false,
              requiresAuth: true
            }
          },
          {
            path: 'my-contracts',
            name: 'myContracts',
            component: () => import('@/views/manager/parkInvestment/MyContracts'),
            meta: {
              title: '我的签约',
              keepAlive: false,
              requiresAuth: true
            }
          },
          {
            path: 'renewal-application',
            name: 'renewalApplication',
            component: () => import('@/views/manager/parkInvestment/RenewalApplication'),
            meta: {
              title: '企业续约申请',
              keepAlive: false,
              requiresAuth: true
            }
          }
        ]
      },
      {
        path: 'contract-management',
        component: TGRouterView,
        redirect: { name: 'contractReview' },
        meta: {
          title: '签约管理',
          keepAlive: false,
          requiresAuth: true,
          icon: () => import('@/layouts/components/TGMenu/assets/images/contractManagement.svg')
        },
        children: [
          {
            path: 'contract-review',
            component: TGRouterView,
            meta: {
              title: '签约审核',
              keepAlive: false,
              requiresAuth: true,
              hideChildren: true
            },
            children: [
              {
                path: '',
                name: 'contractReview',
                component: () => import('@/views/manager/contractManagement/ContractReview'),
                meta: {
                  title: '签约审核',
                  keepAlive: false,
                  requiresAuth: true
                }
              },
              {
                path: 'contract-review-details',
                component: () => import('@/layouts/components/BNContainerWithBusinesses'),
                meta: {
                  title: '详情',
                  keepAlive: false,
                  requiresAuth: true
                },
                children: [
                  {
                    path: '',
                    name: 'contractReviewDetails',
                    component: () =>
                      import('@/views/manager/contractManagement/ContractReview/components/ContractReviewDetails'),
                    meta: {
                      title: '签约详情',
                      keepAlive: false,
                      requiresAuth: true
                    }
                  }
                ]
              }
            ]
          },
          {
            path: 'contract-history',
            component: TGRouterView,
            meta: {
              title: '签约历史',
              keepAlive: false,
              requiresAuth: true,
              hideChildren: true
            },
            children: [
              {
                path: '',
                name: 'contractHistory',
                component: () => import('@/views/manager/contractManagement/ContractHistory'),
                meta: {
                  title: '签约历史',
                  keepAlive: false,
                  requiresAuth: true
                }
              },
              {
                path: 'contract-history-details',
                name: 'contractHistoryDetails',
                component: () => import('@/views/manager/basis/Businesses/Details'),
                meta: {
                  title: '签约详情',
                  keepAlive: false,
                  requiresAuth: true
                }
              }
            ]
          },
          {
            path: 'business-configuration',
            name: 'businessConfiguration',
            component: () => import('@/views/manager/contractManagement/BusinessConfiguration'),
            meta: {
              title: '签约业务配置',
              keepAlive: false,
              requiresAuth: true
            }
          },
          {
            path: 'signing-process',
            name: 'signingProcess',
            component: () => import('@/views/manager/SigningProcess'),
            meta: {
              title: '签约',
              keepAlive: false,
              requiresAuth: true,
              hide: true
            }
          },
          {
            path: 're-sign',
            name: 'reSign',
            redirect: { name: 'signingProcess' },
            component: () => import('@/views/manager/SigningProcess'),
            meta: {
              title: '签约',
              keepAlive: false,
              requiresAuth: true,
              hide: true
            }
          }
        ]
      },
      {
        path: 'questionnaire',
        component: TGRouterView,
        redirect: { name: 'questionnaires' },
        meta: {
          title: '调查问卷',
          keepAlive: false,
          requiresAuth: true,
          icon: () => import('@/layouts/components/TGMenu/assets/images/questionnaire.svg')
        },
        children: [
          {
            path: 'questionnaires',
            name: 'questionnaires',
            component: () => import('@/views/manager/questionnaire/Questionnaires'),
            meta: {
              title: '问卷管理',
              keepAlive: false,
              requiresAuth: true
            }
          },
          {
            path: 'questionnaire-records',
            name: 'questionnaireRecords',
            component: () => import('@/views/manager/questionnaire/QuestionnaireRecords'),
            meta: {
              title: '问卷记录',
              keepAlive: false,
              requiresAuth: true
            }
          },
          {
            path: 'questionnaire-statistics',
            name: 'questionnaireStatistics',
            component: () => import('@/views/manager/questionnaire/QuestionnaireStatistics'),
            meta: {
              title: '问卷统计',
              keepAlive: false,
              requiresAuth: true
            }
          },
          {
            path: 'questionnaire-templates',
            name: 'questionnaireTemplates',
            component: () => import('@/views/manager/questionnaire/QuestionnaireTemplates'),
            meta: {
              title: '问卷模版管理',
              keepAlive: false,
              requiresAuth: true
            }
          }
        ]
      },
      {
        path: 'discounts',
        component: TGRouterView,
        redirect: { name: 'discountsPolicy' },
        meta: {
          title: '优惠管理',
          keepAlive: false,
          requiresAuth: true,
          icon: () => import('@/layouts/components/TGMenu/assets/images/discountsLock.svg')
        },
        children: [
          {
            path: 'policy',
            name: 'discountsPolicy',
            component: () => import('@/views/manager/discount/policy'),
            meta: {
              title: '优惠政策',
              keepAlive: false,
              requiresAuth: true
            }
          },
          {
            path: 'record',
            name: 'discountsRecord',
            component: () => import('@/views/manager/discount/record'),
            meta: {
              title: '优惠记录',
              keepAlive: false,
              requiresAuth: true
            }
          },
          {
            path: 'verify',
            name: 'discountsVerify',
            component: () => import('@/views/manager/discount/verify'),
            meta: {
              title: '优惠政策审核',
              keepAlive: false,
              requiresAuth: true
            }
          }
        ]
      },
      {
        path: 'finance',
        component: TGRouterView,
        redirect: { name: 'validContracts' },
        meta: {
          title: '财务管理',
          keepAlive: false,
          requiresAuth: true,
          icon: () => import('@/layouts/components/TGMenu/assets/images/financialManagement.svg')
        },
        children: [
          {
            path: 'valid-contracts',
            name: 'validContracts',
            component: () => import('@/views/manager/finance/ValidContracts'),
            meta: {
              title: '合同管理',
              keepAlive: false,
              requiresAuth: true
            }
          },
          {
            path: 'earnest-money',
            name: 'earnestMoney',
            component: () => import('@/views/manager/finance/EarnestMoney'),
            meta: {
              title: '保证金查询',
              keepAlive: false,
              requiresAuth: true
            }
          },
          {
            path: 'rents',
            name: 'rents',
            component: () => import('@/views/manager/finance/Rents'),
            meta: {
              title: '租金管理',
              keepAlive: false,
              requiresAuth: true
            }
          },
          {
            path: 'property-costs',
            name: 'propertyCosts',
            component: () => import('@/views/manager/finance/PropertyCosts'),
            meta: {
              title: '物业费管理',
              keepAlive: false,
              requiresAuth: true
            }
          },
          {
            path: 'utilities',
            name: 'utilities',
            component: () => import('@/views/manager/finance/Utilities'),
            meta: {
              title: '水电费管理',
              keepAlive: false,
              requiresAuth: true
            }
          },
          {
            path: 'fee-payment-report',
            name: 'feePaymentReport',
            component: () => import('@/views/manager/finance/FeePaymentReport'),
            meta: {
              title: '缴费记录',
              keepAlive: false,
              requiresAuth: true
            }
          }
        ]
      },
      // {
      //   path: 'content-release',
      //   component: TGRouterView,
      //   meta: {
      //     title: '内容发布',
      //     keepAlive: false,
      //     requiresAuth: true,
      //     icon: () => import('@/layouts/components/TGMenu/assets/images/contentRelease.svg')
      //   }
      // },
      // {
      //   path: 'suggestions',
      //   component: TGRouterView,
      //   meta: {
      //     title: '投诉/建议管理',
      //     keepAlive: false,
      //     requiresAuth: true,
      //     icon: () => import('@/layouts/components/TGMenu/assets/images/suggestions.svg')
      //   }
      // },
      {
        path: 'rescind-contract',
        component: TGRouterView,
        redirect: { name: 'contracts' },
        meta: {
          title: '解约管理',
          keepAlive: false,
          requiresAuth: true,
          icon: () => import('@/layouts/components/TGMenu/assets/images/cancellationManagement.svg')
        },
        children: [
          {
            path: 'contracts',
            name: 'contracts',
            component: () => import('@/views/manager/rescindContract/Contracts'),
            meta: {
              title: '合同查询',
              keepAlive: false,
              requiresAuth: true
            }
          },
          {
            path: 'application-records',
            name: 'applicationRecords',
            component: () => import('@/views/manager/rescindContract/ApplicationRecords'),
            meta: {
              title: '解约记录',
              keepAlive: false,
              requiresAuth: true
            }
          },
          {
            path: 'cancellation-review-from-park',
            name: 'cancellationReviewFromPark',
            component: () => import('@/views/manager/rescindContract/CancellationReviewFromPark'),
            meta: {
              title: '解约审核',
              keepAlive: false,
              requiresAuth: true
            }
          },
          {
            path: 'cancellation-review-from-finance',
            name: 'cancellationReviewFromFinance',
            component: () => import('@/views/manager/rescindContract/CancellationReviewFromFinance'),
            meta: {
              title: '解约审核',
              keepAlive: false,
              requiresAuth: true
            }
          },
          {
            path: 'operational-business-conf',
            name: 'operationalBusinessConf',
            component: TGRouterView,
            meta: {
              title: '运营业务配置',
              keepAlive: false,
              requiresAuth: true
            }
          }
        ]
      },
      {
        path: 'annual-assessment',
        component: TGRouterView,
        redirect: { name: 'indicatorCategories' },
        meta: {
          title: '企业年度考核',
          keepAlive: false,
          requiresAuth: true,
          icon: () => import('@/layouts/components/TGMenu/assets/images/enterpriseAnnualAssessment.svg')
        },
        children: [
          {
            path: 'indicator-categories',
            name: 'indicatorCategories',
            component: () => import('@/views/manager/annualAssessment/IndicatorCategories'),
            meta: {
              title: '指标类别管理',
              keepAlive: false,
              requiresAuth: true
            }
          },
          {
            path: 'indicators',
            name: 'indicators',
            component: () => import('@/views/manager/annualAssessment/Indicators'),
            meta: {
              title: '指标管理',
              keepAlive: false,
              requiresAuth: true
            }
          },
          {
            path: 'report-audit',
            name: 'reportAudit',
            component: () => import('@/views/manager/annualAssessment/ReportAudit'),
            meta: {
              title: '报表审核',
              keepAlive: false,
              requiresAuth: true
            }
          }
        ]
      },
      // {
      //   path: 'conf-room-mana',
      //   component: TGRouterView,
      //   meta: {
      //     title: '会议室管理',
      //     keepAlive: false,
      //     requiresAuth: true,
      //     icon: () => import('@/layouts/components/TGMenu/assets/images/conferenceRoomManagement.svg')
      //   }
      // },
      // {
      //   path: 'work-order-mana',
      //   component: TGRouterView,
      //   meta: {
      //     title: '工单管理',
      //     keepAlive: false,
      //     requiresAuth: true,
      //     icon: () => import('@/layouts/components/TGMenu/assets/images/workOrderManagement.svg')
      //   }
      // },
      {
        path: 'data-collection',
        component: TGRouterView,
        redirect: { name: 'reportForms' },
        meta: {
          title: '数据采集',
          keepAlive: false,
          requiresAuth: true,
          icon: () => import('@/layouts/components/TGMenu/assets/images/dataCollection.svg')
        },
        children: [
          {
            path: 'data-collection-templates',
            name: 'dataCollectionTemplates',
            component: () => import('@/views/manager/dataCollection/DataCollectionTemplates'),
            meta: {
              title: '模版管理',
              keepAlive: false,
              requiresAuth: true
            }
          },
          {
            path: 'report-forms',
            name: 'reportForms',
            component: () => import('@/views/manager/dataCollection/ReportForms'),
            meta: {
              title: '报表管理',
              keepAlive: false,
              requiresAuth: true
            }
          },
          {
            path: 'my-reports',
            redirect: { name: 'myReports' },
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
                name: 'myReports',
                component: () => import('@/views/manager/dataCollection/MyReports'),
                meta: {
                  title: '我的报表',
                  keepAlive: false,
                  requiresAuth: true,
                  hideChildren: true
                }
              },
              {
                path: 'fill-out-report',
                name: 'fillOutReport',
                component: () => import('@/views/manager/dataCollection/MyReports/FillOutReport'),
                meta: {
                  title: '立即填报',
                  keepAlive: false,
                  requiresAuth: true
                }
              },
              {
                path: 'fill-in-records',
                name: 'fillInRecords',
                component: () => import('@/views/manager/dataCollection/MyReports/FillInRecords'),
                meta: {
                  title: '填报记录',
                  keepAlive: false,
                  requiresAuth: true
                }
              }
            ]
          }
        ]
      },
      {
        path: 'system',
        component: TGRouterView,
        redirect: { name: 'systemMenu' },
        meta: {
          title: '系统管理',
          keepAlive: true,
          requiresAuth: true,
          icon: () => import('@/layouts/components/TGMenu/assets/images/systemManagement.svg')
        },
        children: [
          {
            path: 'menu',
            name: 'systemMenu',
            component: () => import('@/views/manager/system/menu'),
            meta: {
              title: '菜单管理',
              keepAlive: true,
              requiresAuth: true
            }
          },
          {
            path: 'function',
            name: 'systemFunction',
            component: () => import('@/views/manager/system/function'),
            meta: {
              title: '功能管理',
              keepAlive: true,
              requiresAuth: true
            }
          },
          {
            path: 'role',
            name: 'systemRole',
            component: () => import('@/views/manager/system/role'),
            meta: {
              title: '角色管理',
              keepAlive: true,
              requiresAuth: true
            }
          },
          {
            path: 'user',
            name: 'systemUser',
            component: () => import('@/views/manager/system/user'),
            meta: {
              title: '员工管理',
              keepAlive: true,
              requiresAuth: true
            }
          }
        ]
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

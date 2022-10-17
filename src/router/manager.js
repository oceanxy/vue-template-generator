import Vue from 'vue'
import VueRouter from 'vue-router'
import config from '@/config'
import { cloneDeep } from 'lodash'
import TGRouterView from '@/layouts/components/TGRouterView'

Vue.use(VueRouter)

/**
 * 创建静态路由
 * @returns {Array}
 */
function createConstRoutes() {
  const routes = [
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
    {
      path: '/',
      name: 'home',
      // 选择布局组件
      component: () => import('@/layouts/TGBackendSystem'),
      redirect: { name: 'console' },
      meta: {
        title: '后台',
        keepAlive: false,
        requiresAuth: true,
        icon: () => import('@/layouts/components/TGMenu/assets/images/console')
      },
      children: [
        {
          path: '',
          name: 'console',
          component: () => import('@/views/manager/Home'),
          meta: {
            title: '控制台',
            keepAlive: false,
            requiresAuth: true,
            hideBreadCrumb: true
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

  // mock模式下不采用动态路由，正常开发时也应更新本路由表，与服务端返回的动态路由对应
  if (config.mock) {
    routes.splice(1, 1, {
      path: '/',
      name: 'home',
      // 选择布局组件
      component: () => import('@/layouts/TGBackendSystem'),
      redirect: { name: 'parkStatus' },
      meta: {
        title: '后台',
        keepAlive: false,
        requiresAuth: true,
        icon: () => import('@/layouts/components/TGMenu/assets/images/console')
      },
      children: [
        // 需要展示在menu菜单中的路由在这里面添加
        {
          path: 'park-status',
          name: 'parkStatus',
          component: () => import('@/views/manager/ParkStatus'),
          meta: {
            title: '中心状态',
            keepAlive: false,
            requiresAuth: true,
            hideBreadCrumb: true,
            icon: () => import('@/layouts/components/TGMenu/assets/images/parkStatus')
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
                    title: '团队成员管理',
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
            icon: () => import('@/layouts/components/TGMenu/assets/images/parkSupervision')
          },
          children: [
            {
              path: 'parks',
              name: 'parks',
              component: () => import('@/views/manager/parkSupervision/Parks'),
              meta: {
                title: '中心管理',
                keepAlive: false,
                requiresAuth: true
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
            icon: () => import('@/layouts/components/TGMenu/assets/images/parkInvestment')
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
            icon: () => import('@/layouts/components/TGMenu/assets/images/contractManagement')
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
                  component: () => import('@/layouts/components/BNContainerWithBusinesses'),
                  meta: {
                    title: '详情',
                    keepAlive: false,
                    requiresAuth: true
                  },
                  children: [
                    {
                      path: '',
                      name: 'contractHistoryDetails',
                      component: () =>
                        import('@/views/manager/contractManagement/ContractReview/components/ContractReviewDetails'),
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
              path: 'business-configuration',
              name: 'businessConfiguration',
              component: () => import('@/views/manager/contractManagement/BusinessConfiguration'),
              meta: {
                title: '签约业务配置',
                keepAlive: false,
                requiresAuth: true
              }
            }
          ]
        },
        {
          path: 'signing-process',
          component: () => TGRouterView,
          redirect: { name: 'signingProcess' },
          meta: {
            title: '签约',
            keepAlive: false,
            requiresAuth: true,
            hide: true
          },
          children: [
            {
              path: '',
              name: 'signingProcess',
              component: () => import('@/views/manager/SigningProcess'),
              meta: {
                title: '签约',
                keepAlive: false,
                requiresAuth: true
              }
            },
            {
              path: 're-sign',
              name: 'reSign',
              redirect: { name: 'signingProcess' },
              component: () => import('@/views/manager/SigningProcess'),
              meta: {
                title: '重新签约',
                keepAlive: false,
                requiresAuth: true
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
            icon: () => import('@/layouts/components/TGMenu/assets/images/questionnaire')
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
            }
            // {
            //   path: 'questionnaire-templates',
            //   name: 'questionnaireTemplates',
            //   component: () => import('@/views/manager/questionnaire/QuestionnaireTemplates'),
            //   meta: {
            //     title: '问卷模版管理',
            //     keepAlive: false,
            //     requiresAuth: true
            //   }
            // }
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
            icon: () => import('@/layouts/components/TGMenu/assets/images/discountsLock')
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
            title: '费用缴纳',
            keepAlive: false,
            requiresAuth: true,
            icon: () => import('@/layouts/components/TGMenu/assets/images/financialManagement')
          },
          children: [
            {
              path: 'valid-contracts',
              component: TGRouterView,
              meta: {
                title: '合同管理',
                keepAlive: false,
                requiresAuth: true,
                hideChildren: true
              },
              children: [
                {
                  path: '',
                  name: 'validContracts',
                  component: () => import('@/views/manager/finance/ValidContracts'),
                  meta: {
                    title: '合同管理',
                    keepAlive: false,
                    requiresAuth: true
                  }
                },
                {
                  path: 'valid-contract-details',
                  component: () => import('@/layouts/components/BNContainerWithBusinesses'),
                  meta: {
                    title: '签约详情',
                    keepAlive: false,
                    requiresAuth: true
                  },
                  children: [
                    {
                      path: '',
                      name: 'validContractDetails',
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
            },
            {
              path: 'invoices',
              name: 'invoices',
              component: () => import('@/views/manager/finance/Invoices'),
              meta: {
                title: '发票管理',
                keepAlive: false,
                requiresAuth: true
              }
            },
            {
              path: 'invoice-statistics',
              name: 'invoiceStatistics',
              component: () => import('@/views/manager/finance/InvoiceStatistics'),
              meta: {
                title: '开票统计',
                keepAlive: false,
                requiresAuth: true
              }
            },
            {
              path: 'billing-statistics',
              name: 'billingStatistics',
              component: () => import('@/views/manager/finance/BillingStatistics'),
              meta: {
                title: '账单统计',
                keepAlive: false,
                requiresAuth: true
              }
            },
            {
              path: 'financial-conf',
              name: 'financialConf',
              component: () => import('@/views/manager/finance/FinancialConf'),
              meta: {
                title: '财务配置',
                keepAlive: false,
                requiresAuth: true
              }
            }
          ]
        },
        {
          path: 'content-release',
          component: TGRouterView,
          redirect: { name: 'informationTypes' },
          meta: {
            title: '内容发布',
            keepAlive: false,
            requiresAuth: true,
            icon: () => import('@/layouts/components/TGMenu/assets/images/contentRelease')
          },
          children: [
            {
              path: 'notices',
              name: 'notices',
              component: () => import('@/views/manager/contentRelease/Notices'),
              meta: {
                title: '通知公告',
                keepAlive: false,
                requiresAuth: true
              }
            },
            {
              path: 'activities',
              name: 'activities',
              component: () => import('@/views/manager/contentRelease/Activities'),
              meta: {
                title: '活动管理',
                keepAlive: false,
                requiresAuth: true
              }
            },
            {
              path: 'information-types',
              name: 'informationTypes',
              component: () => import('@/views/manager/contentRelease/InformationTypes'),
              meta: {
                title: '资讯类别管理',
                keepAlive: false,
                requiresAuth: true
              }
            },
            {
              path: 'information',
              name: 'information',
              component: () => import('@/views/manager/contentRelease/Information'),
              meta: {
                title: '资讯管理',
                keepAlive: false,
                requiresAuth: true
              }
            },
            {
              path: 'post-information',
              name: 'postInformation',
              component: () => import('@/views/manager/contentRelease/PostInformation'),
              meta: {
                title: '发布资讯',
                keepAlive: false,
                requiresAuth: true
              }
            },
            {
              path: 'unit-information',
              name: 'unitInformation',
              component: () => import('@/views/manager/contentRelease/UnitInformation'),
              meta: {
                title: '单位信息管理',
                keepAlive: false,
                requiresAuth: true
              }
            }
          ]
        },
        {
          path: 'suggestions',
          component: TGRouterView,
          redirect: { name: 'suggestionPersonnel' },
          meta: {
            title: '投诉/建议管理',
            keepAlive: false,
            requiresAuth: true,
            icon: () => import('@/layouts/components/TGMenu/assets/images/suggestions')
          },
          children: [
            {
              path: 'suggestion-personnel',
              name: 'suggestionPersonnel',
              component: () => import('@/views/manager/suggestions/Personnel'),
              meta: {
                title: '人员管理',
                keepAlive: false,
                requiresAuth: true
              }
            },
            {
              path: 'complaint-registration',
              name: 'complaintRegistration',
              component: () => import('@/views/manager/suggestions/Registration'),
              meta: {
                title: '投诉登记',
                keepAlive: false,
                requiresAuth: true
              }
            },
            {
              path: 'assign-complaints',
              name: 'assignComplaints',
              component: () => import('@/views/manager/suggestions/AssignComplaints'),
              meta: {
                title: '投诉分配',
                keepAlive: false,
                requiresAuth: true
              }
            },
            {
              path: 'business-requirements',
              name: 'businessRequirements',
              component: () => import('@/views/manager/suggestions/BusinessRequirements'),
              meta: {
                title: '企业需求',
                keepAlive: false,
                requiresAuth: true
              }
            },
            {
              path: 'handling-complaints',
              name: 'handlingComplaints',
              component: () => import('@/views/manager/suggestions/HandlingComplaints'),
              meta: {
                title: '投诉处理',
                keepAlive: false,
                requiresAuth: true
              }
            },
            {
              path: 'complaint-statistics',
              name: 'complaintStatistics',
              component: () => import('@/views/manager/suggestions/ComplaintStatistics'),
              meta: {
                title: '投诉统计',
                keepAlive: false,
                requiresAuth: true
              }
            },
            {
              path: 'dispatch-rule-conf',
              name: 'dispatchRuleConf',
              component: () => import('@/views/manager/suggestions/DispatchRuleConf'),
              meta: {
                title: '派单规则配置',
                keepAlive: false,
                requiresAuth: true
              }
            }
          ]
        },
        {
          path: 'rescind-contract',
          component: TGRouterView,
          redirect: { name: 'contracts' },
          meta: {
            title: '解约管理',
            keepAlive: false,
            requiresAuth: true,
            icon: () => import('@/layouts/components/TGMenu/assets/images/cancellationManagement')
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
                title: '中心审核',
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
            icon: () => import('@/layouts/components/TGMenu/assets/images/enterpriseAnnualAssessment')
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
            },
            {
              path: 'score-statistics',
              name: 'scoreStatistics',
              component: () => import('@/views/manager/annualAssessment/ScoreStatistics'),
              meta: {
                title: '考核分数统计',
                keepAlive: false,
                requiresAuth: true
              }
            },
            {
              path: 'indicator-statistics',
              name: 'indicatorStatistics',
              component: () => import('@/views/manager/annualAssessment/IndicatorStatistics'),
              meta: {
                title: '考核指标统计',
                keepAlive: false,
                requiresAuth: true
              }
            }
          ]
        },
        {
          path: 'conference-room',
          component: TGRouterView,
          redirect: { name: 'conferenceRooms' },
          meta: {
            title: '会议室管理',
            keepAlive: false,
            requiresAuth: true,
            icon: () => import('@/layouts/components/TGMenu/assets/images/conferenceRoomManagement')
          },
          children: [
            {
              path: 'conference-rooms',
              name: 'conferenceRooms',
              component: () => import('@/views/manager/conferenceRoom/ConferenceRooms'),
              meta: {
                title: '会议室管理',
                keepAlive: false,
                requiresAuth: true
              }
            },
            {
              path: 'subscribe',
              name: 'conferenceRoomSubscribe',
              component: () => import('@/views/manager/conferenceRoom/Subscribe'),
              meta: {
                title: '会议室预约',
                keepAlive: false,
                requiresAuth: true
              }
            },
            {
              path: 'statistics',
              name: 'conferenceRoomStatistics',
              component: () => import('@/views/manager/conferenceRoom/Statistics'),
              meta: {
                title: '使用统计',
                keepAlive: false,
                requiresAuth: true
              }
            }
          ]
        },
        {
          path: 'work-orders',
          component: TGRouterView,
          meta: {
            title: '工单管理',
            keepAlive: false,
            requiresAuth: true,
            icon: () => import('@/layouts/components/TGMenu/assets/images/workOrderManagement')
          },
          children: [
            {
              path: 'work-order-user',
              name: 'workOrderUser',
              component: () => import('@/views/manager/workOrders/User'),
              meta: {
                title: '人员管理',
                keepAlive: false,
                requiresAuth: true
              }
            },
            {
              path: 'work-order-manage',
              name: 'workOrderManage',
              component: () => import('@/views/manager/workOrders/Manage'),
              meta: {
                title: '工单管理',
                keepAlive: false,
                requiresAuth: true
              }
            },
            {
              path: 'work-order-take',
              name: 'workOrderTake',
              component: () => import('@/views/manager/workOrders/TakeOrder'),
              meta: {
                title: '接单管理',
                keepAlive: false,
                requiresAuth: true
              }
            },
            {
              path: 'work-order-statistics',
              name: 'workOrderStatistics',
              component: () => import('@/views/manager/workOrders/Statistics'),
              meta: {
                title: '接单统计',
                keepAlive: false,
                requiresAuth: true
              }
            }
          ]
        },
        {
          path: 'data-collection',
          component: TGRouterView,
          redirect: { name: 'reportForms' },
          meta: {
            title: '数据采集',
            keepAlive: false,
            requiresAuth: true,
            icon: () => import('@/layouts/components/TGMenu/assets/images/dataCollection')
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
                    requiresAuth: true
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
            },
            {
              path: 'unit-report-details',
              name: 'unitReportDetails',
              component: () => import('@/views/manager/dataCollection/UnitReportDetails'),
              meta: {
                title: '监管单位报表明细',
                keepAlive: false,
                requiresAuth: true
              }
            },
            {
              path: 'unreported-units',
              name: 'unreportedUnits',
              component: () => import('@/views/manager/dataCollection/UnreportedUnits'),
              meta: {
                title: '未填报监管单位名单',
                keepAlive: false,
                requiresAuth: true
              }
            },
            {
              path: 'park-report-details',
              name: 'parkReportDetails',
              component: () => import('@/views/manager/dataCollection/ParkReportDetails'),
              meta: {
                title: '园区报表明细',
                keepAlive: false,
                requiresAuth: true
              }
            },
            {
              path: 'unreported-parks',
              name: 'unreportedParks',
              component: () => import('@/views/manager/dataCollection/UnreportedParks'),
              meta: {
                title: '未填报园区名单',
                keepAlive: false,
                requiresAuth: true
              }
            },
            {
              path: 'enterprise-report-details',
              name: 'enterpriseReportDetails',
              component: () => import('@/views/manager/dataCollection/EnterpriseReportDetails'),
              meta: {
                title: '企业报表明细',
                keepAlive: false,
                requiresAuth: true
              }
            },
            {
              path: 'unreported-enterprises',
              name: 'unreportedEnterprises',
              component: () => import('@/views/manager/dataCollection/UnreportedEnterprises'),
              meta: {
                title: '未填报企业名单',
                keepAlive: false,
                requiresAuth: true
              }
            }
          ]
        },
        {
          path: 'system',
          component: TGRouterView,
          redirect: { name: 'systemMenus' },
          meta: {
            title: '系统管理',
            keepAlive: false,
            requiresAuth: true,
            icon: () => import('@/layouts/components/TGMenu/assets/images/systemManagement')
          },
          children: [
            {
              path: 'menus',
              name: 'systemMenus',
              component: () => import('@/views/manager/system/Menus'),
              meta: {
                title: '菜单管理',
                keepAlive: false,
                requiresAuth: true
              }
            },
            {
              path: 'xcxUser',
              name: 'systemXcxUser',
              component: () => import('@/views/manager/system/XcxUser'),
              meta: {
                title: '小程序用户管理',
                keepAlive: false,
                requiresAuth: true
              }
            },
            {
              path: 'functions',
              name: 'systemFunctions',
              component: () => import('@/views/manager/system/Functions'),
              meta: {
                title: '功能管理',
                keepAlive: false,
                requiresAuth: true
              }
            },
            {
              path: 'roles',
              name: 'systemRoles',
              component: () => import('@/views/manager/system/Roles'),
              meta: {
                title: '角色管理',
                keepAlive: false,
                requiresAuth: true
              }
            },
            {
              path: 'users',
              name: 'systemUsers',
              component: () => import('@/views/manager/system/Users'),
              meta: {
                title: '员工管理',
                keepAlive: false,
                requiresAuth: true
              }
            }
          ]
        }
      ]
    })
  }

  return routes
}

export const constRoutes = createConstRoutes()

export const createRouter = routes => {
  const r = cloneDeep(constRoutes)

  if (routes) {
    r.splice(1, 0, routes)
  }

  return new VueRouter({
    routes: r,
    base: process.env.VUE_APP_PUBLIC_PATH,
    mode: 'history'
  })
}

const router = createRouter()

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
      next({ name: 'home' })
    } else {
      next()
    }
  }
})

export default router

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
      meta: {
        title: '后台',
        keepAlive: false,
        requiresAuth: true,
        icon: () => import('@/layouts/components/TGMenu/assets/images/console.svg')
      },
      children: []
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

  // 正常开发时应更新本路由表，与服务端返回的动态路由对应
  if (!config.dynamicRouting) {
    routes.splice(1, 1, {
      path: '/',
      name: 'home',
      // 选择布局组件
      component: () => import('@/layouts/TGBackendSystem'),
      redirect: { name: 'console' },
      meta: {
        title: '后台',
        keepAlive: false,
        requiresAuth: true,
        icon: () => import('@/layouts/components/TGMenu/assets/images/console.svg')
      },
      children: [
        // 需要展示在menu菜单中的路由在这里面添加
        {
          path: 'pe-console',
          name: 'console',
          component: () => import('@/views/manager/Console'),
          meta: {
            title: '控制台',
            keepAlive: false,
            requiresAuth: true,
            hideBreadCrumb: true,
            icon: () => import('@/layouts/components/TGMenu/assets/images/console.svg')
          }
        },
        {
          path: 'pe-data',
          component: TGRouterView,
          redirect: { name: 'peBasicData' },
          meta: {
            title: '体检数据',
            keepAlive: false,
            requiresAuth: true,
            icon: () => import('@/layouts/components/TGMenu/assets/images/pe-data.svg')
          },
          children: [
            {
              path: 'pe-basic-data',
              name: 'peBasicData',
              component: () => import('@/views/manager/physicalExaminationData/BasicData'),
              meta: {
                title: '体检基础数据',
                keepAlive: false,
                requiresAuth: true,
                icon: () => import('@/layouts/components/TGMenu/assets/images/pe-basic-data.svg')
              }
            },
            {
              path: 'height-and-weight-data',
              name: 'heightAndWeightData',
              component: () => import('@/views/manager/physicalExaminationData/HeightAndWeightData'),
              meta: {
                title: '身高体重数据',
                keepAlive: false,
                requiresAuth: true,
                icon: () => import('@/layouts/components/TGMenu/assets/images/height-and-weight-data.svg')
              }
            },
            {
              path: 'blood-pressure-data',
              name: 'bloodPressureData',
              component: () => import('@/views/manager/physicalExaminationData/BloodPressureData'),
              meta: {
                title: '血压数据',
                keepAlive: false,
                requiresAuth: true,
                icon: () => import('@/layouts/components/TGMenu/assets/images/blood-pressure-data.svg')
              }
            },
            {
              path: 'lung-function-data',
              name: 'lungFunctionData',
              component: () => import('@/views/manager/physicalExaminationData/LungFunctionData'),
              meta: {
                title: '肺功能数据',
                keepAlive: false,
                requiresAuth: true,
                icon: () => import('@/layouts/components/TGMenu/assets/images/lung-function-data.svg')
              }
            },
            {
              path: 'visual-data',
              name: 'visualData',
              component: () => import('@/views/manager/physicalExaminationData/VisualData'),
              meta: {
                title: '视力数据',
                keepAlive: false,
                requiresAuth: true,
                icon: () => import('@/layouts/components/TGMenu/assets/images/visual-data.svg')
              }
            },
            {
              path: 'optometry-data',
              name: 'optometryData',
              component: () => import('@/views/manager/physicalExaminationData/OptometryData'),
              meta: {
                title: '验光数据',
                keepAlive: false,
                requiresAuth: true,
                icon: () => import('@/layouts/components/TGMenu/assets/images/optometry-data.svg')
              }
            },
            {
              path: 'dental-caries-data',
              name: 'dentalCariesData',
              component: () => import('@/views/manager/physicalExaminationData/DentalCariesData'),
              meta: {
                title: '龋齿眼疾数据',
                keepAlive: false,
                requiresAuth: true,
                icon: () => import('@/layouts/components/TGMenu/assets/images/caries.svg')
              }
            },
            {
              path: 'internal-medicine-data',
              name: 'internalMedicineData',
              component: () => import('@/views/manager/physicalExaminationData/InternalMedicineData'),
              meta: {
                title: '内科数据',
                keepAlive: false,
                requiresAuth: true,
                icon: () => import('@/layouts/components/TGMenu/assets/images/internal-medicine-data.svg')
              }
            },
            {
              path: 'surgical-data',
              name: 'surgicalData',
              component: () => import('@/views/manager/physicalExaminationData/SurgicalData'),
              meta: {
                title: '外科数据',
                keepAlive: false,
                requiresAuth: true,
                icon: () => import('@/layouts/components/TGMenu/assets/images/surgical-data.svg')
              }
            },
            {
              path: 'p-e-progress',
              name: 'PEProgress',
              component: () => import('@/views/manager/physicalExaminationData/PEProgress'),
              meta: {
                title: '体检进度',
                keepAlive: false,
                requiresAuth: true,
                icon: () => import('@/layouts/components/TGMenu/assets/images/p-e-progress.svg')
              }
            }
          ]
        },
        {
          path: 'student-profile',
          component: TGRouterView,
          redirect: { name: 'schoolManagement' },
          meta: {
            title: '学生档案',
            keepAlive: false,
            requiresAuth: true,
            icon: () => import('@/layouts/components/TGMenu/assets/images/student-file.svg')
          },
          children: [
            {
              path: 'school-management',
              name: 'schoolManagement',
              component: () => import('@/views/manager/studentProfile/SchoolManagement'),
              meta: {
                title: '学校管理',
                keepAlive: false,
                requiresAuth: true,
                icon: () => import('@/layouts/components/TGMenu/assets/images/school-management.svg')
              }
            },
            {
              path: 'grade-management',
              name: 'gradeManagement',
              component: () => import('@/views/manager/studentProfile/GradeManagement'),
              meta: {
                title: '年级管理',
                keepAlive: false,
                requiresAuth: true,
                icon: () => import('@/layouts/components/TGMenu/assets/images/grade-management.svg')
              }
            },
            {
              path: 'student-management',
              name: 'studentManagement',
              component: () => import('@/views/manager/studentProfile/StudentManagement'),
              meta: {
                title: '学生管理',
                keepAlive: false,
                requiresAuth: true,
                icon: () => import('@/layouts/components/TGMenu/assets/images/student-management.svg')
              }
            },
            {
              path: 'generate-q-r-code',
              name: 'generateQRCode',
              component: () => import('@/views/manager/studentProfile/GenerateQRCode'),
              meta: {
                title: '生成二维码',
                keepAlive: false,
                requiresAuth: true,
                icon: () => import('@/layouts/components/TGMenu/assets/images/generate-q-r-code.svg')
              }
            },
            {
              path: 'setting-archive-data',
              name: 'settingArchiveData',
              component: () => import('@/views/manager/studentProfile/SettingArchiveData'),
              meta: {
                title: '设置存档数据',
                keepAlive: false,
                requiresAuth: true,
                icon: () => import('@/layouts/components/TGMenu/assets/images/setting-archive-data.svg')
              }
            }
          ]
        },
        {
          path: 'pe-conf',
          component: TGRouterView,
          redirect: { name: 'projectClassification' },
          meta: {
            title: '体检配置',
            keepAlive: false,
            requiresAuth: true,
            icon: () => import('@/layouts/components/TGMenu/assets/images/physical-conf.svg')
          },
          children: [
            {
              path: 'project-classification',
              name: 'projectClassification',
              component: () => import('@/views/manager/physicalExaminationConf/ProjectClassification'),
              meta: {
                title: '体检项目分类',
                keepAlive: false,
                requiresAuth: true,
                icon: () => import('@/layouts/components/TGMenu/assets/images/project-classification.svg')
              }
            },
            {
              path: 'project-management',
              name: 'projectManagement',
              component: () => import('@/views/manager/physicalExaminationConf/ProjectManagement'),
              meta: {
                title: '体检项目管理',
                keepAlive: false,
                requiresAuth: true,
                icon: () => import('@/layouts/components/TGMenu/assets/images/project-management.svg')
              }
            },
            {
              path: 'activity-management',
              name: 'activityManagement',
              component: () => import('@/views/manager/physicalExaminationConf/ActivityManagement'),
              meta: {
                title: '体检活动管理',
                keepAlive: false,
                requiresAuth: true,
                icon: () => import('@/layouts/components/TGMenu/assets/images/activity-management.svg')
              }
            },
            {
              path: 'conclusion-level',
              name: 'conclusionLevel',
              component: () => import('@/views/manager/physicalExaminationConf/ConclusionLevel'),
              meta: {
                title: '体检项目结论等级',
                keepAlive: false,
                requiresAuth: true,
                icon: () => import('@/layouts/components/TGMenu/assets/images/conclusion-level.svg')
              }
            },
            {
              path: 'device-management',
              name: 'deviceManagement',
              component: () => import('@/views/manager/physicalExaminationConf/DeviceManagement'),
              meta: {
                title: '体检设备管理',
                keepAlive: false,
                requiresAuth: true,
                icon: () => import('@/layouts/components/TGMenu/assets/images/device-management.svg')
              }
            },
            {
              path: 'alarm-rule-management',
              name: 'alarmRuleManagement',
              component: () => import('@/views/manager/physicalExaminationConf/AlarmRuleManagement'),
              meta: {
                title: '报警规则管理',
                keepAlive: false,
                requiresAuth: true,
                icon: () => import('@/layouts/components/TGMenu/assets/images/alarm-rule-management.svg')
              }
            }
          ]
        },
        {
          path: 'organizations',
          component: TGRouterView,
          redirect: { name: 'organizationManagement' },
          meta: {
            title: '组织机构',
            keepAlive: false,
            requiresAuth: true,
            icon: () => import('@/layouts/components/TGMenu/assets/images/organization.svg')
          },
          children: [
            {
              path: 'organization-management',
              name: 'organizationManagement',
              component: () => import('@/views/manager/organizations/OrganizationManagement'),
              meta: {
                title: '组织管理',
                keepAlive: false,
                requiresAuth: true,
                icon: () => import('@/layouts/components/TGMenu/assets/images/organization-management.svg')
              }
            },
            {
              path: 'staff-management',
              name: 'staffManagement',
              component: () => import('@/views/manager/organizations/StaffManagement'),
              meta: {
                title: '职员管理',
                keepAlive: false,
                requiresAuth: true,
                icon: () => import('@/layouts/components/TGMenu/assets/images/staff-management.svg')
              }
            }
          ]
        },
        {
          path: 'statistical-analysis',
          component: TGRouterView,
          redirect: { name: 'heightStatistics' },
          meta: {
            title: '统计分析',
            keepAlive: false,
            requiresAuth: true,
            icon: () => import('@/layouts/components/TGMenu/assets/images/statistic-analysis.svg')
          },
          children: [
            {
              path: 'height-statistics',
              name: 'heightStatistics',
              component: () => import('@/views/manager/statisticalAnalysis/HeightStatistics'),
              meta: {
                title: '身高统计',
                keepAlive: false,
                requiresAuth: true,
                icon: () => import('@/layouts/components/TGMenu/assets/images/height-statistics.svg')
              }
            },
            {
              path: 'blood-pressure-statistics',
              name: 'bloodPressureStatistics',
              component: () => import('@/views/manager/statisticalAnalysis/BloodPressureStatistics'),
              meta: {
                title: '血压统计',
                keepAlive: false,
                requiresAuth: true,
                icon: () => import('@/layouts/components/TGMenu/assets/images/blood-pressure-statistics.svg')
              }
            },
            {
              path: 'vision-statistics',
              name: 'visionStatistics',
              component: () => import('@/views/manager/statisticalAnalysis/VisionStatistics'),
              meta: {
                title: '视力统计',
                keepAlive: false,
                requiresAuth: true,
                icon: () => import('@/layouts/components/TGMenu/assets/images/vision-statistics.svg')
              }
            },
            {
              path: 'vital-capacity-statistics',
              name: 'vitalCapacityStatistics',
              component: () => import('@/views/manager/statisticalAnalysis/VitalCapacityStatistics'),
              meta: {
                title: '肺活量统计',
                keepAlive: false,
                requiresAuth: true,
                icon: () => import('@/layouts/components/TGMenu/assets/images/vital-capacity-statistics.svg')
              }
            },
            {
              path: 'dental-caries-statistics',
              name: 'dentalCariesStatistics',
              component: () => import('@/views/manager/statisticalAnalysis/DentalCariesStatistics'),
              meta: {
                title: '龋齿统计',
                keepAlive: false,
                requiresAuth: true,
                icon: () => import('@/layouts/components/TGMenu/assets/images/dental-caries-statistics.svg')
              }
            },
            {
              path: 'disease-statistics',
              name: 'diseaseStatistics',
              component: () => import('@/views/manager/statisticalAnalysis/DiseaseStatistics'),
              meta: {
                title: '疾病统计',
                keepAlive: false,
                requiresAuth: true,
                icon: () => import('@/layouts/components/TGMenu/assets/images/disease-statistics.svg')
              }
            },
            {
              path: 'derived-index-statistics',
              name: 'derivedIndexStatistics',
              component: () => import('@/views/manager/statisticalAnalysis/DerivedIndexStatistics'),
              meta: {
                title: '派生指数统计',
                keepAlive: false,
                requiresAuth: true,
                icon: () => import('@/layouts/components/TGMenu/assets/images/derived-index-statistics.svg')
              }
            },
            {
              path: 'nutritional-status-statistics',
              name: 'nutritionalStatusStatistics',
              component: () => import('@/views/manager/statisticalAnalysis/NutritionalStatusStatistics'),
              meta: {
                title: '营养状况统计',
                keepAlive: false,
                requiresAuth: true,
                icon: () => import('@/layouts/components/TGMenu/assets/images/nutritional-status-statistics.svg')
              }
            },
            {
              path: 'activity-height-statistics-by-hierarchy',
              name: 'activityHeightStatisticsByHierarchy',
              component: () => import('@/views/manager/statisticalAnalysis/ActivityHeightStatisticsByHierarchy'),
              meta: {
                title: '活动身高按等级统计',
                keepAlive: false,
                requiresAuth: true,
                icon: () => import('@/layouts/components/TGMenu/assets/images/height-statistics.svg')
              }
            },
            {
              path: 'activity-height-statistics-by-grade',
              name: 'activityHeightStatisticsByGrade',
              component: () => import('@/views/manager/statisticalAnalysis/ActivityHeightStatisticsByGrade'),
              meta: {
                title: '活动身高按年级统计',
                keepAlive: false,
                requiresAuth: true,
                icon: () => import('@/layouts/components/TGMenu/assets/images/height-statistics.svg')
              }
            },
            {
              path: 'activity-bmi-statistics-by-hierarchy',
              name: 'activityBmiStatisticsByHierarchy',
              component: () => import('@/views/manager/statisticalAnalysis/ActivityBmiStatisticsByHierarchy'),
              meta: {
                title: '活动BMI按等级统计',
                keepAlive: false,
                requiresAuth: true,
                icon: () => import('@/layouts/components/TGMenu/assets/images/activity-bmi-level.svg')
              }
            },
            {
              path: 'activity-bmi-statistics-by-grade',
              name: 'activityBmiStatisticsByGrade',
              component: () => import('@/views/manager/statisticalAnalysis/ActivityBmiStatisticsByGrade'),
              meta: {
                title: '活动BMI按年级统计',
                keepAlive: false,
                requiresAuth: true,
                icon: () => import('@/layouts/components/TGMenu/assets/images/activity-bmi-level.svg')
              }
            },
            {
              path: 'activity-blood-pressure-statistics-by-hierarchy',
              name: 'activityBloodPressureStatisticsByHierarchy',
              component: () => import('@/views/manager/statisticalAnalysis/ActivityBloodPressureStatisticsByHierarchy'),
              meta: {
                title: '活动血压按等级统计',
                keepAlive: false,
                requiresAuth: true,
                icon: () => import('@/layouts/components/TGMenu/assets/images/blood-pressure-statistics.svg')
              }
            },
            {
              path: 'activity-blood-pressure-statistics-by-grade',
              name: 'activityBloodPressureStatisticsByGrade',
              component: () => import('@/views/manager/statisticalAnalysis/ActivityBloodPressureStatisticsByGrade'),
              meta: {
                title: '活动血压按年级统计',
                keepAlive: false,
                requiresAuth: true,
                icon: () => import('@/layouts/components/TGMenu/assets/images/blood-pressure-statistics.svg')
              }
            },
            {
              path: 'activity-vision-statistics-by-hierarchy',
              name: 'activityVisionStatisticsByHierarchy',
              component: () => import('@/views/manager/statisticalAnalysis/ActivityVisionStatisticsByHierarchy'),
              meta: {
                title: '活动视力按等级统计',
                keepAlive: false,
                requiresAuth: true,
                icon: () => import('@/layouts/components/TGMenu/assets/images/vision-statistics.svg')
              }
            },
            {
              path: 'activity-vision-statistics-by-grade',
              name: 'activityVisionStatisticsByGrade',
              component: () => import('@/views/manager/statisticalAnalysis/ActivityVisionStatisticsByGrade'),
              meta: {
                title: '活动视力按年级统计',
                keepAlive: false,
                requiresAuth: true,
                icon: () => import('@/layouts/components/TGMenu/assets/images/vision-statistics.svg')
              }
            },
            {
              path: 'activity-vital-capacity-statistics-by-hierarchy',
              name: 'activityVitalCapacityStatisticsByHierarchy',
              component: () => import('@/views/manager/statisticalAnalysis/ActivityVitalCapacityStatisticsByHierarchy'),
              meta: {
                title: '活动肺活量按等级统计',
                keepAlive: false,
                requiresAuth: true,
                icon: () => import('@/layouts/components/TGMenu/assets/images/vital-capacity-statistics.svg')
              }
            },
            {
              path: 'activity-vital-capacity-statistics-by-grade',
              name: 'activityVitalCapacityStatisticsByGrade',
              component: () => import('@/views/manager/statisticalAnalysis/ActivityVitalCapacityStatisticsByGrade'),
              meta: {
                title: '活动肺活量按年级统计',
                keepAlive: false,
                requiresAuth: true,
                icon: () => import('@/layouts/components/TGMenu/assets/images/vital-capacity-statistics.svg')
              }
            }
            // {
            //   path: 'vision-data-comparison',
            //   name: 'visionDataComparison',
            //   component: () => import('@/views/manager/physicalExaminationData/BasicData'),
            //   meta: {
            //     title: '视力数据对比',
            //     keepAlive: false,
            //     requiresAuth: true,
            //     icon: () => import('@/layouts/components/TGMenu/assets/images/vision-statistics.svg')
            //   }
            // },
            // {
            //   path: 'height-and-weight-data-comparison',
            //   name: 'heightAndWeightDataComparison',
            //   component: () => import('@/views/manager/physicalExaminationData/BasicData'),
            //   meta: {
            //     title: '身高体重数据对比',
            //     keepAlive: false,
            //     requiresAuth: true,
            //     icon: () => import('@/layouts/components/TGMenu/assets/images/height-and-weight-data-comparison.svg')
            //   }
            // },
            // {
            //   path: 'height-and-weight-grade-comparison',
            //   name: 'heightAndWeightGradeComparison',
            //   component: () => import('@/views/manager/physicalExaminationData/BasicData'),
            //   meta: {
            //     title: '身高体重年级对比',
            //     keepAlive: false,
            //     requiresAuth: true,
            //     icon: () => import('@/layouts/components/TGMenu/assets/images/height-statistics.svg')
            //   }
            // },
            // {
            //   path: 'vision-statistics-by-class',
            //   name: 'visionStatisticsByClass',
            //   component: () => import('@/views/manager/physicalExaminationData/BasicData'),
            //   meta: {
            //     title: '视力分班统计',
            //     keepAlive: false,
            //     requiresAuth: true,
            //     icon: () => import('@/layouts/components/TGMenu/assets/images/vision-statistics-by-class.svg')
            //   }
            // },
            // {
            //   path: 'height-and-weight-comparison-by-class',
            //   name: 'heightAndWeightComparisonByClass',
            //   component: () => import('@/views/manager/physicalExaminationData/BasicData'),
            //   meta: {
            //     title: '身高体重班级对比',
            //     keepAlive: false,
            //     requiresAuth: true,
            //     icon: () =>
            //       import('@/layouts/components/TGMenu/assets/images/height-and-weight-comparison-by-class.svg')
            //   }
            // },
            // {
            //   path: 'vision-statistics-by-grade',
            //   name: 'visionStatisticsByGrade',
            //   component: () => import('@/views/manager/physicalExaminationData/BasicData'),
            //   meta: {
            //     title: '视力年级统计',
            //     keepAlive: false,
            //     requiresAuth: true,
            //     icon: () => import('@/layouts/components/TGMenu/assets/images/vision-statistics-by-grade.svg')
            //   }
            // }
          ]
        },
        {
          path: 'percentile-statistics',
          component: TGRouterView,
          redirect: { name: 'percentileOfHeight' },
          meta: {
            title: '百分位数统计',
            keepAlive: false,
            requiresAuth: true,
            icon: () => import('@/layouts/components/TGMenu/assets/images/percentile-statistics.svg')
          },
          children: [
            {
              path: 'height-percentile',
              name: 'heightPercentile',
              component: () => import('@/views/manager/percentileStatistics/HeightPercentile'),
              meta: {
                title: '身高数据百分位统计',
                keepAlive: false,
                requiresAuth: true,
                icon: () => import('@/layouts/components/TGMenu/assets/images/percentile-of-height.svg')
              }
            },
            {
              path: 'weight-percentile',
              name: 'weightPercentile',
              component: () => import('@/views/manager/percentileStatistics/WeightPercentile'),
              meta: {
                title: '体重数据百分位统计',
                keepAlive: false,
                requiresAuth: true,
                icon: () => import('@/layouts/components/TGMenu/assets/images/percentile-of-weight.svg')
              }
            },
            {
              path: 'systolic-blood-pressure-percentile',
              name: 'systolicBloodPressurePercentile',
              component: () => import('@/views/manager/percentileStatistics/SystolicBloodPressurePercentile'),
              meta: {
                title: '收缩压数据百分位统计',
                keepAlive: false,
                requiresAuth: true,
                icon: () => import('@/layouts/components/TGMenu/assets/images/systolic-blood-pressure-percentile.svg')
              }
            },
            {
              path: 'diastolic-blood-pressure-percentile',
              name: 'diastolicBloodPressurePercentile',
              component: () => import('@/views/manager/percentileStatistics/DiastolicBloodPressurePercentile'),
              meta: {
                title: '舒张压数据百分位统计',
                keepAlive: false,
                requiresAuth: true,
                icon: () => import('@/layouts/components/TGMenu/assets/images/diastolic-blood-pressure-percentile.svg')
              }
            },
            {
              path: 'vital-capacity-percentile',
              name: 'vitalCapacityPercentile',
              component: () => import('@/views/manager/percentileStatistics/VitalCapacityPercentile'),
              meta: {
                title: '肺活量数据百分位统计',
                keepAlive: false,
                requiresAuth: true,
                icon: () => import('@/layouts/components/TGMenu/assets/images/vital-capacity-percentile.svg')
              }
            },
            {
              path: 'bmi-percentile',
              name: 'bmiPercentile',
              component: () => import('@/views/manager/percentileStatistics/BmiPercentile'),
              meta: {
                title: 'BMI指数百分位统计',
                keepAlive: false,
                requiresAuth: true,
                icon: () => import('@/layouts/components/TGMenu/assets/images/bmi-percentile.svg')
              }
            },
            {
              path: 'quetelet-index-percentile',
              name: 'queteletIndexPercentile',
              component: () => import('@/views/manager/percentileStatistics/QueteletIndexPercentile'),
              meta: {
                title: '克托莱指数百分位统计',
                keepAlive: false,
                requiresAuth: true,
                icon: () => import('@/layouts/components/TGMenu/assets/images/rohrer-index.svg')
              }
            },
            {
              path: 'rohrer-index-percentile',
              name: 'rohrerIndexPercentile',
              component: () => import('@/views/manager/percentileStatistics/RohrerIndexPercentile'),
              meta: {
                title: '劳雷尔指数百分位统计',
                keepAlive: false,
                requiresAuth: true,
                icon: () => import('@/layouts/components/TGMenu/assets/images/rohrer-index.svg')
              }
            },
            {
              path: 'vital-capacity-index-percentile',
              name: 'vitalCapacityIndexPercentile',
              component: () => import('@/views/manager/percentileStatistics/VitalCapacityIndexPercentile'),
              meta: {
                title: '肺活量指数百分位统计',
                keepAlive: false,
                requiresAuth: true,
                icon: () => import('@/layouts/components/TGMenu/assets/images/vital-capacity-percentile.svg')
              }
            }
          ]
        },
        {
          path: 'report-medical-examination',
          component: TGRouterView,
          redirect: { name: 'reportOverview' },
          meta: {
            title: '晨午检上报',
            keepAlive: false,
            requiresAuth: true,
            icon: () => import('@/layouts/components/TGMenu/assets/images/report-medical-examination.svg')
          },
          children: [
            {
              path: 'report-overview',
              name: 'reportOverview',
              component: () => import('@/views/manager/reportMedicalExamination/ReportOverview'),
              meta: {
                title: '上报概览',
                keepAlive: false,
                requiresAuth: true,
                icon: () => import('@/layouts/components/TGMenu/assets/images/report-overview.svg')
              }
            },
            {
              path: 'report-details',
              name: 'reportDetails',
              component: () => import('@/views/manager/reportMedicalExamination/ReportDetails'),
              meta: {
                title: '上报详情',
                keepAlive: false,
                requiresAuth: true,
                icon: () => import('@/layouts/components/TGMenu/assets/images/report-details.svg')
              }
            }
          ]
        },
        {
          path: 'fe-review',
          component: TGRouterView,
          redirect: { name: 'reportReview' },
          meta: {
            title: '晨午检审核',
            keepAlive: false,
            requiresAuth: true,
            icon: () => import('@/layouts/components/TGMenu/assets/images/report-review.svg')
          },
          children: [
            {
              path: 'report-review',
              name: 'reportReview',
              component: () => import('@/views/manager/review/ReportReview'),
              meta: {
                title: '上报审核',
                keepAlive: false,
                requiresAuth: true,
                icon: () => import('@/layouts/components/TGMenu/assets/images/report-review-sub.svg')
              }
            },
            {
              path: 'back-to-school-audits',
              name: 'backToSchoolAudits',
              component: () => import('@/views/manager/review/BackToSchoolAudits'),
              meta: {
                title: '返校审核',
                keepAlive: false,
                requiresAuth: true,
                icon: () => import('@/layouts/components/TGMenu/assets/images/report-review-sub.svg')
              }
            }
          ]
        },
        {
          path: 'epidemic-prevention-and-control',
          component: TGRouterView,
          redirect: { name: 'healthCredentials' },
          meta: {
            title: '疫情防控',
            keepAlive: false,
            requiresAuth: true,
            icon: () => import('@/layouts/components/TGMenu/assets/images/epidemic-prevention-and-control.svg')
          },
          children: [
            {
              path: 'health-credentials',
              name: 'healthCredentials',
              component: () => import('@/views/manager/epidemicPreventionAndControl/HealthCredentials'),
              meta: {
                title: '两码一报告',
                keepAlive: false,
                requiresAuth: true,
                icon: () => import('@/layouts/components/TGMenu/assets/images/health-credentials.svg')
              }
            }
          ]
        },
        {
          path: 'statistical-reports',
          component: TGRouterView,
          redirect: { name: 'symptomMonitoringReports' },
          meta: {
            title: '统计报告',
            keepAlive: false,
            requiresAuth: true,
            icon: () => import('@/layouts/components/TGMenu/assets/images/statistical-reports.svg')
          },
          children: [
            {
              path: 'symptom-monitoring-reports',
              name: 'symptomMonitoringReports',
              component: () => import('@/views/manager/statisticalReports/SymptomMonitoringReports'),
              meta: {
                title: '症状监测报告',
                keepAlive: false,
                requiresAuth: true,
                icon: () => import('@/layouts/components/TGMenu/assets/images/symptom-monitoring-reports.svg')
              }
            },
            {
              path: 'infectious-disease-statistics',
              name: 'infectiousDiseaseStatistics',
              component: () => import('@/views/manager/statisticalReports/InfectiousDiseaseStatistics'),
              meta: {
                title: '传染病统计表',
                keepAlive: false,
                requiresAuth: true,
                icon: () => import('@/layouts/components/TGMenu/assets/images/infectious-disease-statistics.svg')
              }
            },
            {
              path: 'noncommunicable-disease-statistics',
              name: 'noncommunicableDiseaseStatistics',
              component: () => import('@/views/manager/statisticalReports/NoncommunicableDiseaseStatistics'),
              meta: {
                title: '非传染病统计表',
                keepAlive: false,
                requiresAuth: true,
                icon: () => import('@/layouts/components/TGMenu/assets/images/noncommunicable-disease-statistics.svg')
              }
            },
            {
              path: 'infectious-disease-situation',
              name: 'infectiousDiseaseSituation',
              component: () => import('@/views/manager/statisticalReports/InfectiousDiseaseSituation'),
              meta: {
                title: '传染病区域态势图',
                keepAlive: false,
                requiresAuth: true,
                icon: () => import('@/layouts/components/TGMenu/assets/images/infectious-disease-situation.svg')
              }
            }
          ]
        },
        {
          path: 'early-warning-processing',
          component: TGRouterView,
          redirect: { name: 'earlyWarningInformation' },
          meta: {
            title: '晨午检预警处理',
            keepAlive: false,
            requiresAuth: true,
            icon: () => import('@/layouts/components/TGMenu/assets/images/early-warning-processing.svg')
          },
          children: [
            {
              path: 'early-warning-information',
              name: 'earlyWarningInformation',
              component: () => import('@/views/manager/earlyWarningProcessing/EarlyWarningInformation'),
              meta: {
                title: '预警信息',
                keepAlive: false,
                requiresAuth: true,
                icon: () => import('@/layouts/components/TGMenu/assets/images/early-warning-information.svg')
              }
            },
            {
              path: 'alert-parameter-settings',
              name: 'alertParameterSettings',
              component: () => import('@/views/manager/earlyWarningProcessing/AlertParameterSettings'),
              meta: {
                title: '预警参数设置',
                keepAlive: false,
                requiresAuth: true,
                icon: () => import('@/layouts/components/TGMenu/assets/images/alert-parameter-settings.svg')
              }
            }
          ]
        },
        {
          path: 'dormitories',
          component: TGRouterView,
          redirect: { name: 'buildings' },
          meta: {
            title: '宿舍管理',
            keepAlive: false,
            requiresAuth: true,
            icon: () => import('@/layouts/components/TGMenu/assets/images/dormitories.svg')
          },
          children: [
            {
              path: 'buildings',
              name: 'buildings',
              component: () => import('@/views/manager/dormitories/Buildings'),
              meta: {
                title: '楼栋管理',
                keepAlive: false,
                requiresAuth: true,
                icon: () => import('@/layouts/components/TGMenu/assets/images/buildings.svg')
              }
            },
            {
              path: 'rooms',
              name: 'rooms',
              component: () => import('@/views/manager/dormitories/Rooms'),
              meta: {
                title: '房间管理',
                keepAlive: false,
                requiresAuth: true,
                icon: () => import('@/layouts/components/TGMenu/assets/images/rooms.svg')
              }
            }
          ]
        },
        {
          path: 'holidays',
          component: TGRouterView,
          redirect: { name: 'holidaySettings' },
          meta: {
            title: '假期管理',
            keepAlive: false,
            requiresAuth: true,
            icon: () => import('@/layouts/components/TGMenu/assets/images/holidays.svg')
          },
          children: [
            {
              path: 'holiday-settings',
              name: 'holidaySettings',
              component: () => import('@/views/manager/holidays/HolidaySettings'),
              meta: {
                title: '假期设置',
                keepAlive: false,
                requiresAuth: true,
                icon: () => import('@/layouts/components/TGMenu/assets/images/holiday-settings.svg')
              }
            }
          ]
        },
        {
          path: 'canteen-hygiene',
          component: TGRouterView,
          redirect: { name: 'healthDaily' },
          meta: {
            title: '食堂卫生',
            keepAlive: false,
            requiresAuth: true,
            icon: () => import('@/layouts/components/TGMenu/assets/images/canteen-hygiene.svg')
          },
          children: [
            {
              path: 'health-daily',
              name: 'healthDaily',
              component: () => import('@/views/manager/canteenHygiene/HealthDaily'),
              meta: {
                title: '卫生日报',
                keepAlive: false,
                requiresAuth: true,
                icon: () => import('@/layouts/components/TGMenu/assets/images/health-daily.svg')
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
            icon: () => import('@/layouts/components/TGMenu/assets/images/system.svg')
          },
          children: [
            {
              path: 'menus',
              name: 'systemMenus',
              component: () => import('@/views/manager/system/Menus'),
              meta: {
                title: '菜单管理',
                keepAlive: false,
                requiresAuth: true,
                icon: () => import('@/layouts/components/TGMenu/assets/images/system-menus.svg')
              }
            },
            {
              path: 'functions',
              name: 'systemFunctions',
              component: () => import('@/views/manager/system/Functions'),
              meta: {
                title: '功能管理',
                keepAlive: false,
                requiresAuth: true,
                icon: () => import('@/layouts/components/TGMenu/assets/images/system-functions.svg')
              }
            },
            {
              path: 'roles',
              name: 'systemRoles',
              component: () => import('@/views/manager/system/Roles'),
              meta: {
                title: '角色管理',
                keepAlive: false,
                requiresAuth: true,
                icon: () => import('@/layouts/components/TGMenu/assets/images/system-roles.svg')
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

  if (routes && config.dynamicRouting) {
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

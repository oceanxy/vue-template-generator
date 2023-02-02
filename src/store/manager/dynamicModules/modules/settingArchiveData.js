import { createStoreModule } from '@/store/template'

export default commitRootInModule => createStoreModule({
  state: {
    // 学校树弹窗
    // visibilityOfSchoolTre: false,
    // 报告弹窗
    visibilityOfReport: false,
    activities: {
      loading: false,
      list: []
    },
    yearList: {
      loading: false,
      list: []
    },
    schoolTree: {
      loading: false,
      list: []
    },
    schoolListByActivity: {
      loading: false,
      list: []
    }
  }
})

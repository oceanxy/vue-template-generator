import { createStoreModule } from '@/store/template'
import { omit } from 'lodash'

export default commitRootInModule =>
  omit(
    createStoreModule({
      state: {
        // 学校树弹窗
        // visibleOfSchoolTre: false,
        // 报告弹窗
        visibleOfReport: false,
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
  )

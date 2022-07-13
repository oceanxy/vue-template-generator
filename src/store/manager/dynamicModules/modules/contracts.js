import { createStoreModule } from '@/store/template'
import { omit } from 'lodash'

export default commitRootInModule => omit(
  createStoreModule({
    state: {
      visibleOfRenew: false,
      visibleOfExpirationReminder: false,
      visibleOfTerminate: false,
      // 园区团队下拉列表数据（仅本模块专用）
      contractCards: {
        loading: false,
        list: []
      },
      // 到期提醒弹窗内的提醒方式数据
      reminderMethods: {
        loading: false,
        list: []
      }
    }
  }),
  [
    'state.visibleOfEdit',
    'state.details'
  ]
)

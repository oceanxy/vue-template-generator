import { createStoreModule } from '@/store/template'
import { omit } from 'lodash'

export default commitRootInModule => omit(
  createStoreModule({
    state: {
      visibleOfRenew: false,
      visibleOfExpirationReminder: false,
      visibleOfTerminate: false,
      // 合同数据（按状态分类）
      contractCards: {
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

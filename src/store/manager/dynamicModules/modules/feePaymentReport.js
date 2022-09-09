import { createStoreModule } from '@/store/template'
import { omit } from 'lodash'

export default commitRootInModule => omit(
  createStoreModule({
    state: {
      visibleOfPaymentRecords: false,
      // 缴费明细
      paymentRecordsList: {
        loading: false,
        data: {}
      }
    }
  }),
  ['state.details']
)

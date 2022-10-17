import { createStoreModule } from '@/store/template'
import { omit } from 'lodash'

export default commitRootInModule => omit(
  createStoreModule({
    state: {
      visibleOfPaymentRecords: false,
      visibleOfBilling: false,
      // 缴费明细
      paymentRecordsList: {
        loading: false,
        data: {}
      },
      details: {
        loading: false,
        data: {}
      }
    }
  }),
  [
    'state.visibleOfEdit',
    'state.selectedRows',
    'state.selectedRowKeys'
  ]
)

import { createStoreModule } from '@/store/template'
import { omit } from 'lodash'

export default commitRootInModule => omit(
  createStoreModule({
    state: {
      visibleOfPaymentRecords: false,
      // 企业缴费方式
      paymentMethods: {
        loading: false,
        list: []
      },
      // 变动记录
      paymentRecordsList: {
        loading: false,
        list: []
      }
    }
  }),
  ['state.details']
)

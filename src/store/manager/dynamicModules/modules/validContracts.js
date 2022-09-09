import { createStoreModule } from '@/store/template'
import { omit } from 'lodash'

export default commitRootInModule => omit(
  createStoreModule({
    state: {
      visibleOfUrgingPayment: false,
      visibleOfBills: false,
      visibleOfPaymentRecords: false,
      // 企业缴费方式
      paymentMethods: {
        loading: false,
        list: []
      },
      // 待缴账单（缴费弹窗）
      pendingOrders: {
        loading: false,
        list: []
      },
      // 待缴账单（账单查询弹窗）
      pendingOrderList: {
        loading: false,
        list: []
      },
      // 缴费记录
      paymentRecordsList: {
        loading: false,
        list: []
      }
    }
  }),
  ['state.details']
)

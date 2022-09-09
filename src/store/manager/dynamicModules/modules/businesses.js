import { createStoreModule } from '@/store/template'

export default commitRootInModule => createStoreModule({
  state: {
    // 发送短信弹窗控制
    visibleOfShortMessage: false,
    // 投诉建议弹窗控制
    visibleOfSuggestions: false,
    // 交费记录弹窗控制
    visibleOfPaymentRecords: false,
    // 账单查询弹窗控制
    visibleOfBills: false
  },
  modules: {
    suggestions: {
      state: {
        loading: false,
        search: {},
        list: []
      }
    },
    paymentRecords: {
      state: {
        loading: false,
        search: {},
        list: []
      }
    },
    bills: {
      state: {
        loading: false,
        search: {},
        list: []
      }
    }
  }
})

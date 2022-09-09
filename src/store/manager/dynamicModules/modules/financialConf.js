import { createStoreModule } from '@/store/template'

export default commitRootInModule => createStoreModule({
  state: {
    visibleOfContractReview: false,
    serviceManagementFee: {
      loading: false,
      data: {}
    },
    securityDeposit: {
      loading: false,
      data: {}
    },
    rents: {
      loading: false,
      data: {}
    },
    payables: {
      loading: false,
      list: []
    }
  }
})

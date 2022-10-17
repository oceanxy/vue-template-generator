import { createStoreModule } from '@/store/template'
import { omit } from 'lodash'

export default commitRootInModule => omit(createStoreModule(
  {
    state: {
      floors: {
        list: [],
        loading: false
      },
      visibleOfTerminate: false,
      visibleOfRenew: false,
      visibleOfBills: false,
      visibleOfDetails: false,
      pendingOrderList: {
        loading: false,
        list: []
      },
      details: {
        loading: false,
        data: {}
      }
    }
  }
), 'state.pagination')

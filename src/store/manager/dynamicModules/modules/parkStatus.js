import { createStoreModule } from '@/store/template'
import { omit } from 'lodash'

export default commitRootInModule => omit(createStoreModule(
  {
    state: {
      statisticalData: {
        loading: false,
        list: []
      }
    }
  }
), 'state.pagination')

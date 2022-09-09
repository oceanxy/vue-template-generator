import { createStoreModule } from '@/store/template'
import { omit } from 'lodash'

export default commitRootInModule => omit(
  createStoreModule({
    state: {
      visibleOfDetails: false,
      details: {
        loading: false,
        data: {}
      }
    }
  }), [
    'state.visibleOfEdit',
    'state.selectedRows',
    'state.selectedRowKeys'
  ]
)

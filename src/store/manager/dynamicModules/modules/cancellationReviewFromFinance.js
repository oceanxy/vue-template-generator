import { createStoreModule } from '@/store/template'
import { omit } from 'lodash'

export default commitRootInModule => omit(
  createStoreModule({
    state: {
      details: {
        loading: false,
        data: {}
      },
      visibleOfReview: false,
      visibleOfDetails: false
    }
  }), [
    'state.selectedRows',
    'state.selectedRowKeys',
    'state.visibleOfEdit'
  ]
)

import { createStoreModule } from '@/store/template'
import { omit } from 'lodash'

export default commitRootInModule => omit(
  createStoreModule({
    state: {
      reports: {
        loading: false,
        list: []
      },
      years: {
        loading: false,
        list: []
      },
      items: {
        loading: false,
        list: []
      },
      details: {
        loading: false,
        data: {}
      }
    }
  }),
  [
    'state.selectedRows',
    'state.selectedRowKeys',
    'state.visibleOfEdit',
    'state.currentItem'
  ]
)

import { createStoreModule } from '@/store/template'
import { omit } from 'lodash'

export default commitRootInModule =>
  omit(createStoreModule({
    state: {
      activities: {
        loading: false,
        list: []
      },
      townOrSubDistricts: {
        loading: false,
        list: []
      }
    }
  }), [
    'state.details',
    'state.visibleOfEdit',
    'state.selectedRowKeys',
    'state.selectedRows',
    'state.currentItem',
    'state.pagination'
  ])

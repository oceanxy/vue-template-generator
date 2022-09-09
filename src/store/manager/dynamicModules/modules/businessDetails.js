import { createStoreModule } from '@/store/template'
import { omit } from 'lodash'

export default commitRootInModule => omit(
  createStoreModule(),
  [
    'state.selectedRows',
    'state.selectedRowKeys',
    'state.visibleOfEdit',
    'state.details',
    'state.currentItem',
    'state.pagination',
    'state.search'
  ]
)

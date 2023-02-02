import { createStoreModule } from '@/store/template'

export default commitRootInModule => createStoreModule({}, [
  'state.details',
  'state.visibilityOfEdit',
  'state.selectedRowKeys',
  'state.selectedRows',
  'state.currentItem',
  'state.pagination'
])

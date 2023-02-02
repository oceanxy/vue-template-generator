import { createStoreModule } from '@/store/template'

export default commitRootInModule => createStoreModule({
  state: {
    activities: {
      list: [],
      loading: false
    }
  }
}, [
  'details',
  'visibilityOfEdit',
  'selectedRowKeys',
  'selectedRows',
  'pagination'
])

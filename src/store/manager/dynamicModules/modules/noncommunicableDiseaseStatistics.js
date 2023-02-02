import { createStoreModule } from '@/store/template'

export default commitRootInModule => createStoreModule({
  state: {
    visibilityOfExportByTime: false,
    activities: {
      list: [],
      loading: false
    },
    organizations: {
      list: [],
      loading: false
    }
  }
}, [
  'details',
  'visibilityOfEdit',
  'selectedRowKeys',
  'selectedRows',
  'currentItem'
])

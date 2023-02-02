import { createStoreModule } from '@/store/template'

export default commitRootInModule => createStoreModule({
  state: {
    activities: {
      list: [],
      loading: false
    },
    organizations: {
      list: [],
      loading: false
    },
    conclusionGrades: {
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

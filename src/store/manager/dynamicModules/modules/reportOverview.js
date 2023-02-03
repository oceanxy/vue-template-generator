import { createStoreModule } from '@/store/template'

export default commitRootInModule => createStoreModule({
  state: {
    visibilityOfOneClickReport: false,
    organizationTree: {
      loading: false,
      list: []
    },
    pendingStudents: {
      loading: false,
      list: []
    }
  }
}, [
  'selectedRowKeys',
  'selectedRows'
])

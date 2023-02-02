import { createStoreModule } from '@/store/template'

export default commitRootInModule => createStoreModule({
  state: {
    organizationTree: {
      list: [],
      loading: false
    },
    schoolTree: {
      list: [],
      loading: false
    },
    streets: {
      list: [],
      loading: false
    },
    selectedSchoolsForEditModal: {
      list: [],
      loading: false
    }
  }
}, [
  'details'
])

import { createStoreModule } from '@/store/template'

export default commitRootInModule => createStoreModule({
  state: {
    dutyClassTree: {
      loading: false,
      list: []
    },
    students: {
      loading: false,
      list: []
    },
    symptoms: {
      loading: false,
      list: []
    },
    diagnoses: {
      loading: false,
      list: []
    }
  }
}, [
  'details'
])

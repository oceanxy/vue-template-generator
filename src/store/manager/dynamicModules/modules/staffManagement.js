import { createStoreModule } from '@/store/template'

export default commitRootInModule => createStoreModule({
  state: {
    visibilityOfEditPassword: false,
    organizationTree: {
      list: [],
      loading: false
    },
    roleTree: {
      list: [],
      loading: false
    },
    dutyClassTree: {
      list: [],
      loading: false
    }
  }
})

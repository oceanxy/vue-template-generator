import { createStoreModule } from '@/store/template'

export default commitRootInModule => createStoreModule({
  state: {
    visibilityOfImportSchool: false,
    streetList: {
      loading: false,
      list: []
    }
  }
})

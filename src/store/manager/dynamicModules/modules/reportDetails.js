import { createStoreModule } from '@/store/template'

export default commitRootInModule => createStoreModule({
  state: {
    schoolTree: {
      loading: false,
      list: []
    }
  }
}, [
  'visibilityOfEdit'
])

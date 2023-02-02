import { createStoreModule } from '@/store/template'

export default commitRootInModule => createStoreModule({
  state: {
    schoolTree: {
      list: [],
      loading: false
    }
  }
}, ['details'])

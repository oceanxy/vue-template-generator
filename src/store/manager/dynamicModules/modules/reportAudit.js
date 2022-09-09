import { createStoreModule } from '@/store/template'

export default commitRootInModule => createStoreModule({
  state: {
    visibleOfDetails: false,
    details: {
      loading: false,
      list: []
    }
  }
})

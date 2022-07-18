import { createStoreModule } from '@/store/template'

export default commitRootInModule => createStoreModule({
  state: {
    visibleOfPreview: false,
    indicators: {
      loading: false,
      list: []
    }
  }
})

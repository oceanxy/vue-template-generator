import { createStoreModule } from '@/store/template'

export default commitRootInModule => createStoreModule({
  state: {
    visibleOfPreview: false
  }
})

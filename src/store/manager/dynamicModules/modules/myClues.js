import { createStoreModule } from '@/store/template'

export default commitRootInModule => createStoreModule({
  state: {
    visibleOfFollowUpClues: false,
    visibleOfDetails: false
  }
})

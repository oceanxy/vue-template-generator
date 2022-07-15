import { createStoreModule } from '@/store/template'

export default commitRootInModule => createStoreModule({
  state: {
    visibleOfChooseVenue: false,
    visibleOfTerminate: false,
    visibleOfRenew: false
  }
})

import { createStoreModule } from '@/store/template'

export default commitRootInModule => createStoreModule({
  state: {
    unitDetails: {
      loading: false,
      data: {}
    },
    parkDetails: {
      loading: false,
      data: {}
    }
  }
})

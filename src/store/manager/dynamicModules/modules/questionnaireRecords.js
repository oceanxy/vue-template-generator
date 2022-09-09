import { createStoreModule } from '@/store/template'

export default commitRootInModule => createStoreModule({
  state: {visibleOfResults: false},
  modules: {
    results: {
      state: {
        list: [],
        loading: false
      }
    }
  }
})

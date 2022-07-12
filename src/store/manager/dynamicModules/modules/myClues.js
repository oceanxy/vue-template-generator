import { createStoreModule } from '@/store/template'

export default commitRootInModule => createStoreModule({
  state: {
    visibleOfFollowUpClues: false,
    visibleOfDetails: false,
    followUpDetailsList: {
      list: [],
      loading: false
    }
  },
  modules: {
    clueDetails: {
      state: {
        loading: false,
        list: []
      }
    }
  }
})

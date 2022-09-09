import { createStoreModule } from '@/store/template'

export default commitRootInModule => createStoreModule({
  modules: {
    fillOutReport: {
      state: {
        data: {},
        loading: false
      }
    },
    fillInRecords: {
      state: {
        data: {},
        loading: false
      }
    }
  }
})

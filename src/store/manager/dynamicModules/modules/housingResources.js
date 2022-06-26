import { createStoreModule } from '@/store/template'

export default commitRootInModule => createStoreModule({
  state: {
    visibleOfEdit: false,
    visibleOfContractHistory: true
  },
  modules: {
    contractHistory: {
      state: {
        loading: false,
        search: {},
        list: [],
        pagination: {
          pageIndex: 0,
          pageSize: 10,
          total: 0
        }
      }
    }
  }
})

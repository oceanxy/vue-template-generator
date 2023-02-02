import { createStoreModule } from '@/store/template'

export default commitRootInModule => createStoreModule({
  state: { visibilityOfDetails: false },
  modules: {
    reviewThePlan: {
      state: {
        rowKey: 'id',
        loading: false,
        list: [],
        pagination: {
          pageIndex: 0,
          pageSize: 10,
          total: 0
        }
      }
    }
  }
}, [
  'details',
  'visibilityOfEdit',
  'sortFieldList'
])

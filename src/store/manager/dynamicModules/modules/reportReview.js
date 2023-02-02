import { createStoreModule } from '@/store/template'

export default commitRootInModule => createStoreModule({
  state: {
    schoolTree: {
      loading: false,
      list: []
    },
    visibilityOfReview: false,
    visibilityOfPotentiallyInfectedStudents: false
  },
  modules: {
    potentiallyInfectedStudents: {
      state: {
        rowKey: 'id',
        search: {},
        list: [],
        loading: false,
        pagination: {
          pageSize: 10,
          pageIndex: 0,
          total: 0
        }
      }
    }
  }
}, [
  'visibilityOfEdit'
])

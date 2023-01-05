import { createStoreModule } from '@/store/template'
import { omit } from 'lodash'

export default commitRootInModule => omit(createStoreModule({
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
}), [
  'state.visibilityOfEdit'
])

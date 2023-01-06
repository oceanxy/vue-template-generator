import { createStoreModule } from '@/store/template'
import { omit } from 'lodash'

export default commitRootInModule => omit(createStoreModule({
  state: {
    visibilityOfDetails: false
  },
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
}), [
  'state.details',
  'state.visibilityOfEdit',
  'state.sortFieldList'
])

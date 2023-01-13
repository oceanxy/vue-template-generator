import { createStoreModule } from '@/store/template'
import { omit } from 'lodash'

export default commitRootInModule => omit(createStoreModule({
  state: {
    visibilityOfDetails: false,
    activities: {
      list: [],
      loading: false
    },
    organizations: {
      list: [],
      loading: false
    },
    conclusionGrades: {
      list: [],
      loading: false
    },
    heightAndWeightData: {
      loading: false,
      list: []
    }
  },
  modules: {
    checkedItems: {
      state: {
        loading: false,
        rowKey: 'id'
      }
    }
  }
}), [
  'state.details',
  'state.visibilityOfEdit',
  'state.selectedRowKeys',
  'state.selectedRows'
])

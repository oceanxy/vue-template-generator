import { createStoreModule } from '@/store/template'
import { omit } from 'lodash'

export default commitRootInModule => omit(createStoreModule({
  state: {
    visibleOfDetails: false,
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
  }
}), [
  'state.details',
  'state.visibleOfEdit',
  'state.selectedRowKeys',
  'state.selectedRows'
])

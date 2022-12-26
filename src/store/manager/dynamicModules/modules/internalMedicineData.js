import { createStoreModule } from '@/store/template'
import { omit } from 'lodash'

export default commitRootInModule => omit(createStoreModule({
  state: {
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
    }
  }
}), [
  'state.details',
  'state.visibilityOfEdit',
  'state.selectedRowKeys',
  'state.selectedRows',
  'state.currentItem'
])

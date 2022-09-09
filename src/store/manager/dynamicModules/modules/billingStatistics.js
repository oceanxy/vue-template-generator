import { createStoreModule } from '@/store/template'
import { omit } from 'lodash'

export default commitRootInModule => omit(createStoreModule({
  state: {
    chartYear: undefined,
    tableYear: undefined,
    years: {
      loading: false,
      list: []
    },
    chartData: {
      loading: false,
      list: []
    }
  }
}), [
  'state.selectedRows',
  'state.selectedRowKeys',
  'state.visibleOfEdit',
  'state.pagination',
  'state.search',
  'state.details'
])

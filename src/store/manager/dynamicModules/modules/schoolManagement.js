import { createStoreModule } from '@/store/template'
import { omit } from 'lodash'

export default commitRootInModule =>
  omit(createStoreModule({ state: {} }), ['state.visibleOfEdit', 'state.selectedRowKeys', 'state.selectedRows'])

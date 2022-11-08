import { createStoreModule } from '@/store/template'
import { omit } from 'lodash'

export default commitRootInModule =>
  omit(
    createStoreModule({
      state: {
        levelList: {
          list: [],
          loading: false
        }
      }
    }),
    ['state.details', 'state.visibleOfEdit', 'state.selectedRowKeys', 'state.selectedRows', 'state.currentItem']
  )

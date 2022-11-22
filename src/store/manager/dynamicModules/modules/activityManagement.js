import { createStoreModule } from '@/store/template'
import { omit } from 'lodash'

export default commitRootInModule =>
  omit(
    createStoreModule({
      state: {
        yearList: {
          list: [],
          loading: false
        },
        itemList: {
          list: [],
          loading: false
        }
      }
    }),
    ['state.details']
  )

import { createStoreModule } from '@/store/template'
import { omit } from 'lodash'

export default commitRootInModule =>
  omit(
    createStoreModule({
      state: {
        yearList: {
          loading: false,
          list: []
        },
        schoolListByThisUser: {
          loading: false,
          list: []
        }
      }
    }),
    []
  )

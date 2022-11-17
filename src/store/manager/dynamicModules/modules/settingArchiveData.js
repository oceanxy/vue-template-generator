import { createStoreModule } from '@/store/template'
import { omit } from 'lodash'

export default commitRootInModule =>
  omit(
    createStoreModule({
      state: {
        activities: {
          loading: false,
          list: []
        },
        yearList: {
          loading: false,
          list: []
        }
      }
    })
  )

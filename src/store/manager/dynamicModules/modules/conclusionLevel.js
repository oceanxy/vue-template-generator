import { createStoreModule } from '@/store/template'
import { omit } from 'lodash'

export default commitRootInModule =>
  omit(
    createStoreModule({
      state: {
        LevelModalOfTable: false,
        levelList: {
          list: [],
          loading: false
        }
      }
    }),
    ['state.details']
  )

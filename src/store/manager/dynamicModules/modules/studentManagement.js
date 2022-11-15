import { createStoreModule } from '@/store/template'
import { omit } from 'lodash'

export default commitRootInModule =>
  omit(
    createStoreModule({
      state: {
        gradeList: {
          loading: false,
          list: []
        },
        schoolList: {
          loading: false,
          list: []
        },
        streetList: {
          loading: false,
          list: []
        }
      }
    })
  )

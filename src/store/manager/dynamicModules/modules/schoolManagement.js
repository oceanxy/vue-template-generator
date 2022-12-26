import { createStoreModule } from '@/store/template'
import { omit } from 'lodash'

export default commitRootInModule =>
  omit(
    createStoreModule({
      state: {
        visibilityOfImportSchool: false,
        streetList: {
          loading: false,
          list: []
        }
      }
    }),
    []
  )

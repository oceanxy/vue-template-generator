import { createStoreModule } from '@/store/template'
import { omit } from 'lodash'

export default commitRootInModule => omit(createStoreModule({
  state: {
    visibilityOfEditPassword: false,
    organizationTree: {
      list: [],
      loading: false
    },
    roleTree: {
      list: [],
      loading: false
    },
    dutyClassTree: {
      list: [],
      loading: false
    }
  }
})

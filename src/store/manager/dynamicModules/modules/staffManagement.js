import { createStoreModule } from '@/store/template'
import { omit } from 'lodash'

export default commitRootInModule => omit(createStoreModule({
  state: {
    visibleOfEditPassword: false,
    organizationTree: {
      list: [],
      loading: false
    },
    roleTree: {
      list: [],
      loading: false
    }
  }
}), [
  'state.details'
])

import { omit } from 'lodash'
import { createStoreModule } from '@/store/template'

export default commitRootInModule => omit(createStoreModule({
  state: {
    organizations: {
      list: [],
      loading: false
    }
  }
}), ['state.details'])

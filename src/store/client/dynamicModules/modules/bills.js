import { createStoreModule } from '@/store/template'
import { omit } from 'lodash'

export default commitRootInModule => omit(
  createStoreModule({ state: { visibleOfPayFees: false } }),
  [
    'state.visibleOfEdit',
    'state.pagination',
    'state.search'
  ]
)
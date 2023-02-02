import { createStoreModule } from '@/store/template'

export default commitRootInModule => createStoreModule(
  {
    state: {
      KpiAndParam: {
        list: [],
        loading: false
      }
    }
  },
  ['details']
)

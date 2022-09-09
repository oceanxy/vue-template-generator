import { createStoreModule } from '@/store/template'

export default commitRootInModule => createStoreModule(
  {
    state: {
      pagination: {
        pageSize: 20,
        pageIndex: 0,
        total: 0
      }
    }
  }
)

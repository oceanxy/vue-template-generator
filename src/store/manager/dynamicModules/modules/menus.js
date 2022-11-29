import { createStoreModule } from '@/store/template'

export default commitRootInModule => createStoreModule(
  {
    state: {
      menuTree: {
        loading: false,
        list: []
      },
      pagination: {
        pageSize: 20,
        pageIndex: 0,
        total: 0
      },
      currentMenuId: ''
    }
  }
)

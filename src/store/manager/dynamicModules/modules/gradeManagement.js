import { createStoreModule } from '@/store/template'

export default commitRootInModule => createStoreModule(
  {
    state: {
      yearList: {
        loading: false,
        list: []
      },
      schoolListByThisUser: {
        loading: false,
        list: []
      }
    }
  }
)

import { createStoreModule } from '@/store/template'

export default commitRootInModule => createStoreModule(
  {
    state: {
      visibilityOfResetPwd: false,
      stores: {
        loading: false,
        list: []
      },
      roles: {
        loading: false,
        list: []
      }
    }
  }
)

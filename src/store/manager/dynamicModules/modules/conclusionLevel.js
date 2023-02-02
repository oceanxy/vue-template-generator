import { createStoreModule } from '@/store/template'

export default commitRootInModule => createStoreModule(
  {
    state: {
      LevelModalOfTable: false,
      levelList: {
        list: [],
        loading: false
      }
    }
  },
  ['details']
)

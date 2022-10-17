import { createStoreModule } from '@/store/template'

export default commitRootInModule =>
  createStoreModule({
    state: { visibleOfEdit: false },
    mutations: {},
    actions: {},
    modules: {}
  })

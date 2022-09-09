import { createStoreModule } from '@/store/template'

export default commitRootInModule =>
  createStoreModule({
    state: {
      visibleOfEdit: false,
      visibleOfMenu: false
    },
    mutations: {},
    actions: {
      async getDetail({ dispatch }, { id, moduleName }) {
        if (!id) return

        dispatch(
          'getDetails',
          {
            payload: { id },
            moduleName
          },
          { root: true }
        )
      }
    },
    modules: {}
  })

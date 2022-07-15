import apis from '@/apis'
import { createStoreModule } from '@/store/template'
import { message } from 'ant-design-vue'
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
        dispatch('getDetails', { payload: { id }, moduleName }, { root: true })
      }
    },
    modules: {}
  })

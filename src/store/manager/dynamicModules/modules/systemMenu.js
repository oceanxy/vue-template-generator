import apis from '@/apis'
import { createStoreModule } from '@/store/template'
import { message } from 'ant-design-vue'

export default commitRootInModule =>
  createStoreModule({
    state: {
      visibleOfEdit: false
    },
    mutations: {
      set_visibleOfEdit(state, payload) {
        state.visibleOfEdit = payload
      }
    },
    actions: {},
    modules: {}
  })

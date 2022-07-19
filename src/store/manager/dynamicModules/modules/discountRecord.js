import apis from '@/apis'
import { createStoreModule } from '@/store/template'
import { message } from 'ant-design-vue'
export default commitRootInModule =>
  createStoreModule({
    state: {
      visibleOfEdit: false,
      bussienssSelect: {
        loading: false,
        list: []
      },
      discountSelect: {
        loading: false,
        list: []
      }
    },
    mutations: {},
    actions: {},
    modules: {}
  })

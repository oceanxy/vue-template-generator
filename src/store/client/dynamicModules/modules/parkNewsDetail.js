import apis from '@/apis'
import { message } from 'ant-design-vue'
import { createStoreModule } from '@/store/template'
import { omit } from 'lodash'

export default commitRootInModule =>
  omit(
    createStoreModule({
      state: {loading: false},
      mutations: {},
      actions: {}
    }),
    ['state.visibleOfEdit']
  )

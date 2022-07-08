import apis from '@/apis'
import { message, Modal } from 'ant-design-vue'
import { createStoreModule } from '@/store/template'
import { omit } from 'lodash'
export default commitRootInModule =>
  omit(
    createStoreModule({
      state: {
        loading: false,
        search: {
          messagePlatform: 2
        }
      },
      mutations: {},
      actions: {}
    }),
    ['state.visibleOfEdit']
  )

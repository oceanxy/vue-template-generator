import apis from '@/apis'
import { message, Modal } from 'ant-design-vue'
import { createStoreModule } from '@/store/template'
import { omit } from 'lodash'

export default commitRootInModule =>
  omit(
    createStoreModule({
      state: {search: {roomNo: ''}},
      mutations: {},
      actions: {
        async getList({ dispatch, commit }, { moduleName }) {
          const res = await dispatch('getList', { moduleName }, { root: true })

          if (res.status) {
            //
          }

          return res
        }
      }
    }),
    ['state.visibleOfEdit']
  )

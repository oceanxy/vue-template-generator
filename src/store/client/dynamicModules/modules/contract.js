import apis from '@/apis'
import { createStoreModule } from '@/store/template'
import { omit } from 'lodash'
export default commitRootInModule =>
  omit(
    createStoreModule({
      actions: {
        async getContracts({ commit }, { moduleName }) {
          commitRootInModule('setLoading', true)
          const res = await apis.getContracts()
          commitRootInModule('setLoading', false)
          if (res.status) {
            commitRootInModule('setList', res.data)
          }
        }
      }
    }),
    ['state.selectedRows', 'state.selectedRowKeys', 'state.visibleOfEdit', 'state.pagination', 'state.search']
  )

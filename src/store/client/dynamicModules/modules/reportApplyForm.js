import apis from '@/apis'
import { createStoreModule } from '@/store/template'
import { omit } from 'lodash'

export default commitRootInModule =>
  omit(
    createStoreModule({
      state: {
        loading: false
      },
      mutations: {},
      actions: {
        async getItemList({ commit }, reportId) {
          commitRootInModule('setLoading', true)
          const res = await apis.reportGetItemList({ reportId })
          commitRootInModule('setLoading', false)
          if (res.status) {
            commitRootInModule('setList', res.data)
          }
        }
      }
    }),
    ['state.selectedRows', 'state.selectedRowKeys', 'state.visibleOfEdit', 'state.pagination', 'state.search']
  )

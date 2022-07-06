import apis from '@/apis'
import { createStoreModule } from '@/store/template'
import { omit } from 'lodash'

export default commitRootInModule =>
  omit(
    createStoreModule({
      state: {},
      mutations: {},
      actions: {
        async getUserCompanyBillList({ commit, rootState }) {
          const { userInfo } = rootState.login
          commitRootInModule('setLoading', true)
          const res = await apis.getUserCompanyBillList({ companyId: userInfo.companyId })
          commitRootInModule('setLoading', false)
          if (res.status) {
            commitRootInModule('setDetails', res.data)
          }
        }
      }
    }),
    ['state.selectedRows', 'state.selectedRowKeys', 'state.visibleOfEdit', 'state.pagination', 'state.search']
  )

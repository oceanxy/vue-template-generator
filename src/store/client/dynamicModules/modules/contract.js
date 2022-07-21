import apis from '@/apis'
import { createStoreModule } from '@/store/template'
import { omit } from 'lodash'

export default commitRootInModule =>
  omit(
    createStoreModule({
      state: {
        visibleOfSigning: false,
        applyType: 1 //申请类型 1 续约 2解约
      },
      mutations: {
        setApplyType(state, value) {
          state.applyType = value
        }
      },
      actions: {
        async getContracts({ commit }) {
          commitRootInModule('setLoading', true)
          const res = await apis.getWebContracts()

          commitRootInModule('setLoading', false)

          if (res.status) {
            commitRootInModule('setList', res.data)
          }
        },
        async getContractPreview(ctx, { id }) {
          commitRootInModule('setLoading', true)
          const res = await apis.getNotifyMessageContractPreview({ id })

          commitRootInModule('setLoading', false)

          return res
        }
      }
    }),
    ['state.selectedRows', 'state.selectedRowKeys', 'state.visibleOfEdit', 'state.pagination', 'state.search']
  )

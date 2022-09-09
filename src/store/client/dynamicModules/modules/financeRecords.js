import apis from '@/apis'
import { createStoreModule } from '@/store/template'
import { omit } from 'lodash'

export default commitRootInModule =>
  omit(
    createStoreModule({
      state: {
        loading: false,
        modalForDetailsLoading: false,
        showModalForDetails: false,
        recordsDetailsList: {},

        showModalForInvoice: false
      },
      mutations: {
        setRecordsDetailsList(state, payload) {
          state.recordsDetailsList = payload
        },
        setModalForDetailsLoading(state, payload) {
          state.modalForDetailsLoading = payload
        }
      },
      actions: {
        async getFinanceRecordsDetails({ commit, state }) {
          commit('setModalForDetailsLoading', true)
          const res = await apis.getFinanceRecordsDetails({ id: state.currentItem.id })

          commit('setModalForDetailsLoading', false)

          if (res.status) {
            commit('setRecordsDetailsList', res.data)
          }
        }
      }
    }),
    ['state.selectedRows', 'state.selectedRowKeys', 'state.visibleOfEdit']
  )

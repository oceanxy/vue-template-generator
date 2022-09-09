import apis from '@/apis'
import { message, Modal } from 'ant-design-vue'
import { createStoreModule } from '@/store/template'
import { omit } from 'lodash'

export default commitRootInModule =>
  omit(
    createStoreModule({
      state: {
        loading: false,
        formLoading: false,
        search: {
          companyId: '',
          acceptStatus: ''
        }
      },
      mutations: {
        set_formLoading(state, value) {
          state.formLoading = value
        }
      },
      actions: {
        async getComplaintsPageList({ state }) {
          const form = {
            ...state.search,
            ...state.pagination
          }

          commitRootInModule('setLoading', true)
          const res = await apis.getComplaintsPageList(form)

          commitRootInModule('setLoading', false)

          if (res.status) {
            commitRootInModule('setList', res.data.rows || [])
            commitRootInModule('setPagination', { total: res.data.totalNum })
          }

          return res
        },
        async addPropertyComplaints({ commit, dispatch }, payload) {
          const form = {
            companyId: '',
            ...payload
          }

          commit('set_formLoading', true)
          const res = await apis.addPropertyComplaints(form)

          commit('set_formLoading', false)

          if (res.status) {
            message.success('提交成功')
            dispatch('getComplaintsPageList')
          }

          return res
        }
      }
    }),
    ['state.visibleOfEdit']
  )

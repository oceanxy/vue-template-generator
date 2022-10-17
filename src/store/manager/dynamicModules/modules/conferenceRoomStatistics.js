import apis from '@/apis'
import { createStoreModule } from '@/store/template'

export default commitRootInModule =>
  createStoreModule({
    state: {
      visibleOfDetail: false,
      detailLoading: false,
      detailList: []
    },
    mutations: {
      set_detailList(state, payload) {
        state.detailList = payload
      },
      set_detailLoading(state, payload) {
        state.detailLoading = payload
      }
    },
    actions: {
      async getMeetingRoomAppointmentDetailList({ commit, state }, { payload }) {
        commit('set_detailLoading', true)
        const res = await apis.getMeetingRoomAppointmentDetailList(payload)

        commit('set_detailLoading', false)

        if (res.status) {
          commit('set_detailList', res.data.rows || [])
        }

        return res
      }
    },
    modules: {}
  })

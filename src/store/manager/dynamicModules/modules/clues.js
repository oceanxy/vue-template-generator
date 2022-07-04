import apis from '@/apis'
import { message } from 'ant-design-vue'
import { createStoreModule } from '@/store/template'

export default commitRootInModule => createStoreModule({
  state: {
    visibleOfAssignLeads: false,
    visibleOfRecoverClues: false,
    visibleOfDetails: false,
    cluesCountList: []
  },
  mutations: {
    setCluesCountList(state, payload) {
      state.cluesCountList = payload
    }
  },
  actions: {
    /**
     * 收回
     * @param state
     * @param dispatch
     * @param payload
     * @return {Promise<*>}
     */
    async takeBackClues({ state, dispatch }, payload) {
      if (payload.ids === '' || payload.ids.length === 0) {
        message.warn('请选择数据')
        return
      }
      let ids = ''
      if (typeof payload.ids === 'string') {
        ids = payload.ids
      } else {
        ids = payload.ids.join(',')
      }

      const response = await apis.takeBackClues({ ids })

      if (response.status) {
        message.success('收回成功')
        dispatch('getList', { moduleName: payload.moduleName }, { root: true })
      }

      return response.status
    },
    /**
     * 线索状态统计头部列表
     */
    async getCluesCountList({ commit }) {
      const res = await apis.getCluesCountList()

      if (res.status) {
        commit('setCluesCountList', res.data)
      }
    }
  },
  modules: {
    modalOfDetails: {
      state: {
        loading: false,
        search: {},
        list: []
      },
      mutations: {},
      actions: {
        // async progressDetailClues({ commit }, payload) {
        //   const res = await apis.progressDetailClues({ id: payload.id })
        //   if (res.status) {
        //     commit('setList', res.data || [])
        //   }
        // }
      }
    }
  }
})

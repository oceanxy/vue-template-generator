import apis from '@/apis'
import { createStoreModule } from '@/store/template'

export default commitRootInModule => createStoreModule({
  state: {
    visibleOfAssignLeads: false,
    visibleOfRecoverClues: false,
    visibleOfDetails: false,
    cluesCountList: [],
    // 园区团队下拉列表数据（仅本模块专用）
    parkTeamsForSelect: {
      loading: false,
      list: []
    },
    // 园区团队成员下拉列表（仅本模块专用）
    membersOfParkTeamForSelect: {
      loading: false,
      list: []
    }
  },
  mutations: {
    setCluesCountList(state, payload) {
      state.cluesCountList = payload
    }
  },
  actions: {
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
    clueDetails: {
      state: {
        loading: false,
        list: []
      }
    }
  }
})

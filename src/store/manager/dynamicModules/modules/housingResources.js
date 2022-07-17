import { createStoreModule } from '@/store/template'
import apis from '@/apis'

export default commitRootInModule => createStoreModule({
  state: {
    visibleOfContractHistory: false,
    supportingFacilities: []
  },
  mutations: {
    /**
     * 设置配套设施集合
     * @param state
     * @param payload
     */
    setSupportingFacilities(state, payload) {
      state.supportingFacilities = payload
    }
  },
  actions: {
    /**
     * 获取配套设施集合
     * @param commit
     * @param payload
     * @returns {Promise<void>}
     */
    async getSupportingFacilities({ commit }, payload) {
      const response = await apis.getSupportingFacilities()

      if (response.status) {
        commit('setSupportingFacilities', response.data)
      }
    }
  },
  modules: {
    contractHistory: {
      state: {
        loading: false,
        search: {},
        list: [],
        pagination: {
          pageIndex: 0,
          pageSize: 10,
          total: 0
        }
      }
    }
  }
})

/**
 * 通用数据
 * 包括各种枚举、省市区数据等
 */

import apis from '@/apis'

export default {
  namespaced: true,
  state: {
    collapsed: false,
    // 行政区划
    administrativeDivision: [],
    // 默认行政区划
    defaultAdministrativeDivision: []
  },
  mutations: {
    setAdministrativeDivision(state, payload) {
      state.administrativeDivision = payload.treeList || []
      state.defaultAdministrativeDivision = payload.defaultIds || []
    }
  },
  actions: {
    /**
     * 获取行政区划级联数据
     * @param commit
     * @returns {Promise<void>}
     */
    async getAdministrativeDivision({ commit }) {
      const response = await apis.getAdministrativeDivision()

      if (response.status) {
        commit('setAdministrativeDivision', response.data)
      }
    }
  }
}

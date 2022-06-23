/**
 * 通用数据
 * 包括各种枚举、省市区数据等
 */

import apis from '@/apis'

export default {
  namespaced: true,
  state: {
    // 行政区划
    administrativeDivision: [],
    // 默认行政区划
    defaultAdministrativeDivision: [],
    // 园区树
    parkTree: [],
    // 园区下拉列表
    parksForSelect: [],
    // 当前选中的园区树节点的 key（id）
    currentParkTreeKeySelected: '0'
  },
  mutations: {
    setAdministrativeDivision(state, payload) {
      state.administrativeDivision = payload.treeList || []
      state.defaultAdministrativeDivision = payload.defaultIds || []
    },
    setParkTree(state, payload) {
      state.parkTree = payload
    },
    setParksForSelect(state, payload) {
      state.parksForSelect = payload
    },
    setCurrentParkTreeKeySelected(state, payload) {
      if (!payload) {
        payload = '0'
      }

      state.currentParkTreeKeySelected = payload
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
    },
    /**
     * 获取园区树
     * @param commit
     * @returns {Promise<void>}
     */
    async getParkTree({ commit }) {
      const response = await apis.getParkTree()

      if (response.status) {
        commit('setParkTree', response.data)
      }
    },
    /**
     * 获取园区下拉列表
     * @param commit
     * @returns {Promise<void>}
     */
    async getParksForSelect({ commit }) {
      const response = await apis.getParksForSelect()

      if (response.status) {
        commit('setParksForSelect', response.data)
      }
    }
  }
}

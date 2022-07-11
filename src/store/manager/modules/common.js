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
    // 组织机构树
    organizationTree: [],
    // 中心树
    parkTree: [],
    // 角色树
    roleTree: [],
    // 当前选中的中心树节点的 key（id）
    currentParkTreeKeySelected: '0',
    // 中心下拉列表
    parksForSelect: [],
    // 楼栋下拉列表
    buildingsForSelect: [],
    // 楼层树
    floorTree: [],
    // 侧边树
    sideFloorTree: [],
    // 单位下拉列表加载状态
    loadingOfUnitsForSelect: false,
    // 单位下拉列表
    unitsForSelect: [],
    // 问卷下拉列表
    questionnairesForSelect: [],
    // 问卷下拉列表加载状态
    loadingOfQuestionnairesForSelect: false,
    // 所属行业数据
    enterpriseClassifications: {
      loading: false,
      list: []
    }
  },
  mutations: {
    setAdministrativeDivision(state, payload) {
      state.administrativeDivision = payload.treeList || []
      state.defaultAdministrativeDivision = payload.defaultIds || []
    },
    setOrganizationTree(state, payload) {
      state.organizationTree = payload
    },
    setParkTree(state, payload) {
      state.parkTree = payload
    },
    setRoleTree(state, payload) {
      state.roleTree = payload
    },
    setCurrentParkTreeKeySelected(state, payload) {
      state.currentParkTreeKeySelected = payload
    },
    setParksForSelect(state, payload) {
      state.parksForSelect = payload
    },
    setBuildingsForSelect(state, payload) {
      state.buildingsForSelect = payload
    },
    setFloorTree(state, payload) {
      state.floorTree = payload
    },
    setSideFloorTree(state, payload) {
      state.sideFloorTree = payload
    },
    setUnitsForSelect(state, payload) {
      state.unitsForSelect = payload
    },
    setQuestionnairesForSelect(state, payload) {
      state.questionnairesForSelect = payload
    },
    setEnterpriseClassifications(state, payload) {
      state.enterpriseClassifications.list = payload
    }
  },
  actions: {
    /**
     * 设置当前选中的中心树key
     * @param state
     * @param commit
     * @param dispatch
     * @param moduleName {string}
     * @param submoduleName {string}
     * @param value {string}
     * @returns {Promise<void>}
     */
    async setCurrentParkTreeKeySelected({ state, commit, dispatch }, { moduleName, submoduleName, value }) {
      if (state.currentParkTreeKeySelected !== value) {
        dispatch('setSearch', { payload: { treeId: value }, moduleName, submoduleName }, { root: true })
      }

      commit('setCurrentParkTreeKeySelected', value)
    },
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
     * 获取组织机构树
     * @param commit
     * @returns {Promise<void>}
     */
    async getOrganizationTree({ commit }) {
      const response = await apis.getOrganizationTree()

      if (response.status) {
        commit('setOrganizationTree', response.data)
      }
    },
    /**
     * 获取中心树
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
     * 获取角色树
     * @param commit
     * @returns {Promise<void>}
     */
    async getRoleTree({ commit }) {
      const response = await apis.getRoleTree()

      if (response.status) {
        commit('setRoleTree', response.data)
      }
    },
    /**
     * 获取中心下拉列表
     * @param commit
     * @returns {Promise<void>}
     */
    async getParksForSelect({ commit }) {
      const response = await apis.getParksForSelect()

      if (response.status) {
        commit('setParksForSelect', response.data)
      }
    },
    /**
     * 获取楼栋下拉列表
     * @param commit
     * @returns {Promise<void>}
     */
    async getBuildingsForSelect({ commit }) {
      const response = await apis.getBuildingsForSelect()

      if (response.status) {
        commit('setBuildingsForSelect', response.data)
      }
    },
    /**
     * 获取楼层树
     * @param commit
     * @returns {Promise<void>}
     */
    async getFloorTree({ commit }) {
      const response = await apis.getFloorTree()

      if (response.status) {
        commit('setFloorTree', response.data)
      }
    },
    /**
     * 获取侧边栏数据
     * @param commit
     * @returns {Promise<void>}
     */
    async getSideFloorTree({ commit }) {
      const response = await apis.getSideFloorTree()

      if (response.status) {
        commit('setSideFloorTree', response.data)
      }
    },
    /**
     * 获取单位下拉列表
     * @param commit
     * @returns {Promise<void>}
     */
    async getUnitsForSelect({ commit }) {
      commit('setLoading', {
        value: true,
        moduleName: 'common',
        customizeLoading: 'loadingOfUnitsForSelect'
      }, { root: true })

      const response = await apis.getUnitsForSelect()

      if (response.status) {
        commit('setUnitsForSelect', response.data)
      }

      commit('setLoading', {
        value: false,
        moduleName: 'common',
        customizeLoading: 'loadingOfUnitsForSelect'
      }, { root: true })
    },
    async getQuestionnairesForSelect({ commit }) {
      commit('setLoading', {
        value: true,
        moduleName: 'common',
        customizeLoading: 'loadingOfQuestionnairesForSelect'
      }, { root: true })

      const response = await apis.getQuestionnairesForSelect()

      if (response.status) {
        commit('setQuestionnairesForSelect', response.data)
      }

      commit('setLoading', {
        value: false,
        moduleName: 'common',
        customizeLoading: 'loadingOfQuestionnairesForSelect'
      }, { root: true })
    },
    async getEnterpriseClassifications({ commit }) {
      commit('setLoading', {
        value: true,
        moduleName: 'common',
        customizeLoading: 'enterpriseClassifications'
      }, { root: true })

      const response = await apis.getEnterpriseClassifications()

      if (response.status) {
        commit('setEnterpriseClassifications', response.data.dictionaryList)
      }

      commit('setLoading', {
        value: false,
        moduleName: 'common',
        customizeLoading: 'enterpriseClassifications'
      }, { root: true })
    }
  }
}

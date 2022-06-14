import apis from '@/apis'
import { cloneDeep, omit } from 'lodash'

export default {
  /**
   * 获取所有站点应用
   * @param state {Object}
   * @param commit {Function}
   */
  async getAllSiteApps({ commit }) {
    const { status, data } = await apis.getAllSiteApps()

    if (status) {
      commit('setAllSiteApps', data || [])
    }
  },
  /**
   * 获取所有站点模块
   * @param state
   * @param commit
   * @returns {Promise<void>}
   */
  async getAllFunctionalModules({ commit }) {
    const { status, data } = await apis.getAllFunctionalModules()

    if (status) {
      commit('setAllFunctionalModules', data || [])
    }
  },
  /**
   * 获取所有页面
   * @param commit
   * @returns {Promise<void>}
   */
  async getAllPages({ commit }) {
    const { status, data } = await apis.getAllPages()

    if (status) {
      commit('setAllPages', data || [])
    }
  },
  /**
   * 获取列表数据
   * @param state
   * @param commit
   * @param api {string} 获取数据的接口名称。对应 @/apis 内的定义
   * @param moduleName {string}
   * @param [pagination] {Object}
   * @returns {Promise<void>}
   */
  async getList({ state, commit }, { api, moduleName, pagination = {} }) {
    commit('setLoading', { value: true, moduleName })

    const response = await apis[api](omit({
      ...state[moduleName].pagination,
      ...state[moduleName].search,
      ...pagination
    }, 'total'))

    if (response.status) {
      commit('setPagination', {
        moduleName,
        value: {
          ...state[moduleName].pagination,
          pageIndex: response.data.pageIndex,
          pageSize: response.data.pageSize,
          total: response.data.totalNum
        }
      })

      commit('setList', { value: response.data.rows, moduleName })
    }

    commit('setLoading', { value: false, moduleName })
  },
  /**
   * 设置新增/编辑弹窗可见状态
   * @param state
   * @param commit
   * @param statusField {string} store里要设置的状态字段名称
   * @param statusValue {*} store里要设置的状态字段对应的值
   * @param moduleName {string} 要设置的状态所在的store模块的名称
   */
  setModalVisible({ state, commit }, { statusField, statusValue, moduleName }) {
    commit('setModalVisible', {
      field: statusField || 'visibleOfEdit',
      value: statusValue,
      moduleName: moduleName
    })
  },
  /**
   * 设置当前正在操作的对象为一个新的副本
   * @param state
   * @param commit
   * @param payload {{value: *, moduleName: string}}
   */
  setCurrentItem({ state, commit }, payload) {
    commit('setCurrentItem', cloneDeep(payload || {}))
  }
}

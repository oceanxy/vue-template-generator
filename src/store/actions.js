import apis from '@/apis'
import { cloneDeep, omit } from 'lodash'
import utilityFunction from '@/utils/utilityFunction'
import config from '@/config'
export default {
  /**
   * 设置搜索参数
   * @param state
   * @param commit
   * @param dispatch
   * @param moduleName {string}
   * @param submoduleName {string}
   * @param payload {Object}
   */
  async setSearch({ state, commit, dispatch }, { moduleName, submoduleName, payload }) {
    commit('setSearch', {
      payload: {
        ...(!submoduleName ? state[moduleName] : state[moduleName][submoduleName]).search,
        ...payload
      },
      moduleName,
      submoduleName
    })

    await dispatch(
      'getList',
      {
        moduleName,
        submoduleName,
        additionalQueryParameters: { pageIndex: 0 }
      },
      { root: true }
    )
  },
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
   * @param moduleName {string} 模块名
   * @param submoduleName {string} 子模块名
   * @param additionalQueryParameters {Object} 附加查询参数。例如分页相关参数，园区ID等。
   * @param stateName {string} 需要设置的字段，默认 state.list
   * @returns {Promise<void>}
   */
  async getList({ state, commit }, { moduleName, submoduleName, additionalQueryParameters = {}, stateName }) {
    commit('setLoading', { value: true, moduleName, submoduleName })

    let api = 'getList'
    if (!config.mock) {
      api = `get${
        submoduleName ? `${utilityFunction.firstLetterToUppercase(submoduleName)}Of` : ''
      }${utilityFunction.firstLetterToUppercase(moduleName)}`
    }
    let response

    if (!submoduleName) {
      response = await apis[api](
        omit(
          {
            ...state[moduleName].pagination,
            ...state[moduleName].search,
            ...additionalQueryParameters
          },
          'total'
        )
      )
    } else {
      response = await apis[api](
        omit(
          {
            ...state[moduleName][submoduleName].pagination,
            ...state[moduleName][submoduleName].search,
            ...additionalQueryParameters
          },
          'total'
        )
      )
    }

    if (response.status) {
      commit('setPagination', {
        moduleName,
        submoduleName,
        value: {
          ...(!submoduleName ? state[moduleName] : state[moduleName][submoduleName]).pagination,
          pageIndex: response.data.pageIndex,
          pageSize: response.data.pageSize,
          total: response.data.totalNum
        }
      })
      if ('rows' in response.data) {
        commit('setList', {
          value: response.data.rows,
          moduleName,
          submoduleName,
          stateName
        })
      } else {
        commit('setList', { value: response.data, moduleName, submoduleName, stateName })
      }
    }

    commit('setLoading', { value: false, moduleName, submoduleName })
  },
  /**
   * 获取详情数据
   * @param state
   * @param commit
   * @param moduleName {string} 模块名
   * @param submoduleName {string} 子模块名
   * @param additionalQueryParameters {Object} 附加查询参数。例如分页相关参数，园区ID等。
   * @param stateName {string} 需要设置的字段，默认 state.details
   * @returns {Promise<void>}
   */
  async getDetails({ state, commit }, { moduleName, submoduleName, additionalQueryParameters = {}, stateName }) {
    commit('setLoading', { value: true, moduleName, submoduleName })

    const query = {
      ...state[moduleName].currentItem,
      ...additionalQueryParameters
    }
    const api = !config.mock ? `getDetailsOf${utilityFunction.firstLetterToUppercase(moduleName)}` : 'getDetails'
    const res = await apis[api](query)
    if (res.status) {
      commit('setDetails', { value: res.data, moduleName, submoduleName, stateName })
    }

    commit('setLoading', { value: false, moduleName, submoduleName })
  },
  /**
   * 新增数据
   * @param state
   * @param dispatch
   * @param moduleName {string}
   * @param payload {Object}
   * @param visibleField {string}
   * @returns {Promise<*>}
   */
  async add({ state, dispatch }, { moduleName, payload, visibleField }) {
    const response = await apis[`add${utilityFunction.firstLetterToUppercase(moduleName)}`](payload)

    if (response.status) {
      dispatch('setModalVisible', {
        statusField: visibleField,
        statusValue: false,
        moduleName
      })

      dispatch('getList', {
        moduleName,
        additionalQueryParameters: {
          pageIndex: 0
        }
      })
    }

    return response.status
  },
  /**
   * 更新数据
   * @param state
   * @param dispatch
   * @param moduleName {string}
   * @param payload {Object}
   * @param visibleField {string}
   * @param isFetchList {boolean}
   * @param customApiName {string} 自定义请求API
   * @returns {Promise<*>}
   */
  async update({ state, dispatch }, { moduleName, payload, visibleField, isFetchList, customApiName }) {
    const response = await apis[customApiName || `update${utilityFunction.firstLetterToUppercase(moduleName)}`](payload)

    if (response.status) {
      dispatch('setModalVisible', {
        statusField: visibleField,
        statusValue: false,
        moduleName
      })

      if (isFetchList) {
        dispatch('getList', { moduleName })
      }
    }

    return response.status
  },
  /**
   * 更新状态
   * @param commit
   * @param moduleName {string}
   * @param payload {Object}
   * @returns {Promise<*>}
   */
  async updateStatus({ commit }, { moduleName, payload }) {
    commit('setLoading', { value: true, moduleName })

    const { status } = await apis[`update${utilityFunction.firstLetterToUppercase(moduleName)}Status`](payload)

    commit('setLoading', { value: false, moduleName })

    return status
  },
  /**
   * 删除站点应用
   * @param state
   * @param dispatch
   * @param commit
   * @param moduleName {string}
   * @param ids {Array}
   * @returns {Promise<*>}
   */
  async delete({ state, dispatch, commit }, { moduleName, ids }) {
    commit('setLoading', { value: true, moduleName })

    if (!ids?.length) {
      ids = state[moduleName].selectedRowKeys
    }

    const response = await apis[`delete${utilityFunction.firstLetterToUppercase(moduleName)}`]({ ids: ids.join() })

    if (response.status) {
      // 删除数据后，刷新分页数据，避免请求不存在的页码
      if (state[moduleName].list.length - ids.length <= 0 && state[moduleName].pagination.pageIndex > 0) {
        commit('setPagination', {
          value: { pageIndex: --state[moduleName].pagination.pageIndex },
          moduleName
        })
      }

      // 重新请求数据
      dispatch('getList', { moduleName })
    } else {
      commit('setLoading', { value: false, moduleName })
    }

    return response.status
  },
  /**
   * 导出xlsx
   * @param {*} store{}
   * @param {*} param{}
   * @returns
   */
  async downExcel({ state }, { moduleName, submoduleName, additionalQueryParameters, fileName }) {
    let api = 'getExcel'
    if (!config.mock) {
      api = `getExcel${
        submoduleName ? `${utilityFunction.firstLetterToUppercase(submoduleName)}Of` : ''
      }${utilityFunction.firstLetterToUppercase(moduleName)}`
    }

    const payload = {
      ...additionalQueryParameters
    }

    if (submoduleName) {
      Object.assign(payload, state[moduleName][submoduleName].search)
    } else {
      Object.assign(payload, state[moduleName].search)
    }

    const buffer = await apis[api](payload)
    const blob = new Blob([buffer])
    utilityFunction.downFile(blob, `${fileName}.xlsx`)

    return buffer
  },
  /**
   * 设置新增/编辑弹窗可见状态
   * @param commit
   * @param [statusField] {string} store里要设置的状态字段名称
   * @param statusValue {*} store里要设置的状态字段对应的值
   * @param moduleName {string} 要设置的状态所在的store模块的名称
   */
  setModalVisible({ commit }, { statusField, statusValue, moduleName }) {
    commit('setModalVisible', {
      field: statusField || 'visibleOfEdit',
      value: statusValue,
      moduleName: moduleName
    })
  },
  /**
   * 设置当前正在操作的对象为一个新的副本
   * @param commit
   * @param moduleName {string}
   * @param value {Object}
   */
  setCurrentItem({ commit }, { moduleName, value }) {
    commit('setCurrentItem', { moduleName, value: cloneDeep(value) || {} })
  },
  /**
   * 设置选中的行（主要用于批量操作）
   * @param commit
   * @param state
   * @param moduleName {string}
   * @param payload {{selectedRowKeys: string[], selectedRows: Object[]}}
   */
  setRowSelected({ commit, state }, { moduleName, payload }) {
    commit('setRowSelected', { moduleName, payload })
  }
}

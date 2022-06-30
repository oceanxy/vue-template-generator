import apis from '@/apis'
import { cloneDeep, omit } from 'lodash'
import UF from '@/utils/utilityFunction'
import config from '@/config'

export default {
  /**
   * 设置搜索参数
   * @param state
   * @param commit
   * @param dispatch
   * @param moduleName {string}
   * @param submoduleName {string}
   * @param additionalQueryParameters {Object} 需要传递给查询的附加参数
   * @param payload {Object}
   */
  async setSearch({ state, commit, dispatch }, {
    moduleName,
    submoduleName,
    payload,
    additionalQueryParameters
  }) {
    commit('setSearch', {
      payload,
      moduleName,
      submoduleName
    })

    const hasPagination = 'pagination' in (submoduleName ? state[moduleName][submoduleName] : state[moduleName])

    additionalQueryParameters = {
      ...additionalQueryParameters,
      ...(hasPagination ? { pageIndex: 0 } : {})
    }

    await dispatch(
      'getList',
      {
        moduleName,
        submoduleName,
        additionalQueryParameters
      },
      { root: true }
    )
  },
  /**
   * 获取列表数据
   * @param state
   * @param commit
   * @param moduleName {string} 模块名
   * @param submoduleName {string} 子模块名
   * @param additionalQueryParameters {Object} 附加查询参数。例如分页相关参数，中心ID等。
   * @param stateName {string} 需要设置的字段，默认 state.list
   * @returns {Promise<void>}
   */
  async getList({ state, commit }, { moduleName, submoduleName, additionalQueryParameters = {}, stateName }) {
    commit('setLoading', { value: true, moduleName, submoduleName })

    let response
    let api = 'getList'

    if (!config.mock) {
      api = `get${
        submoduleName
          ? `${UF.firstLetterToUppercase(submoduleName)}Of`
          : ''
      }${
        UF.firstLetterToUppercase(moduleName)
      }`
    }

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
      let hasPagination

      if (submoduleName) {
        hasPagination = 'pagination' in state[moduleName][submoduleName]
      } else {
        hasPagination = 'pagination' in state[moduleName]
      }

      if (hasPagination) {
        commit('setPagination', {
          moduleName,
          submoduleName,
          value: {
            pageIndex: response.data.pageIndex,
            pageSize: response.data.pageSize,
            total: response.data.totalNum
          }
        })
      }

      commit('setList', {
        value: 'rows' in response.data ? response.data.rows : response.data,
        moduleName,
        submoduleName,
        stateName
      })
    }

    commit('setLoading', { value: false, moduleName, submoduleName })
  },
  /**
   * 获取详情数据
   * @param state
   * @param commit
   * @param moduleName {string} 模块名
   * @param submoduleName {string} 子模块名
   * @param additionalQueryParameters {Object} 附加查询参数。例如分页相关参数，中心ID等。
   * @param stateName {string} 需要设置的字段，默认 state.details
   * @returns {Promise<void>}
   */
  async getDetails({ state, commit }, { moduleName, submoduleName, additionalQueryParameters = {}, stateName }) {
    commit('setLoading', { value: true, moduleName, submoduleName })

    const query = {
      ...state[moduleName].currentItem,
      ...additionalQueryParameters
    }
    const api = !config.mock ? `getDetailsOf${UF.firstLetterToUppercase(moduleName)}` : 'getDetails'
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
    const response = await apis[`add${UF.firstLetterToUppercase(moduleName)}`](payload)

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
    const response = await apis[customApiName || `update${UF.firstLetterToUppercase(moduleName)}`](payload)

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
  async custom({ state, dispatch }, { moduleName, payload, visibleField, isFetchList, customApiName }) {
    const response = await apis[customApiName](payload)

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
   * @param customFieldName {string} 自定义字段名 默认 status
   * @returns {Promise<*>}
   */
  async updateStatus({ commit }, { moduleName, payload, customFieldName }) {
    commit('setLoading', { value: true, moduleName })

    const api = `update${UF.firstLetterToUppercase(moduleName)}${UF.firstLetterToUppercase(customFieldName)}`

    const { status } = await apis[api](payload)

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

    const response = await apis[`delete${UF.firstLetterToUppercase(moduleName)}`]({ ids: ids.join() })

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
        submoduleName ? `${UF.firstLetterToUppercase(submoduleName)}Of` : ''
      }${UF.firstLetterToUppercase(moduleName)}`
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
    UF.downFile(blob, `${fileName}.xlsx`)

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

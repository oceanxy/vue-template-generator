import apis from '@/apis'
import { cloneDeep, omit } from 'lodash'
import UF from '@/utils/utilityFunction'
import config from '@/config'

export default {
  /**
   * 设置搜索参数（合并设置）
   * @param state
   * @param commit
   * @param dispatch
   * @param moduleName {string}
   * @param submoduleName {string}
   * @param [isFetchList=true] {boolean} 是否触发页面列表数据更新的请求，默认true
   * @param [isResetSelectedRows] {Boolean} 是否在成功执行后重置对应 store 内 selectedRows，默认false。一般在批量操作时使用
   * @param payload {Object} 数据列表的常驻查询对象，一般定义在Inquiry组件中
   * @param additionalQueryParameters {Object} 需要传递给查询(获取列表数据)的附加参数。
   *  （额外附加查询参数，例如其他页面跳转过来时携带的参数 id 等非本页固有的查询参数）
   */
  async setSearch({
    state,
    commit,
    dispatch
  }, {
    moduleName,
    submoduleName,
    isFetchList = true,
    payload,
    isResetSelectedRows,
    additionalQueryParameters
  }) {
    commit('setSearch', {
      payload,
      moduleName,
      submoduleName
    })

    if (isFetchList) {
      const hasPagination = 'pagination' in (submoduleName ? state[moduleName][submoduleName] : state[moduleName])

      additionalQueryParameters = {
        ...additionalQueryParameters,
        ...(hasPagination ? { pageIndex: 0 } : {})
      }

      if (isResetSelectedRows) {
        commit('setRowSelected', {
          moduleName,
          submoduleName,
          payload: {
            selectedRowKeys: [],
            selectedRows: []
          }
        })
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
    }
  },
  /**
   * 获取列表数据
   * @param state
   * @param commit
   * @param moduleName {string} 模块名
   * @param [submoduleName] {string} 子模块名
   * @param [additionalQueryParameters] {Object} 附加查询参数。例如分页相关参数，ID等。
   * @param [stateName] {string} 需要设置的字段，默认 state.list
   * @param [customApiName] {string} 自定义请求api的名字
   * @param [merge] {boolean} 是否合并数据，默认false，主要用于“加载更多”功能
   * @returns {Promise<void>}
   */
  async getList({ state, commit }, {
    moduleName,
    submoduleName,
    additionalQueryParameters = {},
    stateName,
    customApiName,
    merge
  }) {
    const targetModuleName = state[moduleName][submoduleName] ?? state[moduleName]

    commit('setLoading', {
      value: true,
      moduleName,
      submoduleName
    })

    let api = 'getList'

    if (!config.mock) {
      if (customApiName) {
        api = customApiName
      } else {
        api = `get${submoduleName ? `${
          UF.firstLetterToUppercase(submoduleName)
        }Of` : ''}${
          UF.firstLetterToUppercase(moduleName)
        }`
      }
    }

    const response = await apis[api](
      omit(
        {
          ...targetModuleName.pagination,
          ...targetModuleName.search,
          ...additionalQueryParameters
        },
        'total'
      )
    )

    if (response.status) {
      const data = response.data.paginationObj || response.data
      const sortFieldList = response.data.sortFieldList || []
      let rows = data.rows || data

      if ('pagination' in targetModuleName) {
        commit('setPagination', {
          moduleName,
          submoduleName,
          value: {
            pageIndex: data.pageIndex,
            pageSize: data.pageSize,
            total: data.totalNum
          }
        })
      }

      if (merge) {
        rows = [
          ...targetModuleName[stateName || 'list'],
          ...rows
        ]
      }

      if (sortFieldList?.length) {
        commit('setState', {
          value: sortFieldList,
          moduleName,
          submoduleName,
          stateName: 'sortFieldList'
        })
      }

      commit('setList', {
        value: rows,
        moduleName,
        submoduleName,
        stateName
      })
    }

    commit('setLoading', {
      value: false,
      moduleName,
      submoduleName
    })

    return response.status
  },
  /**
   * 获取详情数据
   * @param state
   * @param commit
   * @param moduleName {string} 模块名
   * @param submoduleName {string} 子模块名
   * @param payload {Object} 查询参数
   * @param stateName {string} 需要设置的字段，默认 state.details
   * @returns {Promise<void>}
   */
  async getDetails({ state, commit }, {
    moduleName,
    submoduleName,
    payload = {},
    stateName
  }) {
    commit('setLoading', {
      value: true, moduleName, submoduleName
    })

    let api = 'getDetails'

    if (!config.mock) {
      api = `getDetailsOf${UF.firstLetterToUppercase(moduleName)}${
        submoduleName ? UF.firstLetterToUppercase(submoduleName) : ''
      }`
    }

    const res = await apis[api](payload)

    if (res.status) {
      commit('setState', {
        value: res.data,
        moduleName,
        submoduleName,
        stateName
      })
    }

    commit('setLoading', {
      value: false,
      moduleName,
      submoduleName
    })

    return res
  },
  /**
   * 新增数据
   * @param state
   * @param dispatch
   * @param moduleName {string} 模块名
   * @param payload {Object} 参数
   * @param visibleField {string} 控制弹窗显示的字段名
   * @param parametersOfGetListAction {...{
   *  moduleName: string;
   *  submoduleName: string;
   *  additionalQueryParameters: {};
   *  stateName: string;
   *  customApiName: string
   * }} 用于操作后刷新列表的参数
   * @returns {Promise<*>}
   */
  async add({ state, dispatch }, {
    moduleName,
    payload,
    visibleField,
    ...parametersOfGetListAction
  }) {
    const response = await apis[`add${UF.firstLetterToUppercase(moduleName)}`](payload)

    if (response.status) {
      dispatch('setModalVisible', {
        statusField: visibleField,
        statusValue: false,
        moduleName
      })

      dispatch('getList', {
        moduleName,
        ...parametersOfGetListAction,
        additionalQueryParameters: {
          ...parametersOfGetListAction?.additionalQueryParameters,
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
   * @param moduleName {string} 模块名
   * @param payload {Object} 参数
   * @param visibleField {string} 控制弹窗显示的字段名
   * @param customApiName {string} 自定义请求API
   * @param isFetchList {boolean} 默认 false。当为 true 时，请特别注意参数问题（parametersOfGetListAction）
   * @param parametersOfGetListAction {...{
   *  moduleName: string;
   *  submoduleName: string;
   *  additionalQueryParameters: {};
   *  stateName: string;
   *  customApiName: string
   * }} 用于操作后刷新列表的参数，依赖 isFetchList
   * @returns {Promise<*>}
   */
  async update({ state, dispatch }, {
    moduleName,
    payload,
    visibleField,
    customApiName,
    isFetchList,
    ...parametersOfGetListAction
  }) {
    const response = await apis[customApiName || `update${UF.firstLetterToUppercase(moduleName)}`](payload)

    if (response.status) {
      dispatch('setModalVisible', {
        statusField: visibleField,
        statusValue: false,
        moduleName
      })

      if (isFetchList) {
        dispatch('getList', {
          moduleName,
          ...parametersOfGetListAction
        })
      }
    }

    return response.status
  },
  /**
   * 通常仅用于除“新增”和“更新”外的表单提交类数据接口。
   * “新增”和“更新”请使用对应的 add 或 update 专用 action。
   * 如有不适用于其他 action 的场景时，再考虑使用本 action。
   * @param state
   * @param dispatch
   * @param commit
   * @param payload {Object} 参数
   * @param customApiName {string} 自定义请求API
   * @param [isResetSelectedRows] {Boolean} 是否在成功执行后重置对应 store 内 selectedRows，默认false。一般在批量操作时使用
   * @param [stateName] {string} 用于接收接口返回值的 state 字段名称，在相应模块的 store.state 内定义
   * @param [moduleName] {string} 模块名
   * @param [submoduleName] {string} 子级模块名
   * @param [visibleField] {string} 成功执行操作后要关闭的弹窗的控制字段（定义在对应模块的 store.state 内）
   * @param [isFetchList] {boolean} 是否在成功提交后刷新本模块列表，默认false
   * @param parametersOfGetListAction {...{
   *  additionalQueryParameters: {};
   *  stateName: string;
   *  customApiName: string
   * }} 用于操作后刷新列表的参数，依赖 isFetchList
   * @returns {Promise<*>}
   */
  async custom({
    state,
    dispatch,
    commit
  }, {
    payload,
    customApiName,
    isResetSelectedRows,
    stateName,
    moduleName,
    submoduleName,
    visibleField,
    isFetchList,
    ...parametersOfGetListAction
  }) {
    const response = await apis[customApiName](payload)

    if (response.status) {
      if (visibleField) {
        dispatch('setModalVisible', {
          statusField: visibleField,
          statusValue: false,
          moduleName,
          submoduleName
        })
      }

      if (isFetchList) {
        dispatch('getList', {
          moduleName,
          submoduleName,
          ...parametersOfGetListAction
        })
      }

      if (stateName) {
        commit('setState', {
          value: response.data,
          moduleName,
          submoduleName,
          stateName
        })
      }

      if (isResetSelectedRows) {
        commit('setRowSelected', {
          moduleName,
          submoduleName,
          payload: {
            selectedRowKeys: [],
            selectedRows: []
          }
        })
      }
    }

    return response.status
  },
  /**
   * 获取下拉列表数据或包含下拉列表数据的对象。
   * 专用于 store 内定义为类似如下数据结构的 state 请求数据：
   *    [stateName]: { list?: Array, data?: Object, loading: Boolean }
   * @param state
   * @param dispatch
   * @param commit
   * @param moduleName {string}
   * @param submoduleName {string}
   * @param stateName {string} 自定义 state 的名称
   * @param payload {Object} 请求参数
   * @param customApiName {string} 自定义请求数据 api 的名称
   * @returns {Promise<*>}
   */
  async getListForSelect(
    {
      state,
      dispatch,
      commit
    },
    {
      moduleName,
      submoduleName,
      stateName,
      payload,
      customApiName
    }
  ) {
    commit('setLoading', {
      value: true,
      moduleName,
      submoduleName,
      customizeLoading: stateName
    })

    const response = await apis[customApiName](payload)

    if (response.status) {
      const data = response.data
      let result

      if (Array.isArray(data)) {
        result = data
      } else {
        if ('rows' in data) {
          result = data.rows || []
        } else {
          result = data
        }
      }

      commit('setList', {
        value: result,
        moduleName,
        submoduleName,
        stateName
      })
    }

    commit('setLoading', {
      value: false,
      moduleName,
      submoduleName,
      customizeLoading: stateName
    })

    return true
  },
  /**
   * 更新状态
   * @param commit
   * @param moduleName {string}
   * @param payload {Object}
   * @param customFieldName {string} 自定义字段名 默认 status
   * @returns {Promise<*>}
   */
  async updateStatus({ commit }, {
    moduleName,
    payload,
    customFieldName
  }) {
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
   * @param submoduleName {string}
   * @param ids {Array}
   * @param additionalQueryParameters {Object} 删除成功后刷新列表的参数（注意此参数非删除参数）
   * @returns {Promise<*>}
   */
  async delete({
    state,
    dispatch,
    commit
  }, {
    moduleName,
    submoduleName,
    ids,
    additionalQueryParameters
  }) {
    let isBatchDeletion = false
    const selectedRows = state[moduleName][submoduleName]?.selectedRows ?? state[moduleName].selectedRows
    const selectedRowKeys = state[moduleName][submoduleName]?.selectedRowKeys ?? state[moduleName].selectedRowKeys
    const newSelectedRows = []
    const newSelectedRowKeys = []

    commit('setLoading', { value: true, moduleName })

    // 通过 forFunction 混合调用时，一般为批量操作，即勾选了行选择框的操作，
    // 需要更新对应 store 模块内的 selectedRowKeys 和 selectedRows。
    if (!ids?.length) {
      ids = selectedRowKeys
      isBatchDeletion = true
    }

    const response = await apis[`delete${UF.firstLetterToUppercase(moduleName)}`]({ ids: ids.join() })

    if (response.status) {
      // 非批量操作时，只从选中行数组中移除被删除的行的key，
      // 批量操作时，直接清空选中行数组
      if (selectedRows?.length && !isBatchDeletion) {
        const index = newSelectedRowKeys.findIndex(key => key === ids[0])

        if (index > 0) {
          newSelectedRowKeys.splice(index, 1)
          selectedRows.splice(index, 1)
        }
      }

      commit('setRowSelected', {
        moduleName,
        submoduleName,
        payload: {
          selectedRowKeys: newSelectedRowKeys,
          selectedRows: newSelectedRows
        }
      })

      // 删除数据后，刷新分页数据，避免请求不存在的页码
      if (state[moduleName].list.length <= ids.length && state[moduleName].pagination.pageIndex > 0) {
        const { pageIndex, pageSize } = state[moduleName].pagination

        commit('setPagination', {
          value: {
            pageIndex: pageIndex - (
              ids.length % pageSize > state[moduleName].list.length
                ? Math.ceil(ids.length / pageSize)
                : Math.floor(ids.length / pageSize)
            )
          },
          moduleName
        })
      }

      // 重新请求数据
      dispatch('getList', {
        moduleName,
        submoduleName,
        additionalQueryParameters
      })
    } else {
      commit('setLoading', { value: false, moduleName })
    }

    return response.status
  },
  /**
   * 导出
   * @param state
   * @param dispatch
   * @param moduleName {string}
   * @param submoduleName {string}
   * @param payload {Object} 参数。不从 store.state.search 直接获取，因为 store.state.search 对象在未点击搜索按钮之前是没有值的
   * @param additionalQueryParameters {Object} 附加参数。例如其他页面跳转带过来的参数
   * @param fileName {string} 不包含后缀名
   * @param [customApiName] {string} 自定义请求api的名字
   * @param [visibleField] {string} 成功导出后要关闭的弹窗的控制字段（定义在对应模块的 store.state 内）
   * @returns {Promise<*>}
   */
  async export({ state, dispatch }, {
    moduleName,
    submoduleName,
    payload,
    additionalQueryParameters,
    fileName,
    customApiName,
    visibleField
  }) {
    let api = 'export'
    const targetModuleName = state[moduleName][submoduleName] ?? state[moduleName]

    if (!config.mock) {
      if (customApiName) {
        api = customApiName
      } else {
        api = `export${submoduleName ? `${
          UF.firstLetterToUppercase(submoduleName)}Of` : ''
        }${
          UF.firstLetterToUppercase(moduleName)
        }`
      }
    }

    const params = cloneDeep({ ...additionalQueryParameters, ...payload })
    const buffer = await apis[api]({ ...targetModuleName.search, ...params })
    const blob = new Blob([buffer])

    UF.downFile(blob, `${fileName}.xlsx`)

    if (visibleField) {
      dispatch('setModalVisible', {
        statusField: visibleField,
        statusValue: false,
        moduleName,
        submoduleName
      })
    }

    return buffer
  },
  /**
   * 设置新增/编辑弹窗可见状态
   * @param commit
   * @param [statusField] {string} store里要设置的状态字段名称
   * @param statusValue {*} store里要设置的状态字段对应的值
   * @param moduleName {string} 要设置的状态所在的store模块的名称
   * @param submoduleName {string} 要设置的状态所在的store子模块的名称，依赖 moduleName
   */
  setModalVisible({ commit }, {
    statusField,
    statusValue,
    moduleName,
    submoduleName
  }) {
    commit('setModalVisible', {
      field: statusField || 'visibleOfEdit',
      value: statusValue,
      moduleName,
      submoduleName
    })
  },
  /**
   * 设置当前正在操作的对象为一个新的副本
   * @param state
   * @param commit
   * @param moduleName {string}
   * @param value {Object}
   * @param merge {boolean} 是否是合并操作
   */
  setCurrentItem({ state, commit }, {
    moduleName,
    value,
    merge = false
  }) {
    if (!merge) {
      commit('setCurrentItem', {
        moduleName,
        value: cloneDeep(value) || {}
      })
    } else {
      commit('setCurrentItem', {
        moduleName,
        value: {
          ...state[moduleName].currentItem,
          ...cloneDeep(value)
        } || {}
      })
    }
  },
  /**
   * 设置选中的行（主要用于批量操作）
   * @param commit
   * @param state
   * @param payload {{selectedRowKeys: string[], selectedRows: Object[]}}
   * @param moduleName {string}
   * @param [submoduleName] {string}
   */
  setRowSelected({ commit, state }, {
    moduleName,
    submoduleName,
    payload
  }) {
    commit('setRowSelected', {
      moduleName,
      submoduleName,
      payload
    })
  }
}

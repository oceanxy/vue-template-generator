import { cloneDeep } from 'lodash'

export default {
  /**
   * 设置数据列表的loading
   * @param {Object} state
   * @param {boolean} value - 状态值
   * @param {string} moduleName - 模块名
   * @param {string} [submoduleName] - 子模块名称
   * @param {string | Object | Array} [stateName='loading'] - `loading`状态值的字段名。
   * - 该值指向一个对象时，`loading`状态值的取值为`[loadingFieldName].loading`，其结构一般为`{ loading: boolean, list: Array }`;
   * - 该值指向一个数组时，`loading`状态值的取值为`store.state`中`loadingFieldName`字段所在对象中的`loading`字段，
   *   其结构一般为`{ ..., loading: boolean, [loadingFieldName]: Array }`;
   * - 非以上两种情况时，`loading`状态值的取值为`loadingFieldName`。
   */
  setLoading(state, {
    value,
    moduleName,
    submoduleName,
    stateName
  }) {
    if (submoduleName) {
      if (Object.prototype.toString.call(state[moduleName][submoduleName][stateName]) === '[object Object]') {
        state[moduleName][submoduleName][stateName].loading = value
      } else if (Object.prototype.toString.call(state[moduleName][submoduleName][stateName]) === '[object Array]') {
        state[moduleName][submoduleName].loading = value
      } else {
        state[moduleName][submoduleName][stateName || 'loading'] = value
      }
    } else {
      if (Object.prototype.toString.call(state[moduleName][stateName]) === '[object Object]') {
        state[moduleName][stateName].loading = value
      } else if (Object.prototype.toString.call(state[moduleName][stateName]) === '[object Array]') {
        state[moduleName].loading = value
      } else {
        state[moduleName][stateName || 'loading'] = value
      }
    }
  },
  /**
   * 设置列表搜索参数（合并设置）
   * @param {Object} state
   * @param {Object} payload
   * @param {string} moduleName
   * @param {string} submoduleName
   */
  setSearch(state, {
    payload,
    moduleName,
    submoduleName
  }) {
    const targetModule = submoduleName ? state[moduleName][submoduleName] : state[moduleName]

    if ('pagination' in targetModule) {
      targetModule.pagination.pageIndex = 0
    }

    if ('search' in targetModule) {
      targetModule.search = {
        ...targetModule.search,
        ...payload
      }
    }
  },
  /**
   * 设置当前的临时数据对象
   * currentItem: 当前页面正在操作的临时数据对象。如新增，编辑等需要临时保存数据的对象
   * @param {Object} state
   * @param {Object} value
   * @param {string} moduleName
   */
  setCurrentItem(state, { value, moduleName }) {
    state[moduleName].currentItem = { ...cloneDeep(value) }
  },
  /**
   * 设置表格选中的行数据
   * @param state
   * @param {string[]} [selectedRowKeys]
   * @param {Object[]} [selectedRows]
   * @param {string} moduleName
   * @param {string} [submoduleName]
   */
  setRowSelected(state, {
    payload: { selectedRowKeys, selectedRows },
    moduleName,
    submoduleName
  }) {
    if (!submoduleName) {
      state[moduleName].selectedRowKeys = selectedRowKeys || []
      state[moduleName].selectedRows = selectedRowKeys.map(
        key => [...state[moduleName].selectedRows, ...selectedRows]
          // 默认值 'id'。防止出现在 vuex 模块的 state 中未定义 rowKey 字段造成取不到选中行对象中的唯一键的问题。通常出现在子模块的 state 中。
          .find(row => row[state[moduleName].rowKey || 'id'] === key)
      )
    } else {
      state[moduleName][submoduleName].selectedRowKeys = selectedRowKeys || []
      state[moduleName][submoduleName].selectedRows = selectedRowKeys.map(
        key => [...state[moduleName][submoduleName].selectedRows, ...selectedRows]
          .find(row => row[state[moduleName][submoduleName].rowKey || 'id'] === key)
      )
    }
  },
  /**
   * 设置分页信息
   * @param {Object} state
   * @param {Object} value
   * @param {string} moduleName
   * @param {string} submoduleName
   */
  setPagination(state, {
    value,
    moduleName,
    submoduleName
  }) {
    if (!submoduleName) {
      state[moduleName].pagination = {
        ...state[moduleName].pagination,
        ...value
      }
    } else {
      state[moduleName][submoduleName].pagination = {
        ...state[moduleName][submoduleName].pagination,
        ...value
      }
    }
  },
  /**
   * 设置列表数据
   * @param {Object} state
   * @param {Object[]} value
   * @param {string} moduleName
   * @param {string} submoduleName
   * @param {string} stateName - 需要设置的字段，默认 state.list
   */
  setList(state, {
    value = [],
    moduleName,
    submoduleName,
    stateName
  }) {
    if (!submoduleName) {
      // 判断 store 内自定义状态的类型
      if (Object.prototype.toString.call(state[moduleName][stateName]) === '[object Object]') {
        // 判断接口返回值的类型
        if (Object.prototype.toString.call(value) === '[object Object]') {
          // 判断 store 自定义状态对象的属性是否包含 data 属性
          if ('data' in state[moduleName][stateName]) {
            state[moduleName][stateName].data = value
          } else {
            // 数据结构为自定义的结构，（即非 {loading: boolean, data: {}} 或 {loading: boolean, list: []} 的结构）
            state[moduleName][stateName] = {
              ...state[moduleName][stateName],
              ...value
            }
          }
        } else if (Array.isArray(value)) {
          state[moduleName][stateName].list = value
        } else {
          state[moduleName][stateName].data = value
        }
      } else {
        state[moduleName][stateName || 'list'] = value
      }
    } else {
      if (Object.prototype.toString.call(state[moduleName][submoduleName][stateName]) === '[object Object]') {
        if (Object.prototype.toString.call(value) === '[object Object]') {
          if ('data' in state[moduleName][submoduleName][stateName]) {
            state[moduleName][submoduleName][stateName].data = value
          } else {
            // 数据结构为自定义的结构，（即非 {loading: boolean, data: {}} 或 {loading: boolean, list: []} 的结构）
            state[moduleName][submoduleName][stateName] = {
              ...state[moduleName][submoduleName][stateName],
              ...value
            }
          }
        } else if (Array.isArray(value)) {
          state[moduleName][submoduleName][stateName].list = value
        } else {
          state[moduleName][submoduleName][stateName].data = value
        }
      } else {
        state[moduleName][submoduleName][stateName || 'list'] = value
      }
    }
  },
  /**
   * 设置数据
   * @param {Object} state
   * @param {Array | Object} value - 设置的值
   * @param {string} moduleName - 模块名
   * @param {string} [submoduleName] - 子模块名
   * @param {string} stateName - 需要设置的字段，默认 state.details
   * @param {boolean} merge - 是否需要将新值与旧值合并（相同属性会被新值覆盖），默认false
   */
  setState(state, {
    value,
    moduleName,
    submoduleName,
    stateName,
    merge
  }) {
    if (!submoduleName) {
      state[moduleName][stateName] = merge
        ? Array.isArray(state[moduleName][stateName])
          ? state[moduleName][stateName].concat(value)
          : {
            ...state[moduleName][stateName],
            ...value
          }
        : value
    } else {
      state[moduleName][submoduleName][stateName] = merge
        ? Array.isArray(state[moduleName][stateName])
          ? state[moduleName][submoduleName][stateName].concat(value)
          : {
            ...state[moduleName][submoduleName][stateName],
            ...value
          }
        : value
    }
  },
  /**
   * 设置modal的可见性
   * @param state
   * @param {string} field - 对应modal的显示字段
   * @param {any} value - 要设置的值
   * @param {string} moduleName - 模块名称
   * @param {string} [submoduleName] - 子模块名称
   */
  setModalVisible(state, {
    field,
    value,
    moduleName,
    submoduleName = ''
  }) {
    if (!submoduleName) {
      state[moduleName][field] = value
    } else {
      if (field in state[moduleName][submoduleName]) {
        state[moduleName][submoduleName][field] = value
      } else if (field in state[moduleName]) {
        // 容错处理：当在子模块内没找到需要设置的弹窗控制字段时，往当前模块的父级state里面去查找
        state[moduleName][field] = value
      }
    }
  }
}

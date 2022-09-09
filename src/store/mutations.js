export default {
  /**
   * 设置数据列表的loading
   * @param state {Object}
   * @param value {boolean}
   * @param moduleName {string}
   * @param submoduleName {string}
   * @param customizeLoading {string} 自定义loading字段名
   */
  setLoading(state, {
    value, moduleName, submoduleName, customizeLoading
  }) {
    if (submoduleName) {
      if (Object.prototype.toString.call(state[moduleName][submoduleName][customizeLoading]) === '[object Object]') {
        state[moduleName][submoduleName][customizeLoading].loading = value
      } else {
        state[moduleName][submoduleName][customizeLoading || 'loading'] = value
      }
    } else {
      if (Object.prototype.toString.call(state[moduleName][customizeLoading]) === '[object Object]') {
        state[moduleName][customizeLoading].loading = value
      } else {
        state[moduleName][customizeLoading || 'loading'] = value
      }
    }
  },
  /**
   * 设置列表搜索参数对象
   * @param state {Object}
   * @param payload {Object}
   * @param moduleName {string}
   * @param submoduleName {string}
   */
  setSearch(state, {
    payload, moduleName, submoduleName
  }) {
    if (!submoduleName) {
      if ('pagination' in state[moduleName]) {
        state[moduleName].pagination.pageIndex = 0
      }

      state[moduleName].search = {
        ...state[moduleName].search,
        ...payload
      }
    } else {
      if ('pagination' in state[moduleName][submoduleName]) {
        state[moduleName][submoduleName].pagination.pageIndex = 0
      }

      if ('search' in state[moduleName][submoduleName]) {
        state[moduleName][submoduleName].search = {
          ...state[moduleName][submoduleName].search,
          ...payload
        }
      }
    }
  },
  /**
   * 设置当前的临时数据对象
   * currentItem: 当前页面正在操作的临时数据对象。如新增，编辑等需要临时保存数据的对象
   * @param state {Object}
   * @param value {Object}
   * @param moduleName {string}
   */
  setCurrentItem(state, { value, moduleName }) {
    state[moduleName].currentItem = value
  },
  /**
   * 设置表格选中的行数据
   * @param state
   * @param [selectedRowKeys] {string[]}
   * @param [selectedRows] {Object[]}
   * @param moduleName {string}
   * @param [submoduleName] {string}
   */
  setRowSelected(state, {
    payload: { selectedRowKeys, selectedRows }, moduleName, submoduleName
  }) {
    if (!submoduleName) {
      state[moduleName].selectedRowKeys = selectedRowKeys || []
      state[moduleName].selectedRows = selectedRows || []
    } else {
      state[moduleName][submoduleName].selectedRowKeys = selectedRowKeys || []
      state[moduleName][submoduleName].selectedRows = selectedRows || []
    }
  },
  /**
   * 设置分页信息
   * @param state {Object}
   * @param value: {Object}
   * @param moduleName {string}
   * @param submoduleName {string}
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
   * @param state {Object}
   * @param value {Object[]}
   * @param moduleName {string}
   * @param submoduleName {string}
   * @param stateName {string} 需要设置的字段，默认 state.list
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
            state[moduleName][stateName] = value
          }
        } else {
          state[moduleName][stateName].list = value
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
            state[moduleName][submoduleName][stateName] = value
          }
        } else {
          state[moduleName][submoduleName][stateName].list = value
        }
      } else {
        state[moduleName][submoduleName][stateName || 'list'] = value
      }
    }
  },
  /**
   * 设置详情数据（后期可能正式更名为setState）
   * @param state {Object}
   * @param value {Object[]}
   * @param moduleName {string}
   * @param submoduleName {string}
   * @param stateName {string} 需要设置的字段，默认 state.details
   * @param merge {boolean} 是否需要将新值与旧值合并，默认false
   */
  setDetails(state, {
    value,
    moduleName,
    submoduleName,
    stateName,
    merge
  }) {
    if (!submoduleName) {
      state[moduleName][stateName || 'details'] = merge
        ? {
          ...state[moduleName][stateName || 'details'],
          ...value
        }
        : value
    } else {
      state[moduleName][submoduleName][stateName || 'details'] = merge
        ? {
          ...state[moduleName][submoduleName][stateName || 'details'],
          ...value
        }
        : value
    }
  },
  /**
   * 设置modal的可见性
   * @param state {Object}
   * @param payload {{
   *   field: string,
   *   value: any,
   *   moduleName: string,
   *   submoduleName: string
   * }} field: 对应modal的显示字段 value：要设置的值 moduleName:模块名称
   * @param moduleName {string}
   */
  setModalVisible(state, {
    field, value, moduleName, submoduleName = ''
  }) {
    if (!submoduleName) {
      state[moduleName][field] = value
    } else {
      state[moduleName][submoduleName][field] = value
    }
  }
}

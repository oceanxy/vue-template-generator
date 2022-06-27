export default {
  /**
   * 设置数据列表的loading
   * @param state {Object}
   * @param value {boolean}
   * @param moduleName {string}
   * @param submoduleName {string}
   */
  setLoading(state, { value, moduleName, submoduleName }) {
    if (submoduleName) {
      state[moduleName][submoduleName].loading = value
    } else {
      state[moduleName].loading = value
    }
  },
  /**
   * 设置列表搜索参数对象
   * @param state {Object}
   * @param value {Object}
   * @param moduleName {string}
   * @param submoduleName {string}
   */
  setSearch(state, { value, moduleName, submoduleName }) {
    if (!submoduleName) {
      state[moduleName].pagination.pageIndex = 0
      state[moduleName].search = {
        ...state[moduleName].search,
        ...value
      }
    } else {
      state[moduleName][submoduleName].pagination.pageIndex = 0
      state[moduleName][submoduleName].search = {
        ...state[moduleName][submoduleName].search,
        ...value
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
   */
  setRowSelected(state, { payload: { selectedRowKeys, selectedRows }, moduleName }) {
    state[moduleName].selectedRowKeys = selectedRowKeys || []
    state[moduleName].selectedRows = selectedRows || []
  },
  /**
   * 设置分页信息
   * @param state {Object}
   * @param value: {Object}
   * @param moduleName {string}
   * @param submoduleName {string}
   */
  setPagination(state, { value, moduleName, submoduleName }) {
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
  setList(state, { value, moduleName, submoduleName, stateName }) {
    if (!submoduleName) {
      state[moduleName][stateName || 'list'] = value
    } else {
      state[moduleName][submoduleName][stateName || 'list'] = value
    }
  },
  /**
   * 设置详情数据
   * @param state {Object}
   * @param value {Object[]}
   * @param moduleName {string}
   * @param submoduleName {string}
   * @param stateName {string} 需要设置的字段，默认 state.details
   */
  setDetails(state, { value, moduleName, submoduleName, stateName }) {
    if (!submoduleName) {
      state[moduleName][stateName || 'details'] = value
    } else {
      state[moduleName][submoduleName][stateName || 'details'] = value
    }
  },
  /**
   * 设置modal的可见性
   * @param state {Object}
   * @param payload {{
   *   field: string,
   *   value: any,
   *   moduleName: string
   * }} field: 对应modal的显示字段 value：要设置的值 moduleName:模块名称
   * @param moduleName {string}
   */
  setModalVisible(state, { field, value, moduleName }) {
    state[moduleName][field] = value
  }
}

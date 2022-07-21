export default {
  getState: state => (stateName, moduleName, submoduleName = '') => {
    if (!submoduleName) {
      return state[moduleName][stateName]
    } else {
      return state[moduleName][submoduleName][stateName]
    }
  },
  // ==============以下函数式getter可能会被取消，不建议使用=============
  getLoading: state => (moduleName, submoduleName = '') => {
    if (!submoduleName) {
      return state[moduleName].loading
    } else {
      return state[moduleName][submoduleName].loading
    }
  },
  getVisible: state => (moduleName, stateName) => state[moduleName][stateName],
  getCurrentItem: state => moduleName => state[moduleName].currentItem,
  getPagination: state => moduleName => state[moduleName].pagination,
  getSelectedRowKeys: state => moduleName => state[moduleName].selectedRowKeys,
  getSelectedRows: state => moduleName => state[moduleName].selectedRows,
  getList: state => moduleName => state[moduleName]?.list ?? [],
  getDetails: state => moduleName => state[moduleName]?.details ?? {},
  getSearch: state => moduleName => state[moduleName].search,
  getStateOfModule: state => (moduleName, submoduleName) => state[moduleName][submoduleName],
  // ===================================================================

  administrativeDivision: state => {
    let result= []

    if (state.common){
      result=state.common.administrativeDivision
    }

    return result
  },
  defaultAdministrativeDivision: state => state.common.defaultAdministrativeDivision,
  units: state => state.common.units,
  parkTree: state => state.common.parkTree,
  parksForSelect: state => state.common.parksForSelect,
  unitsForSelect: state => state.common.unitsForSelect,
  buildingsForSelect: state => state.common.buildingsForSelect,
  sideFloorTree: state => state.common.sideFloorTree,
  organizationTree: state => state.common.organizationTree,
  roleTree: state => state.common.roleTree,
  currentParkTreeKeySelected: state => state.common.currentParkTreeKeySelected,
  listOfAccountApplicationRecord: state => state.accountOpening.listOfAccountApplicationRecord
}

export default {
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

  administrativeDivision: state => state.common.administrativeDivision,
  defaultAdministrativeDivision: state => state.common.defaultAdministrativeDivision,
  regulatoryUnits: state => state.common.regulatoryUnits,
  parkTree: state => state.common.parkTree,
  parksForSelect: state => state.common.parksForSelect,
  buildingsForSelect: state => state.common.buildingsForSelect,
  floorTree: state => state.common.floorTree,
  organizationTree: state => state.common.organizationTree,
  roleTree: state => state.common.roleTree,
  currentParkTreeKeySelected: state => state.common.currentParkTreeKeySelected,
  listOfAccountApplicationRecord: state => state.accountOpening.listOfAccountApplicationRecord
}

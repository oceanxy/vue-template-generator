export default {
  getLoading: state => moduleName => state[moduleName].loading,
  getVisibleForModal: state => moduleName => state[moduleName].visibleOfEdit,
  getVisible: state => (moduleName, stateName) => state[moduleName][stateName],
  getCurrentItem: state => moduleName => state[moduleName].currentItem,
  getPagination: state => moduleName => state[moduleName].pagination,
  getSelectedRowKeys: state => moduleName => state[moduleName].selectedRowKeys,
  getSelectedRows: state => moduleName => state[moduleName].selectedRows,
  getList: state => moduleName => state[moduleName].list,
  getSearch: state => moduleName => state[moduleName].search
}

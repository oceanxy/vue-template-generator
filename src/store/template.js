/**
 * vuex store模版
 * @Author: Oceanxy
 * @Email: xyzsyx@163.com
 * @Date: 2022-06-22 周三 15:18:57
 */

export function createTemplate() {
  return {
    namespaced: true,
    state: {
      loading: false,
      search: {},
      pagination: {
        pageIndex: 0,
        pageSize: 10,
        total: 0
      },
      currentItem: {},
      list: [],
      visibleOfEdit: false,
      selectedRowKeys: [],
      selectedRows: []
    },
    mutations: {},
    actions: {}
  }
}

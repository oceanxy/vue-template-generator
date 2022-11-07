/**
 * vuex store模版
 * @Author: Oceanxy
 * @Email: xyzsyx@163.com
 * @Date: 2022-06-22 周三 15:18:57
 */

/**
 * 创建 Vuex store 模块
 * @param target 需要合并的 Vuex store 模块
 * @returns {Object} 合并后的 Vuex store 模块
 */
export function createStoreModule(target = {}) {
  return {
    namespaced: true,
    state: {
      rowKey: 'id', // antd vue Table 组件的 rowKey 属性
      treeIdField: '', // 用于接收侧边树选中值的字段名，默认''，通过 @/components/TGContainerWithTreeSider 组件设置。
      loading: false,
      search: {},
      pagination: {
        pageIndex: 0,
        pageSize: 15,
        total: 0
      },
      currentItem: {},
      list: [],
      sortFieldList: [],
      details: {},
      visibleOfEdit: false,
      selectedRowKeys: [],
      selectedRows: [],
      ...target.state
    },
    mutations: { ...target.mutations },
    getters: { ...target.getters },
    actions: { ...target.actions },
    modules: { ...target.modules }
  }
}

/**
 * vuex store模板
 * @Author: Omsber
 * @Email: xyzsyx@163.com
 * @Date: 2022-06-22 周三 15:18:57
 */

import { omit } from 'lodash'

/**
 * 创建 Vuex store 模块
 * @param [module={}] {Object} 需要合并到 Store 的 Vuex.Module 模块
 * @param [excludeFromState=[]] {string[]} 需要从 Vuex.Module.state 排除的字段集合
 * @returns {Object} 处理后的用于合并到 Store 的 Vuex.Module
 */
export function createStoreModule(module = {}, excludeFromState = []) {
  return {
    namespaced: true,
    state: () => (omit({
      /**
       * antd vue Table 组件的 rowKey 属性
       */
      rowKey: 'id',
      /**
       * 初始化列表搜索参数（store.state.search）的任务队列
       */
      taskQueues: [],
      /**
       * 用于接收侧边树选中值的字段名，默认''，通过 @/components/TGContainerWithTreeSider 组件设置。
       * @type {string}
       */
      treeIdField: '',
      /**
       * 加载状态
       * @type {boolean}
       */
      loading: false,
      /**
       * 搜索对象
       * @type {Object}
       */
      search: {},
      /**
       * 搜索请求对象名。默认null。
       * 一般情况下为空，不为空时，在发送搜索请求时会将请求参数放到 searchRO 所设置值的对象中。
       * @type {string | null}
       * @example
       * 如下设置：
       * {
       *  search: { id: 'id', name: 'test' },
       *  searchRO: '' // 或者其他假值
       * }
       * 请求参数结构为：
       * {
       *  id: 'id',
       *  name: 'test'
       * }
       *
       * 如下设置：
       * {
       *  search: { id: 'id', name: 'test' },
       *  searchRO: 'searchRO'
       * }
       * 请求参数结构为：
       * {
       *  searchRO: {
       *    id: 'id',
       *    name: 'test'
       *  }
       * }
       */
      searchRO: null,
      /**
       * 分页对象
       * @type {Object}
       * @property {number} pageIndex 页码
       * @property {number} pageSize 每页数量
       * @property {number} total 总数量
       */
      pagination: {
        pageIndex: 0,
        pageSize: 10,
        total: 0
      },
      /**
       * 执行查询时是否通过 params 传递分页参数，默认 false
       */
      paginationByParams: false,
      /**
       * 当前项
       * @type {Object}
       */
      currentItem: {},
      list: [],
      sortFieldList: [],
      details: {},
      loadingDetails: false,
      visibilityOfEdit: false,
      selectedRowKeys: [],
      selectedRows: [],
      ...module.state
    }, excludeFromState)),
    mutations: { ...module.mutations },
    getters: { ...module.getters },
    actions: { ...module.actions },
    modules: { ...module.modules }
  }
}

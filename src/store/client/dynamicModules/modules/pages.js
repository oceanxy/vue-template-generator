import apis from '@/apis'
import { cloneDeep, omit } from 'lodash'

export default commitRootInModule => {
  // 搜索模型
  const searchModel = {
    pageName: undefined,
    allPath: undefined,
    appId: undefined
  }

  return {
    namespaced: true,
    state: {
      loading: false,
      search: { ...searchModel },
      pagination: {
        pageIndex: 0,
        pageSize: 10,
        total: 0
      },
      currentItem: {},
      list: [],
      visibleOfEdit: false,
      visibleForConflict: false,
      selectedRowKeys: [],
      selectedRows: []
    },
    mutations: {
      setVisibleForConflict(state, payload) {
        state.visibleForConflict = payload
      }
    },
    actions: {
      /**
       * 获取列表数据
       * @param state
       * @param pagination
       * @returns {Promise<void>}
       */
      async getList({ state }, pagination) {
        commitRootInModule('setLoading', true)

        const response = await apis.getPages(omit({
          ...state.pagination,
          ...state.search,
          ...pagination
        }, 'total'))

        if (response.status) {
          commitRootInModule('setPagination', {
            ...state.pagination,
            pageIndex: response.data.pageIndex,
            pageSize: response.data.pageSize,
            total: response.data.totalNum
          })

          commitRootInModule('setList', response.data.rows)
        }

        commitRootInModule('setLoading', false)
      },
      /**
       * 更新状态
       * @param state
       * @param payload
       * @return {Promise<*>}
       */
      async updateStatus({ state }, payload) {
        commitRootInModule('setLoading', true)

        const { status } = await apis.updatePagesStatus(payload)

        commitRootInModule('setLoading', false)

        return status
      },
      /**
       * 更新监控状态
       * @param state
       * @param payload
       * @return {Promise<*>}
       */
      async updateMonitorStatus({ state }, payload) {
        commitRootInModule('setLoading', true)

        const { status } = await apis.updatePagesMonitorStatus(payload)

        commitRootInModule('setLoading', false)

        return status
      },
      /**
       * 删除站点应用
       * @param state
       * @param dispatch
       * @param ids {Array}
       * @returns {Promise<void>}
       */
      async delete({ state, dispatch }, ids) {
        commitRootInModule('setLoading', true)

        if (!ids) {
          ids = state.selectedRowKeys
        }

        const response = await apis.deletePages({ ids })

        if (response.status) {
          dispatch('getList', {pageIndex: 0})
        } else {
          commitRootInModule('setLoading', false)
        }

        return response.status
      },
      /**
       * 新增站点应用
       * @param state
       * @param dispatch
       * @param payload
       * @return {Promise<*>}
       */
      async add({ state, dispatch }, payload) {
        const response = await apis.addPages(payload)

        if (response.status) {
          dispatch('setModalVisible', false)
          dispatch('getList', {pageIndex: 0})
        }

        return response.status
      },
      /**
       * 更新站点应用
       * @param state
       * @param dispatch
       * @param payload
       * @return {Promise<*>}
       */
      async update({ state, dispatch }, payload) {
        const response = await apis.updatePages(payload)

        if (response.status) {
          dispatch('getList')
        }

        return response.status
      },
      /**
       * 设置搜索参数
       * @param state
       * @param [payload]
       */
      setSearch({ state }, payload) {
        commitRootInModule('setSearch', { ...(payload ?? searchModel) })
      },
      /**
       * 设置分页参数
       * @param state
       * @param [payload]
       */
      setPagination({ state }, payload) {
        commitRootInModule('setPagination', {
          ...state.pagination, ...payload 
        })
      },
      /**
       * 设置新增/编辑弹窗可见状态
       * @param state
       * @param payload
       */
      setModalVisible({ state }, payload) {
        commitRootInModule('setModalVisible', {
          field: 'visibleOfEdit',
          value: payload
        })
      },
      setVisibleForConflict({ commit }, payload) {
        commit('setVisibleForConflict', payload)
      },
      /**
       * 设置当前正在操作的对象为一个新的副本
       * @param state
       * @param payload
       */
      setCurrentItem({ state }, payload) {
        commitRootInModule('setCurrentItem', cloneDeep(payload || {}))
      },
      /**
       * 设置选择的行
       * @param state
       * @param payload
       */
      setRowSelected({ state }, payload) {
        commitRootInModule('setRowSelected', payload)
      }
    }
  }
}
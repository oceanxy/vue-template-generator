import apis from '@/apis'
import { omit } from 'lodash'

export default commitRootInModule => {
  // 搜索模型
  const searchModel = {
    appName: undefined,
    status: undefined
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
      visibleOfPreview: false,
      selectedRowKeys: [],
      selectedRows: []
    },
    mutations: {},
    actions: {
      /**
       * 设置搜索参数
       * @param state
       * @param [payload]
       */
      setSearch({ state }, payload) {
        commitRootInModule('setSearch', { ...(payload ?? searchModel) })
      },
      /**
       * 更新状态
       * @param state
       * @param payload
       * @return {Promise<*>}
       */
      async updateStatus({ state }, payload) {
        commitRootInModule('setLoading', true)

        const { status } = await apis.updateSiteAppsStatus(payload)

        commitRootInModule('setLoading', false)

        return status
      },
      /**
       * 设置选择的行
       * @param state
       * @param payload
       */
      setRowSelected({ state }, payload) {
        commitRootInModule('setRowSelected', payload)
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

        const response = await apis.deleteSiteApp({ ids })

        if (response.status) {
          dispatch('getList', {
            pageIndex: 0
          })
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
        const response = await apis.addSiteApp(payload)

        if (response.status) {
          dispatch('setModalVisible', false)
          dispatch('getList', {
            pageIndex: 0
          })
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
        const response = await apis.updateSiteApp(payload)

        if (response.status) {
          dispatch('getList')
        }

        return response.status
      }
    }
  }
}

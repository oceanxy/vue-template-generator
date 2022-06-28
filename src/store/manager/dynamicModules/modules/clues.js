import apis from '@/apis'
import { omit } from 'lodash'
import { message } from 'ant-design-vue'
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
      visibleOfAssignLeads: false,
      visibleOfRecoverClues: false,
      visibleOfDetails: false,
      selectedRowKeys: [],
      selectedRows: [],
      cluesCountList: []
    },
    mutations: {
      setCluesCountList(state, payload) {
        state.cluesCountList = payload
      }
    },
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
       * 删除
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
      },
      /**
       * 收回
       * @param state
       * @param dispatch
       * @param payload
       * @return {Promise<*>}
       */
      async takeBackClues({ state, dispatch }, payload) {
        if (payload.ids === '' || payload.ids.length === 0) {
          message.warn('请选择数据')
          return
        }
        let ids = ''
        if (typeof payload.ids === 'string') {
          ids = payload.ids
        } else {
          ids = payload.ids.join(',')
        }

        const response = await apis.takeBackClues({ ids })

        if (response.status) {
          message.success('收回成功')
          dispatch('getList', { moduleName: payload.moduleName }, { root: true })
        }

        return response.status
      },
      /**
       * 线索状态统计头部列表
       */
      async getCluesCountList({ commit }) {
        const res = await apis.getCluesCountList()

        if (res.status) {
          commit('setCluesCountList', res.data)
        }
      }
    },
    modules: {
      modalOfDetails: {
        state: {
          loading: false,
          search: {},
          list: []
        },
        mutations: {},
        actions: {
          // async progressDetailClues({ commit }, payload) {
          //   const res = await apis.progressDetailClues({ id: payload.id })
          //   if (res.status) {
          //     commit('setList', res.data || [])
          //   }
          // }
        }
      }
    }
  }
}

import apis from '@/apis'
import { message, Modal } from 'ant-design-vue'
import { createStoreModule } from '@/store/template'
import { omit } from 'lodash'

export default commitRootInModule =>
  omit(
    createStoreModule({
      state: {
        loading: false,
        readLoading: false,
        search: { messagePlatform: 2 }
      },
      mutations: {
        set_readLoading(state, value) {
          state.readLoading = value
        }
      },
      actions: {
        async updateIsReadAll({ commit }) {
          commit('set_readLoading', true)
          const res = await apis.updateIsReadAll({ messagePlatform: 2 })

          commit('set_readLoading', false)

          if (res.status) {
            message.success('操作成功')
          }
        },
        async delNews({ state, dispatch }, moduleName) {
          if (state.selectedRowKeys.length === 0) {
            message.warn('请选择数据')

            return
          }

          Modal.confirm({
            title: '确认',
            content: '确定要删除吗？',
            okText: '确认',
            cancelText: '取消',
            onOk: async close => {
              const res = await apis.delNews({ ids: state.selectedRowKeys.join(',') })

              if (res.status) {
                message.success('删除成功')
                dispatch('getList', { moduleName }, { root: true })
              }

              close()
            }
          })
        }
      }
    }),
    ['state.visibleOfEdit']
  )

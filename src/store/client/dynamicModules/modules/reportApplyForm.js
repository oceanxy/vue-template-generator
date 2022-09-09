import apis from '@/apis'
import { createStoreModule } from '@/store/template'
import { omit } from 'lodash'
import { message } from 'ant-design-vue'

export default commitRootInModule =>
  omit(
    createStoreModule({
      state: { loading: false },
      actions: {
        async getItemList({ commit }, reportId) {
          commitRootInModule('setLoading', true)
          const res = await apis.reportGetItemList({ reportId })

          commitRootInModule('setLoading', false)

          if (res.status) {
            commitRootInModule('setList', res.data.itemCatalogList || [])
          }
        },
        async addReport({ state }, payload) {
          const form = {
            reportId: state.details.id,
            reportResultList: payload
          }

          commitRootInModule('setLoading', true)
          const res = await apis.addReport(form)

          commitRootInModule('setLoading', false)

          if (res.status) {
            message.success('填报成功')
          }

          return res
        }
      }
    }),
    [
      'state.selectedRows',
      'state.selectedRowKeys',
      'state.visibleOfEdit',
      'state.pagination',
      'state.search'
    ]
  )

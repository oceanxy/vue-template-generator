import apis from '@/apis'
import { createStoreModule } from '@/store/template'
import { message } from 'ant-design-vue'

export default commitRootInModule =>
  createStoreModule({
    state: {
      visibleOfEdit: false,
      visibleOfDistribute: false,

      businessSelect: {
        loading: false,
        list: []
      },
      disposeUserSelect: {
        loading: false,
        list: []
      }
    },
    mutations: {},
    actions: {
      async assignWorkOrder({ state }, { payload }) {
        const form = { ...payload }
        const res = await apis.assignWorkOrder(form)

        if (res.status) {
          message.success('操作成功')
        }

        return res
      },
      async revokeWorkOrder({ state }, { payload }) {
        const form = { ...payload }
        const res = await apis.revokeWorkOrder(form)

        return res
      }
    },
    modules: {}
  })

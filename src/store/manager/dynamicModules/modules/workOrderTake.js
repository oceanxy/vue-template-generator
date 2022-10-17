import apis from '@/apis'
import { createStoreModule } from '@/store/template'
import { message } from 'ant-design-vue'

export default commitRootInModule =>
  createStoreModule({
    state: { visibleOfEdit: false },
    mutations: {},
    actions: {
      async handleWorkOrder({ state }, { payload }) {
        const form = { ...payload }
        const res = await apis.handleWorkOrder(form)

        if (res.status) {
          message.success('操作成功')
        }

        return res
      }
    },
    modules: {}
  })

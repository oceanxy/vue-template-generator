import apis from '@/apis'
import { createStoreModule } from '@/store/template'
import { message } from 'ant-design-vue'

export default commitRootInModule =>
  createStoreModule({
    state: { visibleOfMenu: false },
    actions: {
      async delConferenceRoomManage({ dispatch }, { id }) {
        const res = await apis.deleteHousingResources({ ids: id })

        if (res.status) {
          message.success('已成功删除！')
        }

        return res
      },
      async updateStatus({ dispatch }, {
        id, status, moduleName
      }) {
        commitRootInModule('setLoading', true)

        const res = await apis.updateHousingResourcesStatus({ id, status })

        commitRootInModule('setLoading', false)

        if (res.status) {
          message.success('修改完成')
        }

        return res
      }
    }
  })

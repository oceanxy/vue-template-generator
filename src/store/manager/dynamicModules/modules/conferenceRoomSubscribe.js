import apis from '@/apis'
import { createStoreModule } from '@/store/template'
import { message } from 'ant-design-vue'

export default commitRootInModule =>
  createStoreModule({
    state: {
      visibleOfEdit: false,
      visibleOfMenu: false,
      roomList: {
        loading: false,
        list: []
      },
      businessSelect: {
        loading: false,
        list: []
      }
    },
    mutations: {},
    actions: {
      async cancelMeetingRoomAppointment({ state }, { id }) {
        commitRootInModule('setLoading', true)
        const res = await apis.cancelMeetingRoomAppointment({ id })

        commitRootInModule('setLoading', false)

        if (res.status) {
          message.success('取消成功')
        }

        return res
      }
    },
    modules: {}
  })

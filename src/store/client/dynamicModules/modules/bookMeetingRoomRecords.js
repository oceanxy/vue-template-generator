import apis from '@/apis'
import { message } from 'ant-design-vue'
import { createStoreModule } from '@/store/template'
import { omit } from 'lodash'

export default commitRootInModule =>
  omit(
    createStoreModule({
      state: {search: {}},
      mutations: {},
      actions: {
        async getList({ dispatch, commit }, { moduleName }) {
          const res = await dispatch('getList', { moduleName }, { root: true })

          if (res.status) {
            //
          }

          return res
        },
        async cancelMeetingRoomAppointment({ dispatch }, { moduleName, id }) {
          // commitRootInModule('setLoading', true)
          const res = await apis.cancelMeetingRoomAppointment({ id })

          // commitRootInModule('setLoading', false)
          if (res.status) {
            message.success('取消成功')
            dispatch('getList', { moduleName })
          }

          return res
        }
      }
    }),
    ['state.visibleOfEdit']
  )

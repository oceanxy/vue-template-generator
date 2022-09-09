import apis from '@/apis'
import { createStoreModule } from '@/store/template'
import { omit } from 'lodash'

export default commitRootInModule =>
  omit(
    createStoreModule({
      state: {loading: false},
      mutations: {},
      actions: {
        async getMessage({ commit }) {
          const form = {
            pageIndex: 0,
            pageSize: 10,
            messagePlatform: 2
          }

          commit('set_messageLoading', true)
          const res = await apis.getNews(form)

          commit('set_messageLoading', false)

          if (res.status) {
            commit('set_messageList', res.data.rows || [])
          }

          return res
        },
        async getBackLogList({ commit }) {
          commit('set_backLogLoading', true)
          const res = await apis.getBackLogList({ messagePlatform: 2 })

          commit('set_backLogLoading', false)

          if (res.status) {
            commit('set_backLogInfo', res.data || {})
          }

          return res
        }
      }
    }),
    ['state.visibleOfEdit']
  )

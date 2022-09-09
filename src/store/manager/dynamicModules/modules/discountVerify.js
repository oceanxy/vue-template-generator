import { createStoreModule } from '@/store/template'
import apis from '@/apis'

export default commitRootInModule =>
  createStoreModule({
    state: {
      visibleOfAudit: false,
      visibleOfEnterprise: false,
      visibleOfFile: false,
      businessInfo: [],
      businessFile: []
    },
    mutations: {
      set_businessInfo(state, payload) {
        state.businessInfo = payload
      },
      set_businessFile(state, payload) {
        state.businessFile = payload
      }
    },
    actions: {
      // 企业详情弹窗
      async getCompanyProperties({ commit }, { companyId }) {
        const res = await apis.saleRecord_getCompanyProperties({ companyId })

        if (res.status) {
          commit('set_businessInfo', res.data)
        }
      },
      // 企业文件弹窗
      async getAttachmentList({ commit }, { id }) {
        const res = await apis.saleRecord_getAttachmentList({ id })

        if (res.status) {
          commit('set_businessFile', res.data)
        }
      }
    },
    modules: {}
  })

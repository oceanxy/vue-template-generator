import { createStoreModule } from '@/store/template'
import apis from '@/apis'
export default commitRootInModule =>
  createStoreModule({
    state: {
      visibleOfAudit: false,
      visibleOfEnterprise: false,
      visibleOfFile: false,
      bussienssInfo: [],
      bussienssFile: []
    },
    mutations: {
      set_bussienssInfo(state, payload) {
        state.bussienssInfo = payload
      },
      set_bussienssFile(state, payload) {
        state.bussienssFile = payload
      }
    },
    actions: {
      // 企业详情弹窗
      async getCompanyProperties({ commit }, { companyId }) {
        const res = await apis.saleRecord_getCompanyProperties({ companyId })
        if (res.status) {
          commit('set_bussienssInfo', res.data)
        }
      },
      // 企业文件弹窗
      async getAttachmentList({ commit }, { id }) {
        const res = await apis.saleRecord_getAttachmentList({ id })
        if (res.status) {
          commit('set_bussienssFile', res.data)
        }
      }
    },
    modules: {}
  })

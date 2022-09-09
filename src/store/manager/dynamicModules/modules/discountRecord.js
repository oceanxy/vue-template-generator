import apis from '@/apis'
import { createStoreModule } from '@/store/template'
import { message } from 'ant-design-vue'

export default commitRootInModule =>
  createStoreModule({
    state: {
      visibleOfEdit: false,
      visibleOfEnterprise: false,
      visibleOfFile: false,
      businessSelect: {
        loading: false,
        list: []
      },
      discountSelect: {
        loading: false,
        list: []
      },
      businessInfo: [],
      attachmentList: []
    },
    mutations: {
      set_businessInfo(state, payload) {
        state.businessInfo = payload
      },
      set_attachmentList(state, payload) {
        state.attachmentList = payload
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
      // 获取附件详情
      async getAttachmentList({ commit }, { id }) {
        const res = await apis.saleRecord_getAttachmentList({ id })

        if (res.status) {
          commit('set_attachmentList', res.data)
        }
      }
    },
    modules: {}
  })

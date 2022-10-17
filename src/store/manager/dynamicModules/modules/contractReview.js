import { createStoreModule } from '@/store/template'

export default commitRootInModule => createStoreModule({
  state: { visibleOfContractReview: false }
  // actions: {
  //   /**
  //    * 签约合同详情
  //    * @param state
  //    * @param dispatch
  //    * @param moduleName {string}
  //    * @param payload {Object}
  //    * @param visibleField {string}
  //    * @param isFetchList {boolean}
  //    * @param customApiName {string} 自定义请求API
  //    * @returns {Promise<*>}
  //    */
  //   async getContractDetail({ state, dispatch }, {
  //     moduleName,
  //     payload,
  //     visibleField,
  //     isFetchList,
  //     customApiName
  //   }) {
  //     const response = await apis['contractAudit_getContractDetail'](payload)
  //
  //     if (response.status) {
  //       //
  //     }
  //
  //     return response.status
  //   }
  // }
})

import qs from 'qs'

export default {
  /**
   * 我的合同
   * @param [request]
   * @param data
   * @returns {*}
   */
  getWebContracts(request, data = {}) {
    return request({
      url: '/operate/notifyMessage/getUserContractList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 合同预览
   * @param [request]
   * @param data
   * @returns {*}
   */
  getNotifyMessageContractPreview(request, data) {
    return request({
      url: '/operate/notifyMessage/getContractPreview',
      method: 'post',
      data: qs.stringify(data),
      responseType: 'blob'
    })
  },
  /**
   * 续约-解约申请
   * @param [request]
   * @param data
   * @returns {*}
   */
  notifyMessageContractApply(request, data) {
    return request({
      url: '/operate/notifyMessage/contractApply',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 公司-团队信息编辑
   * @param [request]
   * @param data
   * @returns {*}
   */
  notifyMessageUpdateCompanyDetail(request, data) {
    return request({
      url: '/operate/notifyMessage/updateCompanyDetail',
      method: 'post',
      data: data
    })
  },
  /**
   * 获取公司-团队详细信息
   * @param [request]
   * @param data
   * @returns {*}
   */
  notifyMessageGetCompanyDetail(request, data) {
    return request({
      url: '/operate/notifyMessage/getCompanyDetail',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 获取企业分类集合
   * @param [request]
   * @param data
   * @returns {*}
   */
  notifyMessageGetFacilityList(request, data) {
    return request({
      url: '/system/dictionary/getFacilityList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   *企业入住
   * @param [request]
   * @param data
   * @returns {*}
   */
  notifyMessageEnterprisesIncome(request, data) {
    return request({
      url: '/operate/notifyMessage/enterprisesIncome',
      method: 'post',
      data: data
    })
  },
  /**
   *获取所有园区
   * @param [request]
   * @param data
   * @returns {*}
   */
  notifyMessageGetParkList(request) {
    return request({
      url: '/operate/notifyMessage/getParkList',
      method: 'post'
    })
  }
}

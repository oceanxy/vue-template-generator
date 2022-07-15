import qs from 'qs'

export default {
  /**
   * 获取企业续约申请列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getRenewalApplication(request, data) {
    return request({
      url: '/business/contractRenewal/getContractRenewalList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 企业续约申请
   * @param request
   * @param data
   * @returns {*}
   */
  renewalApplication(request, data) {
    return request({
      url: '/business/contractRenewal/addContractRenewal',
      method: 'post',
      data
    })
  },
  /**
   * 提交续约申请审核结果
   * @param request
   * @param data
   * @returns {*}
   */
  submitReviewOfRenewal(request, data) {
    return request({
      url: '/business/contractRenewal/auditRenewal',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

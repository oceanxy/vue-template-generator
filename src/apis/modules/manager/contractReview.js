import qs from 'qs'

export default {
  /**
   * 获取签约待审核合同列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getContractReview(request, data) {
    return request({
      url: '/business/contractAudit/getAuditContractList',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

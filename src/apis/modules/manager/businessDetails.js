import qs from 'qs'

export default {
  /**
   * 签约合同详情
   * @param [request]
   * @param data
   * @returns {*}
   */
  getDetailsOfBusinessDetails(request, data) {
    return request({
      url: '/business/contractAudit/getContractDetail',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

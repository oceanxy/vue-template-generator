import qs from 'qs'

export default {
  /**
   * 获取企业列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getBusinesses(request, data) {
    return request({
      url: '/business/company/getCompanyPageList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 发送短信
   * @param request
   * @param data
   * @returns {*}
   */
  sendSMS(request, data) {
    return request({
      url: '/business/company/sendSMS',
      method: 'post',
      data: qs.stringify(data, { arrayFormat: 'comma' })
    })
  },
  /**
   * 获取投诉建议集合
   * @param request
   * @param data
   * @returns {*}
   */
  getSuggestionsOfBusinesses(request, data) {
    return request({
      url: '/business/company/getComplaintList',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

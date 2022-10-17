import qs from 'qs'

export default {
  /**
   * 获取处理投诉建议列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getBusinessRequirements(request, data) {
    return request({
      url: '/operate/companyDemand/getCompanyDemandPageList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 回复
   * @param request
   * @param data
   * @returns {*}
   */
  replyingBusinessRequirement(request, data) {
    return request({
      url: '/operate/companyDemand/handle',
      method: 'post',
      data: qs.stringify(data, { arrayFormat: 'comma' })
    })
  },
  /**
   * 删除企业需求
   * @param request
   * @param data
   * @returns {*}
   */
  deleteBusinessRequirements(request, data) {
    return request({
      url: '/operate/companyDemand/delete',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

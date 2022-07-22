import qs from 'qs'

export default {
  /**
   * 获取未填报的企业的名单列表
   * @param request
   * @param data
   * @returns {*}
   */
  getUnreportedEnterprises(request, data) {
    return request({
      url: '/operate/reportRecord/getCompanyUnFillRecordPageList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 企业催报
   * @param request
   * @param data
   * @returns {*}
   */
  reminderEnterpriseToFillIn(request, data) {
    return request({
      url: '/operate/reportRecord/urgeCompany',
      method: 'post',
      data
    })
  }
}

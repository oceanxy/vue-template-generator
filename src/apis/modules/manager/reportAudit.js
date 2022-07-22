import qs from 'qs'

export default {
  /**
   * 获取报表审核列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getReportAudit(request, data) {
    return request({
      url: '/operate/reportRecord/getCompanyReportAuditPageList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 获取报表审核详情
   * @param request
   * @param data
   * @returns {*}
   */
  getDetailsOfReportAudit(request, data) {
    return request({
      url: '/operate/reportRecord/getReportRecordAudit',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 审核报表
   * @param request
   * @param data
   * @returns {*}
   */
  auditReport(request, data) {
    return request({
      url: '/operate/reportRecord/auditReportRecord',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

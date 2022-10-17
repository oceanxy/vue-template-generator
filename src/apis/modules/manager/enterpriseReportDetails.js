import qs from 'qs'

export default {
  /**
   * 获取企业报表明细列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getEnterpriseReportDetails(request, data) {
    return request({
      url: '/operate/reportRecord/getCompanyReportRecordPageList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 导出企业报表明细
   * @param request
   * @param params
   * @returns {*}
   */
  getExcelOfEnterpriseReportDetails(request, params) {
    return request({
      url: '/operate/reportRecord/exportResultExcel',
      method: 'get',
      params,
      responseType: 'blob'
    })
  }
}

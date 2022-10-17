import qs from 'qs'

export default {
  /**
   * 获取考核指标统计列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getIndicatorStatistics(request, data) {
    return request({
      url: '/operate/reportResult/getReportResultPageList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 获取考核指标统计结果列表
   * @param request
   * @param data
   * @returns {*}
   */
  getDetailsOfIndicatorStatistics(request, data) {
    return request({
      url: '/operate/reportResult/getReportResultCount',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 获取可选报表集合
   * @param request
   * @returns {*}
   */
  getReportsForSelect(request) {
    return request({
      url: '/operate/reportResult/getReportList',
      method: 'post'
    })
  },
  /**
   * 获取可选月份集合
   * @param request
   * @param data
   * @returns {*}
   */
  getYearsForSelect(request, data) {
    return request({
      url: '/operate/reportResult/getYearList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 导出数据
   * @param request
   * @param params
   * @returns {*}
   */
  getExcelOfIndicatorStatistics(request, params) {
    return request({
      url: '/operate/reportResult/exportResultExcel',
      method: 'get',
      params,
      responseType: 'blob'
    })
  }
}

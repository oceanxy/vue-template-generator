import qs from 'qs'

export default {
  /**
   * 获取按时间统计的年份数据
   * @param [request]
   * @returns {*}
   */
  getYearsOfComplaintStatistics(request) {
    return request({
      url: '/operate/complaint/getYearList',
      method: 'post'
    })
  },
  /**
   * 按时间统计
   * @param [request]
   * @param data
   * @returns {*}
   */
  getComplaintCountByTime(request, data) {
    return request({
      url: '/operate/complaint/getComplaintCountByTime',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 按状态统计
   * @param [request]
   * @param data
   * @returns {*}
   */
  getComplaintCountByStatus(request, data) {
    return request({
      url: '/operate/complaint/getComplaintCountByStatus',
      method: 'post',
      data
    })
  },
  /**
   * 按类型统计
   * @param request
   * @param data
   * @returns {*}
   */
  getComplaintCountByType(request, data) {
    return request({
      url: '/operate/complaint/getComplaintCountByType',
      method: 'post',
      data
    })
  },
  /**
   * 导出数据
   * @param request
   * @returns {*}
   */
  getExcelOfComplaintStatistics(request) {
    return request({
      url: '/operate/complaint/exportCountExcel',
      method: 'get',
      responseType: 'blob'
    })
  },
  /**
   * 获取投诉企业排行数据
   * @param request
   * @param data
   * @returns {*}
   */
  getComplaintCompanyRankingOfComplaintStatistics(request, data) {
    return request({
      url: '/operate/complaint/getCompanyRankPage',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 获取员工受理排行数据
   * @param request
   * @param data
   * @returns {*}
   */
  getPersonnelAcceptanceRankingOfComplaintStatistics(request, data) {
    return request({
      url: '/operate/complaint/getAssigneeRankPage',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

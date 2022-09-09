import qs from 'qs'

export default {
  /**
   * 获取人员工单统计
   * @param [request]
   * @param data
   * @returns {*}
   */
  getWorkOrderStatistics(request, data) {
    return request({
      url: '/operate/workOrder/getWorkOrderCountPage',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 导出接单统计
   * @param [request]
   * @param params
   * @returns {*}
   */
  getExcelOfWorkOrderStatistics(request, params) {
    return request({
      url: '/operate/workOrder/exportCountExcel',
      method: 'get',
      params,
      responseType: 'blob'
    })
  }
}

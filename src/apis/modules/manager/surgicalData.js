import qs from 'qs'

export default {
  /**
   * 获取外科数据列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getSurgicalData(request, data) {
    return request({
      url: '/examine/examineSurgery/getExamineSurgeryList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 导出外科数据
   * @param request
   * @param params
   * @returns {*}
   */
  exportSurgicalData(request, params) {
    return request({
      url: '/examine/examineSurgery/exportDataExcel',
      method: 'get',
      params,
      responseType: 'blob'
    })
  }
}

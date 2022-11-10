import qs from 'qs'

export default {
  /**
   * 获取龋齿眼疾数据列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getDentalCariesData(request, data) {
    return request({
      url: '/examine/examineCaries/getExamineCariesList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 导出龋齿眼疾数据
   * @param request
   * @param params
   * @returns {*}
   */
  exportDentalCariesData(request, params) {
    return request({
      url: '/examine/examineCaries/exportDataExcel',
      method: 'get',
      params,
      responseType: 'blob'
    })
  }
}

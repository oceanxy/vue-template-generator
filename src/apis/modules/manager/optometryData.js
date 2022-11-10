import qs from 'qs'

export default {
  /**
   * 获取验光数据列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getOptometryData(request, data) {
    return request({
      url: '/examine/examineOptometry/getExamineOptometryList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 通过学生ID获取验光数据列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getOptometryDataByStudentId(request, data) {
    return request({
      url: '/examine/examineProgress/getOptometryList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 修改验光数据生效状态
   * @param [request]
   * @param data
   * @returns {*}
   */
  updateOptometryDataStatus(request, data) {
    return request({
      url: '/examine/examineProgress/updateOptometryEffective',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 导出验光数据
   * @param request
   * @param params
   * @returns {*}
   */
  exportOptometryData(request, params) {
    return request({
      url: '/examine/examineOptometry/exportDataExcel',
      method: 'get',
      params,
      responseType: 'blob'
    })
  }
}

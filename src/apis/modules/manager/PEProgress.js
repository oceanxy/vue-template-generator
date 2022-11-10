import qs from 'qs'

export default {
  /**
   * 获取体检进度列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getPEProgress(request, data) {
    return request({
      url: '/examine/examineProgress/getExamineProgressList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 导出体检进度
   * @param request
   * @param params
   * @returns {*}
   */
  exportPEProgress(request, params) {
    return request({
      url: '/examine/examineProgress/exportDataExcel',
      method: 'get',
      params,
      responseType: 'blob'
    })
  },
  /**
   * 修改签退状态
   * @param request
   * @param data
   * @returns {*}
   */
  updatePEProgressStatus(request, data) {
    return request({
      url: '/examine/examineProgress/updateStatus',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

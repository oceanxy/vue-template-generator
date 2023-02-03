import qs from 'qs'

export default {
  /**
   * 获取晨午检上报列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getReportOverview(request, data) {
    return request({
      url: '/morningNoon/checkReport/getCheckReportPageList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 获取待处理学生信息
   * @param [request]
   * @param data
   * @returns {*}
   */
  getPendingStudents(request, data) {
    return request({
      url: '/morningNoon/checkReport/getPendingStudents',
      method: 'post',
      data
    })
  },
  /**
   * 新增晨午检上报
   * @param request
   * @param data
   * @returns {*}
   */
  addReportOverview(request, data) {
    return request({
      url: '/system/function/add',
      method: 'post',
      data
    })
  },
  /**
   * 更新晨午检上报
   * @param request
   * @param data
   * @returns {*}
   */
  updateReportOverview(request, data) {
    return request({
      url: '/system/function/update',
      method: 'post',
      data
    })
  },
  /**
   * 获取晨午检上报详情
   * @param request
   * @param data
   * @returns {*}
   */
  getDetailsOfReportOverview(request, data) {
    return request({
      url: '/system/function/getFunctionInfoList',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

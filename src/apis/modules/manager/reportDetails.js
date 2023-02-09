import qs from 'qs'

export default {
  /**
   * 获取晨午检上报异常信息列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getReportDetails(request, data) {
    return request({
      url: '/morningNoon/checkAbnormal/getCheckAbnormalPageList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 删除晨午检上报异常信息
   * @param request
   * @param data
   * @returns {*}
   */
  deleteReportDetails(request, data) {
    return request({
      url: '/morningNoon/checkAbnormal/delete',
      method: 'post',
      data: qs.stringify(data, { arrayFormat: 'comma' })
    })
  },
  /**
   * 修改晨午检上报异常信息
   * @param request
   * @param data
   * @returns {*}
   */
  updateReportDetails(request, data) {
    return request({
      url: '/morningNoon/checkAbnormal/update',
      method: 'post',
      data
    })
  }
}

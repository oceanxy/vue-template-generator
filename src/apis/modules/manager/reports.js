import qs from 'qs'

export default {
  /**
   * 获取报表审核列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getReports(request, data) {
    return request({
      url: '/operate/target/getTargetPageList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 修改报表审核状态
   * @param [request]
   * @param data
   * @returns {*}
   */
  updateReportsStatus(request, data) {
    return request({
      url: '/operate/target/updateStatus',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 删除报表审核
   * @param request
   * @param data
   * @returns {*}
   */
  deleteReports(request, data) {
    return request({
      url: '/operate/target/delete',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 新增报表审核
   * @param request
   * @param data
   * @returns {*}
   */
  addReports(request, data) {
    return request({
      url: '/operate/target/add',
      method: 'post',
      data
    })
  },
  /**
   * 更新报表审核
   * @param request
   * @param data
   * @returns {*}
   */
  updateReports(request, data) {
    return request({
      url: '/operate/target/update',
      method: 'post',
      data
    })
  }
}

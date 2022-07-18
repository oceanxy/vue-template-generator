import qs from 'qs'

export default {
  /**
   * 获取指标类别列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getIndicators(request, data) {
    return request({
      url: '/operate/target/getTargetPageList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 修改指标类别状态
   * @param [request]
   * @param data
   * @returns {*}
   */
  updateIndicatorsStatus(request, data) {
    return request({
      url: '/operate/target/updateStatus',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 删除指标类别
   * @param request
   * @param data
   * @returns {*}
   */
  deleteIndicators(request, data) {
    return request({
      url: '/operate/target/delete',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 新增指标类别
   * @param request
   * @param data
   * @returns {*}
   */
  addIndicators(request, data) {
    return request({
      url: '/operate/target/add',
      method: 'post',
      data
    })
  },
  /**
   * 更新指标类别
   * @param request
   * @param data
   * @returns {*}
   */
  updateIndicators(request, data) {
    return request({
      url: '/operate/target/update',
      method: 'post',
      data
    })
  }
}

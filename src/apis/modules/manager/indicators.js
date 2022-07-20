import qs from 'qs'

export default {
  /**
   * 获取指标列表
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
   * 获取指标下拉列表数据
   * @param request
   * @param data
   * @returns {*}
   */
  getIndicatorsForSelect(request, data) {
    return request({
      url: '/operate/target/getTargetSearchPageList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 修改指标状态
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
   * 删除指标
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
   * 新增指标
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
   * 更新指标
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

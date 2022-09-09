import qs from 'qs'

export default {
  /**
   * 获取单位列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getUnits(request, data) {
    return request({
      url: '/system/unit/getUnitPageList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 获取单位下拉列表集合
   * @param [request]
   * @param data
   * @returns {*}
   */
  getUnitsForSelect(request, data) {
    return request({
      url: '/system/unit/getUnitList',
      method: 'post'
    })
  },
  /**
   * 修改单位状态
   * @param [request]
   * @param data
   * @returns {*}
   */
  updateUnitsStatus(request, data) {
    return request({
      url: '/system/unit/updateStatus',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 更新单位
   * @param request
   * @param data
   * @returns {*}
   */
  updateUnits(request, data) {
    return request({
      url: '/system/unit/update',
      method: 'post',
      data
    })
  },
  /**
   * 新增单位
   * @param [request]
   * @param data
   * @returns {*}
   */
  addUnits(request, data) {
    return request({
      url: '/system/unit/add',
      method: 'post',
      data
    })
  },
  /**
   * 删除单位
   * @param request
   * @param data
   * @returns {*}
   */
  deleteUnits(request, data) {
    return request({
      url: '/system/unit/delete',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

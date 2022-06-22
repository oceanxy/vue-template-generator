import qs from 'qs'

export default {
  /**
   * 获取监管单位列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getRegulatoryUnits(request, data) {
    return request({
      url: '/system/regulationOrgan/getRegulationOrganPage',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 修改监管单位状态
   * @param [request]
   * @param data
   * @returns {*}
   */
  updateRegulatoryUnitsStatus(request, data) {
    return request({
      url: '/system/regulationOrgan/updateStatus',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 更新监管单位
   * @param request
   * @param data
   * @returns {*}
   */
  updateRegulatoryUnits(request, data) {
    return request({
      url: '/system/regulationOrgan/update',
      method: 'post',
      data
    })
  },
  /**
   * 新增监管单位
   * @param [request]
   * @param data
   * @returns {*}
   */
  addRegulatoryUnits(request, data) {
    return request({
      url: '/system/regulationOrgan/add',
      method: 'post',
      data
    })
  },
  /**
   * 删除监管单位
   * @param request
   * @param data
   * @returns {*}
   */
  deleteRegulatoryUnits(request, data) {
    return request({
      url: '/system/regulationOrgan/delete',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

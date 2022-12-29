import qs from 'qs'

export default {
  /**
   * 体检配置-体检设备管理-获取分类分页集合
   * @param [request]
   * @param data
   * @returns {*}
   */
  getDeviceManagement(request, data) {
    return request({
      url: '/examine/examineEquipment/getExamineEquipmentList',
      method: 'post',
      data: qs.stringify(data)
    })
  },

  /**
   * 修改体检设备
   * @param request
   * @param data
   * @returns {*}
   */
  updateDeviceManagement(request, data) {
    return request({
      url: '/examine/examineEquipment/update',
      method: 'post',
      data
    })
  },

  /**
   * 新增体检设备
   * @param request
   * @param data
   * @returns {*}
   */
  addDeviceManagement(request, data) {
    return request({
      url: '/examine/examineEquipment/add',
      method: 'post',
      data
    })
  },

  /**
   * 修改设备状态
   * @param request
   * @param data
   * @returns {*}
   */
  updateDeviceManagementStatus(request, data) {
    return request({
      url: '/examine/examineEquipment/updateStatus',
      method: 'post',
      data: qs.stringify(data)
    })
  },

  /**
   * 删除体检设备
   * @param request
   * @param data
   * @returns {*}
   */
  deleteDeviceManagement(request, data) {
    return request({
      url: '/examine/examineEquipment/delete',
      method: 'post',
      data: qs.stringify(data, { arrayFormat: 'comma' })
    })
  }
}

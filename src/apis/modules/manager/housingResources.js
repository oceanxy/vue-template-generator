import qs from 'qs'

export default {
  /**
   * 获取房源列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getHousingResources(request, data) {
    return request({
      url: '/basic/room/getRoomPageList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 修改房源状态
   * @param [request]
   * @param data
   * @returns {*}
   */
  updateHousingResourcesStatus(request, data) {
    return request({
      url: '/basic/room/updateStatus',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 删除房源
   * @param request
   * @param data
   * @returns {*}
   */
  deleteHousingResources(request, data) {
    return request({
      url: '/basic/room/delete',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 新增房源
   * @param request
   * @param data
   * @returns {*}
   */
  addHousingResources(request, data) {
    return request({
      url: '/basic/room/add',
      method: 'post',
      data
    })
  },
  /**
   * 更新房源
   * @param request
   * @param data
   * @returns {*}
   */
  updateHousingResources(request, data) {
    return request({
      url: '/basic/room/update',
      method: 'post',
      data
    })
  },
  /**
   * 获取房源签约历史列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getContractHistoryOfHousingResources(request, data) {
    return request({
      url: '/basic/roomHistory/getRoomHistoryPageList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 获取配套设施集合
   * @param request
   * @returns {Promise<*>}
   */
  async getSupportingFacilities(request) {
    return request({
      url: '/system/dictionary/getFacilityList',
      method: 'post'
    })
  }
}

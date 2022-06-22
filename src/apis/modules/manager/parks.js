import qs from 'qs'

export default {
  /**
   * 获取园区列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getParks(request, data) {
    return request({
      url: '/basic/park/getParkPage',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 修改园区状态
   * @param [request]
   * @param data
   * @returns {*}
   */
  updateParksStatus(request, data) {
    return request({
      url: '/basic/park/updateStatus',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 删除园区
   * @param request
   * @param data
   * @returns {*}
   */
  deleteParks(request, data) {
    return request({
      url: '/basic/park/delete',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 新增园区
   * @param request
   * @param data
   * @returns {*}
   */
  addParks(request, data) {
    return request({
      url: '/basic/park/add',
      method: 'post',
      data
    })
  },
  /**
   * 更新园区
   * @param request
   * @param data
   * @returns {*}
   */
  updateParks(request, data) {
    return request({
      url: '/basic/park/update',
      method: 'post',
      data
    })
  }
}

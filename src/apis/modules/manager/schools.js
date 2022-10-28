import qs from 'qs'

export default {
  /**
   * 获取园区实时状态列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getParkStatus(request, data) {
    return request({
      url: '/basic/parkRealStatus/getRoomPageList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 根据楼栋ID获取楼层集合
   * @param request
   * @param data
   * @returns {*}
   */
  getFloorsByBuilding(request, data) {
    return request({
      url: '/basic/build/getFloorList',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

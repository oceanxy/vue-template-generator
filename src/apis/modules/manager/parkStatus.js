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
   * 修改园区实时状态状态
   * @param [request]
   * @param data
   * @returns {*}
   */
  updateParkStatusStatus(request, data) {
    return request({
      url: '/basic/park/updateStatus',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 删除园区实时状态
   * @param request
   * @param data
   * @returns {*}
   */
  deleteParkStatus(request, data) {
    return request({
      url: '/basic/park/delete',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 新增园区实时状态
   * @param request
   * @param data
   * @returns {*}
   */
  addParkStatus(request, data) {
    return request({
      url: '/basic/park/add',
      method: 'post',
      data
    })
  },
  /**
   * 更新园区实时状态
   * @param request
   * @param data
   * @returns {*}
   */
  updateParkStatus(request, data) {
    return request({
      url: '/basic/park/update',
      method: 'post',
      data
    })
  },
  /**
   * 获取园区实时状态树
   * @param request
   * @returns {*}
   */
  getParkTree(request) {
    return request({
      url: '/basic/park/getParkTree',
      method: 'post'
    })
  },
  /**
   * 获取园区实时状态下拉列表数据
   * @param request
   * @returns {*}
   */
  getParkStatusForSelect(request) {
    return request({
      url: '/basic/park/getParkList',
      method: 'post'
    })
  },
  /**
   * 获取楼栋下拉列表数据
   * @param request
   * @returns {*}
   */
  getBuildingsForSelect(request) {
    return request({
      url: '/basic/park/getBuildTreeList',
      method: 'post'
    })
  },
  /**
   * 获取楼层树
   * @param request
   * @returns {*}
   */
  getFloorTree(request) {
    return request({
      url: '/basic/park/getFloodTree',
      method: 'post'
    })
  }
}

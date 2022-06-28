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
      url: '/basic/park/getParkPageList',
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
  },
  /**
   * 获取园区树
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
   * 获取园区下拉列表数据
   * @param request
   * @returns {*}
   */
  getParksForSelect(request) {
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

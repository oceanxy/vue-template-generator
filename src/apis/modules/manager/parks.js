import qs from 'qs'

export default {
  /**
   * 获取中心列表
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
   * 修改中心状态
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
   * 删除中心
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
   * 新增中心
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
   * 更新中心
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
   * 获取中心树
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
   * 获取中心下拉列表数据
   * @param request
   * @returns {*}
   */
  getParksForSelect(request) {
    return request({
      url: '/basic/park/getParkList',
      method: 'post'
    })
  }
}

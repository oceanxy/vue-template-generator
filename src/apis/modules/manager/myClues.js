import qs from 'qs'

export default {
  /**
   * 获取我的线索列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getMyClues(request, data) {
    return request({
      url: '/business/clues/getMyCluesList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 修改我的线索状态
   * @param [request]
   * @param data
   * @returns {*}
   */
  updateMyCluesStatus(request, data) {
    return request({
      url: '/basic/park/updateStatus',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 删除我的线索
   * @param request
   * @param data
   * @returns {*}
   */
  deleteMyClues(request, data) {
    return request({
      url: '/basic/park/delete',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 新增我的线索
   * @param request
   * @param data
   * @returns {*}
   */
  addMyClues(request, data) {
    return request({
      url: '/basic/park/add',
      method: 'post',
      data
    })
  },
  /**
   * 更新我的线索
   * @param request
   * @param data
   * @returns {*}
   */
  updateMyClues(request, data) {
    return request({
      url: '/basic/park/update',
      method: 'post',
      data
    })
  },
  /**
   * 获取我的线索树
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
   * 获取我的线索下拉列表数据
   * @param request
   * @returns {*}
   */
  getMyCluesForSelect(request) {
    return request({
      url: '/basic/park/getParkList',
      method: 'post'
    })
  }
}

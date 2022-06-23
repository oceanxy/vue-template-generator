export default {
  /**
   * 获取行政区划级联数据
   * @param request
   * @returns {*}
   */
  getAdministrativeDivision(request) {
    return request({
      url: '/system/district/getThreeTree',
      method: 'post'
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
  }
}

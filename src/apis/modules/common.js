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
  }
}

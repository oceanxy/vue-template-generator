export default {
  /**
   * 获取行政区划级联数据
   * @param request
   * @returns {*}
   */
  getSchoolTree(request) {
    return request({
      url: '/personnel/school/getSchoolTree',
      method: 'post'
    })
  }
}

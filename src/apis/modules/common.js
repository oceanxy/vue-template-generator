export default {
  /**
   * 获取学校树
   * @param request
   * @returns {*}
   */
  getSchoolTree(request) {
    return request({
      url: '/personnel/school/getSchoolTree',
      method: 'post'
    })
  },
  /**
   * 获取学校街道树
   * @param request
   * @returns {*}
   */
  getStreetTree(request) {
    return request({
      url: '/personnel/school/getStreetTree',
      method: 'post'
    })
  },
  /**
   * 获取学校街道树
   * @param request
   * @returns {*}
   */
  getExamineCatalogTree(request) {
    return request({
      url: '/examine/examineCatalog/getExamineCatalogTree',
      method: 'post'
    })
  }
}

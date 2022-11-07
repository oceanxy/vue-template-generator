import qs from 'qs'

export default {
  /**
   * 体检配置-体检项目分类-获取分类分页集合
   * @param [request]
   * @param data
   * @returns {*}
   */
  getProjectClassification(request, data) {
    return request({
      url: '/examine/examineCatalog/getExamineCatalogList',
      method: 'post',
      data: qs.stringify(data)
    })
  },

  /**
   * 修改体检项目
   * @param request
   * @param data
   * @returns {*}
   */
  updateProjectClassification(request, data) {
    return request({
      url: '/examine/examineCatalog/update',
      method: 'post',
      data: qs.stringify(data)
    })
  },

  /**
   * 新增体检项目
   * @param request
   * @param data
   * @returns {*}
   */
  addProjectClassification(request, data) {
    return request({
      url: '/examine/examineCatalog/add',
      method: 'post',
      data: qs.stringify(data)
    })
  },

  /**
   * 删除体检项目
   * @param request
   * @param data
   * @returns {*}
   */
  deleteProjectClassification(request, data) {
    return request({
      url: '/examine/examineCatalog/delete',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

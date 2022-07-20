import qs from 'qs'

export default {
  /**
   * 获取指标类别列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getIndicatorCategories(request, data) {
    return request({
      url: '/operate/targetCatalog/getTargetCatalogPageList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 修改指标类别状态
   * @param [request]
   * @param data
   * @returns {*}
   */
  updateIndicatorCategoriesStatus(request, data) {
    return request({
      url: '/operate/targetCatalog/updateStatus',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 删除指标类别
   * @param request
   * @param data
   * @returns {*}
   */
  deleteIndicatorCategories(request, data) {
    return request({
      url: '/operate/targetCatalog/delete',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 新增指标类别
   * @param request
   * @param data
   * @returns {*}
   */
  addIndicatorCategories(request, data) {
    return request({
      url: '/operate/targetCatalog/add',
      method: 'post',
      data
    })
  },
  /**
   * 更新指标类别
   * @param request
   * @param data
   * @returns {*}
   */
  updateIndicatorCategories(request, data) {
    return request({
      url: '/operate/targetCatalog/update',
      method: 'post',
      data
    })
  },
  /**
   * 获取指标分类树（带顶级）
   * @param request
   * @returns {*}
   */
  getIndicatorCategoryTree(request) {
    return request({
      url: '/operate/targetCatalog/getTargetCatalogTree',
      method: 'post'
    })
  },
  /**
   * 获取指标分类树
   * @param request
   * @returns {*}
   */
  getIndicatorCategoryLikeTree(request) {
    return request({
      url: '/operate/targetCatalog/getTargetCatalogTreeList',
      method: 'post'
    })
  }
}

import qs from 'qs'

export default {
  /**
   * 获取资讯类别列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getContentReleaseInformationType(request, data) {
    return request({
      url: '/archive/archiveCatalog/getArchiveCatalogList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 更新资讯类别
   * @param request
   * @param data
   * @returns {*}
   */
  updateContentReleaseInformationType(request, data) {
    return request({
      url: '/archive/archiveCatalog/update',
      method: 'post',
      data
    })
  },
  /**
   * 新增资讯类别
   * @param [request]
   * @param data
   * @returns {*}
   */
  addContentReleaseInformationType(request, data) {
    return request({
      url: '/archive/archiveCatalog/add',
      method: 'post',
      data
    })
  },
  /**
   * 删除资讯类别
   * @param request
   * @param data
   * @returns {*}
   */
  deleteContentReleaseInformationType(request, data) {
    return request({
      url: '/archive/archiveCatalog/delete',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 修改资讯类别状态
   * @param request
   * @param data
   * @returns {*}
   */
  updateContentReleaseInformationTypeStatus(request, data) {
    return request({
      url: '/archive/archiveCatalog/updateStatus',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 获取资讯类别详情
   * @param request
   * @param data
   * @returns {*}
   */
  getDetailsOfContentReleaseInformationType(request, data) {
    return request({
      url: '/archive/archiveCatalog/getArchiveCatalog',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 获取树集合
   * @param request
   * @param data
   * @returns {*}
   */
  getTreeOfContentReleaseInformationType(request) {
    return request({
      url: '/archive/archiveCatalog/getTreeData',
      method: 'post'
    })
  }
}

import qs from 'qs'

export default {
  /**
   * 获取资讯列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getContentReleaseInformation(request, data) {
    return request({
      url: '/archive/article/getArticleList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 更新资讯
   * @param request
   * @param data
   * @returns {*}
   */
  updateContentReleaseInformation(request, data) {
    return request({
      url: '/archive/article/update',
      method: 'post',
      data
    })
  },
  /**
   * 新增资讯
   * @param [request]
   * @param data
   * @returns {*}
   */
  addContentReleaseInformation(request, data) {
    return request({
      url: '/archive/article/add',
      method: 'post',
      data
    })
  },
  /**
   * 删除资讯
   * @param request
   * @param data
   * @returns {*}
   */
  deleteContentReleaseInformation(request, data) {
    return request({
      url: '/archive/article/delete',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 修改资讯状态
   * @param request
   * @param data
   * @returns {*}
   */
  updateContentReleaseInformationStatus(request, data) {
    return request({
      url: '/archive/article/updateStatus',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 获取资讯详情
   * @param request
   * @param data
   * @returns {*}
   */
  getDetailsOfContentReleaseInformation(request, data) {
    return request({
      url: '/archive/article/getNotice',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

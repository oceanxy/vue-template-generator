export default {
  /**
   * 获取组织机构树
   * @param [request]
   * @returns {*}
   */
  getOrganTree(request) {
    return request({
      url: '/system/organ/getOrganTree',
      method: 'post'
    })
  }
}

import qs from 'qs'

export default {
  /**
   * 获取组织机构列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getOrganizations(request, data) {
    return request({
      url: '/system/organ/getOrganList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 更新组织机构
   * @param request
   * @param data
   * @returns {*}
   */
  updateOrganizations(request, data) {
    return request({
      url: '/system/organ/update',
      method: 'post',
      data
    })
  },
  /**
   * 新增组织机构
   * @param [request]
   * @param data
   * @returns {*}
   */
  addOrganizations(request, data) {
    return request({
      url: '/system/organ/add',
      method: 'post',
      data
    })
  },
  /**
   * 删除组织机构
   * @param request
   * @param data
   * @returns {*}
   */
  deleteOrganizations(request, data) {
    return request({
      url: '/system/organ/delete',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 获取组织机构树
   * @param request
   * @returns {*}
   */
  getOrganizationTree(request) {
    return request({
      url: '/system/organ/getOrganTree',
      method: 'post'
    })
  }
}

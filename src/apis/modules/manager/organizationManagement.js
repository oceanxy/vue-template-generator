import qs from 'qs'

export default {
  /**
   * 获取组织机构数据
   * @param [request]
   * @param data
   * @returns {*}
   */
  getOrganizationManagement(request, data) {
    return request({
      url: '/system/organ/getOrganList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 获取已选中的组织机构
   * @param request
   * @param data
   * @returns {*}
   */
  getOrganizationsSelected(request, data) {
    return request({
      url: '/system/organ/getOrgans',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 删除组织
   * @param request
   * @param data
   * @returns {*}
   */
  deleteOrganizationManagement(request, data) {
    return request({
      url: '/system/organ/delete',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 新增组织
   * @param request
   * @param data
   * @returns {*}
   */
  addOrganizationManagement(request, data) {
    return request({
      url: '/system/organ/add',
      method: 'post',
      data
    })
  },
  /**
   * 更新组织
   * @param request
   * @param data
   * @returns {*}
   */
  updateOrganizationManagement(request, data) {
    return request({
      url: '/system/organ/update',
      method: 'post',
      data
    })
  }
}

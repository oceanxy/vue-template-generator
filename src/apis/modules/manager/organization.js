import qs from 'qs'

export default {
  /**
   * 获取组织下拉列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getOrganizationsForSelect(request, data) {
    return request({
      url: '/examine/examineActivity/getOrganListByActivityId',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 获取组织机构树
   * @param request
   * @param data
   * @returns {*}
   */
  getOrganizationTree(request, data) {
    return request({
      url: '/system/organ/getOrganTree',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

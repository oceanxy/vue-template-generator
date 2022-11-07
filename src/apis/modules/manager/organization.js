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
  }
}

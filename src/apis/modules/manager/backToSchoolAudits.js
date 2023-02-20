import qs from 'qs'

export default {
  /**
   * 获取返校管理列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getBackToSchoolAudits(request, data) {
    return request({
      url: '/morningNoon/backSchool/getBackSchoolPageList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 返校审核
   * @param request
   * @param data
   * @returns {*}
   */
  updateBackToSchoolAudits(request, data) {
    return request({
      url: '/morningNoon/backSchool/audit',
      method: 'post',
      data
    })
  }
}

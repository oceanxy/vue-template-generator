import qs from 'qs'

export default {
  /**
   * 获取学校分页集合
   * @param [request]
   * @param data
   * @returns {*}
   */
  getSchoolManagement(request, data) {
    return request({
      url: '/personnel/school/getSchoolList',
      method: 'post',
      data: qs.stringify(data)
    })
  },

  /**
   * 修改学校
   * @param request
   * @param data
   * @returns {*}
   */
  updateSchoolManagement(request, data) {
    return request({
      url: '/personnel/school/update',
      method: 'post',
      data: qs.stringify(data)
    })
  },

  /**
   * 新增学校
   * @param request
   * @param data
   * @returns {*}
   */
  addSchoolManagement(request, data) {
    return request({
      url: '/personnel/school/add',
      method: 'post',
      data: qs.stringify(data)
    })
  },

  /**
   * 删除学校
   * @param request
   * @param data
   * @returns {*}
   */
  deleteSchoolManagement(request, data) {
    return request({
      url: '/personnel/school/delete',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

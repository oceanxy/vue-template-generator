import qs from 'qs'

export default {
  /**
   * 获取学校分页集合
   * @param [request]
   * @param data
   * @returns {*}
   */
  getGradeManagement(request, data) {
    return request({
      url: '/personnel/grade/getGradeList',
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
  updateGradeManagement(request, data) {
    return request({
      url: '/personnel/grade/update',
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
  addGradeManagement(request, data) {
    return request({
      url: '/personnel/grade/add',
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
  deleteGradeManagement(request, data) {
    return request({
      url: '/personnel/grade/delete',
      method: 'post',
      data: qs.stringify(data)
    })
  },

  /**
   * 获取学年和届数集合
   * @param [request]
   * @param data
   * @returns {*}
   */
  getYearList(request, data) {
    return request({
      url: '/personnel/grade/getYearList',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

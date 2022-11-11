import qs from 'qs'

export default {
  /**
   * 获取年级分页集合
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
   * 修改年级
   * @param request
   * @param data
   * @returns {*}
   */
  updateGradeManagement(request, data) {
    return request({
      url: '/personnel/grade/update',
      method: 'post',
      data
    })
  },

  /**
   * 新增年级
   * @param request
   * @param data
   * @returns {*}
   */
  addGradeManagement(request, data) {
    return request({
      url: '/personnel/grade/add',
      method: 'post',
      data
    })
  },

  /**
   * 删除年级
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
   * 修改年级状态
   * @param request
   * @param data
   * @returns {*}
   */
  updateGradeManagementStatus(request, data) {
    return request({
      url: '/personnel/grade/updateStatus',
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
  },

  /**
   * 设置年级为毕业
   * @param [request]
   * @param data
   * @returns {*}
   */
  updateGraduation(request, data) {
    return request({
      url: '/personnel/grade/updateGraduation',
      method: 'post',
      data: qs.stringify(data)
    })
  },

  /**
   * 根据街道ID获取学校集合
   * @param [request]
   * @param data
   * @returns {*}
   */
  getListByStreetId(request, data) {
    return request({
      url: '/personnel/school/getListByStreetId',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

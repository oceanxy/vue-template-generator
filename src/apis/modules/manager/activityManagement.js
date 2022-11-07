import qs from 'qs'

export default {
  /**
   * 体检配置-体检活动管理-获取分类分页集合
   * @param [request]
   * @param data
   * @returns {*}
   */
  getActivityManagement(request, data) {
    return request({
      url: '/examine/examineActivity/getExamineActivityList',
      method: 'post',
      data: qs.stringify(data)
    })
  },

  /**
   * 修改体检项
   * @param request
   * @param data
   * @returns {*}
   */
  updateActivityManagement(request, data) {
    return request({
      url: '/examine/examineActivity/update',
      method: 'post',
      data: qs.stringify(data)
    })
  },

  /**
   * 新增体检项
   * @param request
   * @param data
   * @returns {*}
   */
  addActivityManagement(request, data) {
    return request({
      url: '/examine/examineActivity/add',
      method: 'post',
      data: qs.stringify(data)
    })
  },

  /**
   * 删除体检项
   * @param request
   * @param data
   * @returns {*}
   */
  deleteActivityManagement(request, data) {
    return request({
      url: '/examine/examineActivity/delete',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

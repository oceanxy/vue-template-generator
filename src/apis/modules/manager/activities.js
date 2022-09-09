import qs from 'qs'

export default {
  /**
   * 获取活动列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getActivities(request, data) {
    return request({
      url: '/archive/activity/getActivityPageList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 修改活动状态
   * @param [request]
   * @param data
   * @returns {*}
   */
  updateActivitiesStatus(request, data) {
    return request({
      url: '/archive/activity/updateStatus',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 删除活动
   * @param request
   * @param data
   * @returns {*}
   */
  deleteActivities(request, data) {
    return request({
      url: '/archive/activity/delete',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 新增活动
   * @param request
   * @param data
   * @returns {*}
   */
  addActivities(request, data) {
    return request({
      url: '/archive/activity/add',
      method: 'post',
      data
    })
  },
  /**
   * 更新活动
   * @param request
   * @param data
   * @returns {*}
   */
  updateActivities(request, data) {
    return request({
      url: '/archive/activity/update',
      method: 'post',
      data
    })
  }
}

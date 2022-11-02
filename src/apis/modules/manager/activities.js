import qs from 'qs'

export default {
  /**
   * 获取活动下拉列表
   * @param [request]
   * @returns {*}
   */
  getActivitiesForSelect(request) {
    return request({
      url: '/examine/examineBloodPressure/getActivityList',
      method: 'post'
    })
  }
}

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
  },
  /**
   * 获取统计分析活动列表
   * @param request
   * @param data
   * @returns {*}
   */
  getActivitiesForStatisticsAnalysis(request, data) {
    return request({
      url: '/examine/examineStatistics/getNumInfoList',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

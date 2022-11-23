import qs from 'qs'

export default {
  /**
   * 年级纬度的活动肺活量集合
   * @param request
   * @param data
   * @returns {*}
   */
  getActivityVitalCapacityStatisticsByGrade(request, data) {
    return request({
      url: '/examine/examineStatistics/getActivityGradeLungLevel',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 导出年级纬度的活动肺活量数据
   * @param request
   * @param params
   * @returns {*}
   */
  exportActivityVitalCapacityStatisticsByGrade(request, params) {
    return request({
      url: '/examine/examineStatistics/exportActivityGradeLungLevel',
      method: 'get',
      params,
      responseType: 'blob'
    })
  }
}

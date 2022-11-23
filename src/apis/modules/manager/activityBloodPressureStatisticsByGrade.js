import qs from 'qs'

export default {
  /**
   * 年级纬度的活动血压集合
   * @param request
   * @param data
   * @returns {*}
   */
  getActivityBloodPressureStatisticsByGrade(request, data) {
    return request({
      url: '/examine/examineStatistics/getActivityGradeBloodLevel',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 导出年级纬度的活动血压数据
   * @param request
   * @param params
   * @returns {*}
   */
  exportActivityBloodPressureStatisticsByGrade(request, params) {
    return request({
      url: '/examine/examineStatistics/exportActivityGradeBloodLevel',
      method: 'get',
      params,
      responseType: 'blob'
    })
  }
}

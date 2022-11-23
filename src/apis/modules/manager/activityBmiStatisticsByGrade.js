import qs from 'qs'

export default {
  /**
   * 年级纬度的活动BMI集合
   * @param request
   * @param data
   * @returns {*}
   */
  getActivityBmiStatisticsByGrade(request, data) {
    return request({
      url: '/examine/examineStatistics/getActivityGradeBmiLevel',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 导出年级纬度的活动BMI数据
   * @param request
   * @param params
   * @returns {*}
   */
  exportActivityBmiStatisticsByGrade(request, params) {
    return request({
      url: '/examine/examineStatistics/exportActivityGradeBmiLevel',
      method: 'get',
      params,
      responseType: 'blob'
    })
  }
}

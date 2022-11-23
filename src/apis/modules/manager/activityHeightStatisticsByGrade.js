import qs from 'qs'

export default {
  /**
   * 年级纬度的活动身高集合
   * @param request
   * @param data
   * @returns {*}
   */
  getActivityHeightStatisticsByGrade(request, data) {
    return request({
      url: '/examine/examineStatistics/getActivityGradeHeightLevel',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 导出年级纬度的活动身高数据
   * @param request
   * @param params
   * @returns {*}
   */
  exportActivityHeightStatisticsByGrade(request, params) {
    return request({
      url: '/examine/examineStatistics/exportActivityGradeHeightLevel',
      method: 'get',
      params,
      responseType: 'blob'
    })
  }
}

import qs from 'qs'

export default {
  /**
   * 年级纬度的活动视力集合
   * @param request
   * @param data
   * @returns {*}
   */
  getActivityVisionStatisticsByGrade(request, data) {
    return request({
      url: '/examine/examineStatistics/getActivityGradeVisionLevel',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 导出年级纬度的活动视力数据
   * @param request
   * @param params
   * @returns {*}
   */
  exportActivityVisionStatisticsByGrade(request, params) {
    return request({
      url: '/examine/examineStatistics/exportActivityGradeVisionLevel',
      method: 'get',
      params,
      responseType: 'blob'
    })
  }
}

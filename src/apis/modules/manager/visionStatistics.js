import qs from 'qs'

export default {
  /**
   * 获取视力统计数据列表（按年龄）
   * 根绝 data.type 区别 url。（1：按年龄 2：按年级）
   * @param [request]
   * @param data
   * @returns {*}
   */
  getVisionStatistics(request, data) {
    return request({
      url: data.type === 1
        ? '/examine/examineStatistics/getExamineVisionStatistics'
        : '/examine/examineStatistics/getExamineVisionStatisticsByGrade',
      method: 'post',
      data: qs.stringify(data, { arrayFormat: 'comma' })
    })
  },
  /**
   * 导出视力统计数据
   * @param request
   * @param data
   * @returns {*}
   */
  exportVisionStatistics(request, data) {
    return request({
      url: '/examine/examineStatistics/exportStatisticsByVision',
      method: 'post',
      data: qs.stringify(data, { arrayFormat: 'comma' }),
      responseType: 'blob'
    })
  },
  /**
   * 获取视力统计学生数据集
   * @param request
   * @param data
   * @returns {*}
   */
  getStudentsOfVisionStatistics(request, data) {
    return request({
      url: '/examine/examineStatistics/getVisionStatisticsDataList',
      method: 'post',
      data: qs.stringify(data, { arrayFormat: 'comma' })
    })
  }
}

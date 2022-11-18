import qs from 'qs'

export default {
  /**
   * 获取血压统计数据列表（按年龄）
   * 根绝 data.type 区别 url。（1：按年龄 2：按年级）
   * @param [request]
   * @param data
   * @returns {*}
   */
  getBloodPressureStatistics(request, data) {
    return request({
      url: data.type === 1
        ? '/examine/examineStatistics/getExamineBloodStatistics'
        : '/examine/examineStatistics/getExamineBloodStatisticsByGrade',
      method: 'post',
      data: qs.stringify(data, { arrayFormat: 'comma' })
    })
  },
  /**
   * 导出血压统计数据
   * @param request
   * @param data
   * @returns {*}
   */
  exportBloodPressureStatistics(request, data) {
    return request({
      url: '/examine/examineStatistics/exportStatisticsByBlood',
      method: 'post',
      data: qs.stringify(data, { arrayFormat: 'comma' }),
      responseType: 'blob'
    })
  },
  /**
   * 获取血压统计学生数据集
   * @param request
   * @param data
   * @returns {*}
   */
  getStudentsOfBloodPressureStatistics(request, data) {
    return request({
      url: '/examine/examineStatistics/getBloodStatisticsDataList',
      method: 'post',
      data: qs.stringify(data, { arrayFormat: 'comma' })
    })
  }
}

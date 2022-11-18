import qs from 'qs'

export default {
  /**
   * 获取龋齿统计数据列表（按年龄）
   * 根绝 data.type 区别 url。（1：按年龄 2：按年级）
   * @param [request]
   * @param data
   * @returns {*}
   */
  getDentalCariesStatistics(request, data) {
    return request({
      url: data.type === 1
        ? '/examine/examineStatistics/getExamineCariesStatistics'
        : '/examine/examineStatistics/getExamineCariesStatisticsByGrade',
      method: 'post',
      data: qs.stringify(data, { arrayFormat: 'comma' })
    })
  },
  /**
   * 导出龋齿统计数据
   * @param request
   * @param data
   * @returns {*}
   */
  exportDentalCariesStatistics(request, data) {
    return request({
      url: '/examine/examineStatistics/exportStatisticsByCaries',
      method: 'post',
      data: qs.stringify(data, { arrayFormat: 'comma' }),
      responseType: 'blob'
    })
  },
  /**
   * 获取龋齿统计学生数据集
   * @param request
   * @param data
   * @returns {*}
   */
  getStudentsOfDentalCariesStatistics(request, data) {
    return request({
      url: '/examine/examineStatistics/getCariesStatisticsDataList',
      method: 'post',
      data: qs.stringify(data, { arrayFormat: 'comma' })
    })
  }
}

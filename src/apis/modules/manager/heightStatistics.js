import qs from 'qs'

export default {
  /**
   * 获取身高统计数据列表（按年龄）
   * 根绝 data.type 区别 url。（1：按年龄 2：按年级）
   * @param [request]
   * @param data
   * @returns {*}
   */
  getHeightStatistics(request, data) {
    return request({
      url: data.type === 1
        ? '/examine/examineStatistics/getExamineHeightStatistics'
        : '/examine/examineStatistics/getExamineHeightStatisticsByGrade',
      method: 'post',
      data: qs.stringify(data, { arrayFormat: 'comma' })
    })
  },
  /**
   * 导出身高统计数据
   * @param request
   * @param data
   * @returns {*}
   */
  exportHeightStatistics(request, data) {
    return request({
      url: '/examine/examineStatistics/exportStatisticsByHeight',
      method: 'post',
      data: qs.stringify(data, { arrayFormat: 'comma' }),
      responseType: 'blob'
    })
  },
  /**
   * 获取身高统计学生数据集
   * @param request
   * @param data
   * @returns {*}
   */
  getStudentsOfHeightStatistics(request, data) {
    return request({
      url: '/examine/examineStatistics/getHeightStatisticsDataList',
      method: 'post',
      data: qs.stringify(data, { arrayFormat: 'comma' })
    })
  }
}

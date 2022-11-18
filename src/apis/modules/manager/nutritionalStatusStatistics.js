import qs from 'qs'

export default {
  /**
   * 获取营养状况统计数据列表（按年龄）
   * 根绝 data.type 区别 url。（1：按年龄 2：按年级）
   * @param [request]
   * @param data
   * @returns {*}
   */
  getNutritionalStatusStatistics(request, data) {
    return request({
      url: data.type === 1
        ? '/examine/examineStatistics/getExamineBMIStatistics'
        : '/examine/examineStatistics/getExamineBMIStatisticsByGrade',
      method: 'post',
      data: qs.stringify(data, { arrayFormat: 'comma' })
    })
  },
  /**
   * 导出营养状况统计数据
   * @param request
   * @param data
   * @returns {*}
   */
  exportNutritionalStatusStatistics(request, data) {
    return request({
      url: '/examine/examineStatistics/exportStatisticsByBMI',
      method: 'post',
      data: qs.stringify(data, { arrayFormat: 'comma' }),
      responseType: 'blob'
    })
  },
  /**
   * 获取营养状况统计学生数据集
   * @param request
   * @param data
   * @returns {*}
   */
  getStudentsOfNutritionalStatusStatistics(request, data) {
    return request({
      url: '/examine/examineStatistics/getBMIStatisticsDataList',
      method: 'post',
      data: qs.stringify(data, { arrayFormat: 'comma' })
    })
  }
}

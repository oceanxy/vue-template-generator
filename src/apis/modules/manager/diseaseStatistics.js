import qs from 'qs'

export default {
  /**
   * 获取疾病统计数据列表（按年龄）
   * 根绝 data.type 区别 url。（1：按年龄 2：按年级）
   * @param [request]
   * @param data
   * @returns {*}
   */
  getDiseaseStatistics(request, data) {
    return request({
      url: data.type === 1
        ? '/examine/examineStatistics/getExamineDiseaseStatistics'
        : '/examine/examineStatistics/getExamineDiseaseStatisticsByGrade',
      method: 'post',
      data: qs.stringify(data, { arrayFormat: 'comma' })
    })
  },
  /**
   * 导出疾病统计数据
   * @param request
   * @param data
   * @returns {*}
   */
  exportDiseaseStatistics(request, data) {
    return request({
      url: '/examine/examineStatistics/exportStatisticsByDisease',
      method: 'post',
      data: qs.stringify(data, { arrayFormat: 'comma' }),
      responseType: 'blob'
    })
  },
  /**
   * 获取疾病统计学生数据集
   * @param request
   * @param data
   * @returns {*}
   */
  getStudentsOfDiseaseStatistics(request, data) {
    return request({
      url: '/examine/examineStatistics/getDiseaseStatisticsDataList',
      method: 'post',
      data: qs.stringify(data, { arrayFormat: 'comma' })
    })
  }
}

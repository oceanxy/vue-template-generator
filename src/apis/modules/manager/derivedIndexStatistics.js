import qs from 'qs'

export default {
  /**
   * 获取派生指数统计数据列表（按年龄）
   * 根绝 data.type 区别 url。（1：按年龄 2：按年级）
   * @param [request]
   * @param data
   * @returns {*}
   */
  getDerivedIndexStatistics(request, data) {
    return request({
      url: data.type === 1
        ? '/examine/examineStatistics/getExamineDeriveStatistics'
        : '/examine/examineStatistics/getExamineDeriveStatisticsByGrade',
      method: 'post',
      data: qs.stringify(data, { arrayFormat: 'comma' })
    })
  },
  /**
   * 导出派生指数统计数据
   * @param request
   * @param data
   * @returns {*}
   */
  exportDerivedIndexStatistics(request, data) {
    return request({
      url: '/examine/examineStatistics/exportStatisticsByDerive',
      method: 'post',
      data: qs.stringify(data, { arrayFormat: 'comma' }),
      responseType: 'blob'
    })
  },
  /**
   * 获取派生指数统计学生数据集
   * @param request
   * @param data
   * @returns {*}
   */
  getStudentsOfDerivedIndexStatistics(request, data) {
    return request({
      url: '/examine/examineStatistics/getDeriveStatisticsDataList',
      method: 'post',
      data: qs.stringify(data, { arrayFormat: 'comma' })
    })
  }
}

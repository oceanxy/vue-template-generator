import qs from 'qs'

export default {
  /**
   * 获取肺活量统计数据列表（按年龄）
   * 根绝 data.type 区别 url。（1：按年龄 2：按年级）
   * @param [request]
   * @param data
   * @returns {*}
   */
  getVitalCapacityStatistics(request, data) {
    return request({
      url: data.type === 1
        ? '/examine/examineStatistics/getExamineLungStatistics'
        : '/examine/examineStatistics/getExamineLungStatisticsByGrade',
      method: 'post',
      data: qs.stringify(data, { arrayFormat: 'comma' })
    })
  },
  /**
   * 导出肺活量统计数据
   * @param request
   * @param data
   * @returns {*}
   */
  exportVitalCapacityStatistics(request, data) {
    return request({
      url: '/examine/examineStatistics/exportStatisticsByLung',
      method: 'post',
      data: qs.stringify(data, { arrayFormat: 'comma' }),
      responseType: 'blob'
    })
  },
  /**
   * 获取肺活量统计学生数据集
   * @param request
   * @param data
   * @returns {*}
   */
  getStudentsOfVitalCapacityStatistics(request, data) {
    return request({
      url: '/examine/examineStatistics/getLungStatisticsDataList',
      method: 'post',
      data: qs.stringify(data, { arrayFormat: 'comma' })
    })
  }
}

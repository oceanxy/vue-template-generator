import qs from 'qs'
import apis from '@/apis'

export default {
  /**
   * 获取肺活量百分位统计数据列表
   * 根绝 data.type 区别 url。（1：按年龄 2：按年级）
   * @param [request]
   * @param data
   * @returns {*}
   */
  getVitalCapacityPercentile(request, data) {
    return request({
      url: data.type === 1
        ? '/examine/examineStatisticsPercent/getExamineLungPercentileStatistics'
        : '/examine/examineStatisticsPercent/getExamineLungPercentileStatisticsByGrade',
      method: 'post',
      data: qs.stringify(data, { arrayFormat: 'comma' })
    })
  },
  /**
   * 导出肺活量百分位统计数据
   * @param request
   * @param data
   * @returns {*}
   */
  exportVitalCapacityPercentile(request, data) {
    return request({
      url: '/examine/examineStatisticsPercent/exportPercentileStatisticsByLung',
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
  getStudentsOfVitalCapacityPercentile(request, data) {
    return apis.getStudentsOfHeightStatistics(data)
  }
}

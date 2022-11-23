import qs from 'qs'
import apis from '@/apis'

export default {
  /**
   * 获取肺活量指数百分位统计数据列表
   * 根绝 data.type 区别 url。（1：按年龄 2：按年级）
   * @param [request]
   * @param data
   * @returns {*}
   */
  getVitalCapacityIndexPercentile(request, data) {
    return request({
      url: data.type === 1
        ? '/examine/examineStatisticsPercent/getExamineLungIndexPercentileStatistics'
        : '/examine/examineStatisticsPercent/getExamineLungIndexPercentileStatisticsByGrade',
      method: 'post',
      data: qs.stringify(data, { arrayFormat: 'comma' })
    })
  },
  /**
   * 导出肺活量指数百分位统计数据
   * @param request
   * @param data
   * @returns {*}
   */
  exportVitalCapacityIndexPercentile(request, data) {
    return request({
      url: '/examine/examineStatisticsPercent/exportPercentileStatisticsByLungIndex',
      method: 'post',
      data: qs.stringify(data, { arrayFormat: 'comma' }),
      responseType: 'blob'
    })
  },
  /**
   * 获取肺活量指数统计学生数据集
   * @param request
   * @param data
   * @returns {*}
   */
  getStudentsOfVitalCapacityIndexPercentile(request, data) {
    return apis.getStudentsOfHeightStatistics(data)
  }
}

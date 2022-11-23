import qs from 'qs'
import apis from '@/apis'

export default {
  /**
   * 获取劳雷尔指数百分位统计数据列表
   * 根绝 data.type 区别 url。（1：按年龄 2：按年级）
   * @param [request]
   * @param data
   * @returns {*}
   */
  getRohrerIndexPercentile(request, data) {
    return request({
      url: data.type === 1
        ? '/examine/examineStatisticsPercent/getExamineLaurelPercentileStatistics'
        : '/examine/examineStatisticsPercent/getExamineLaurelPercentileStatisticsByGrade',
      method: 'post',
      data: qs.stringify(data, { arrayFormat: 'comma' })
    })
  },
  /**
   * 导出劳雷尔指数百分位统计数据
   * @param request
   * @param data
   * @returns {*}
   */
  exportRohrerIndexPercentile(request, data) {
    return request({
      url: '/examine/examineStatisticsPercent/exportPercentileStatisticsByLaurel',
      method: 'post',
      data: qs.stringify(data, { arrayFormat: 'comma' }),
      responseType: 'blob'
    })
  },
  /**
   * 获取劳雷尔指数统计学生数据集
   * @param request
   * @param data
   * @returns {*}
   */
  getStudentsOfRohrerIndexPercentile(request, data) {
    return apis.getStudentsOfHeightStatistics(data)
  }
}

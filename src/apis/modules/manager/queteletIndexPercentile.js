import qs from 'qs'
import apis from '@/apis'

export default {
  /**
   * 获取克托莱指数百分位统计数据列表
   * 根绝 data.type 区别 url。（1：按年龄 2：按年级）
   * @param [request]
   * @param data
   * @returns {*}
   */
  getQueteletIndexPercentile(request, data) {
    return request({
      url: data.type === 1
        ? '/examine/examineStatisticsPercent/getExamineQueteletPercentileStatistics'
        : '/examine/examineStatisticsPercent/getExamineQueteletPercentileStatisticsByGrade',
      method: 'post',
      data: qs.stringify(data, { arrayFormat: 'comma' })
    })
  },
  /**
   * 导出克托莱指数百分位统计数据
   * @param request
   * @param data
   * @returns {*}
   */
  exportQueteletIndexPercentile(request, data) {
    return request({
      url: '/examine/examineStatisticsPercent/exportPercentileStatisticsByQuetelet',
      method: 'post',
      data: qs.stringify(data, { arrayFormat: 'comma' }),
      responseType: 'blob'
    })
  },
  /**
   * 获取克托莱指数统计学生数据集
   * @param request
   * @param data
   * @returns {*}
   */
  getStudentsOfQueteletIndexPercentile(request, data) {
    return apis.getStudentsOfHeightStatistics(data)
  }
}

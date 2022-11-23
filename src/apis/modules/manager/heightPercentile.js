import qs from 'qs'
import apis from '@/apis'

export default {
  /**
   * 获取身高百分位统计数据列表
   * 根绝 data.type 区别 url。（1：按年龄 2：按年级）
   * @param [request]
   * @param data
   * @returns {*}
   */
  getHeightPercentile(request, data) {
    return request({
      url: data.type === 1
        ? '/examine/examineStatisticsPercent/getExamineHeightPercentileStatistics'
        : '/examine/examineStatisticsPercent/getExamineHeightPercentileStatisticsByGrade',
      method: 'post',
      data: qs.stringify(data, { arrayFormat: 'comma' })
    })
  },
  /**
   * 导出身高百分位统计数据
   * @param request
   * @param data
   * @returns {*}
   */
  exportHeightPercentile(request, data) {
    return request({
      url: '/examine/examineStatisticsPercent/exportPercentileStatisticsByHeight',
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
  getStudentsOfHeightPercentile(request, data) {
    return apis.getStudentsOfHeightStatistics(data)
  }
}

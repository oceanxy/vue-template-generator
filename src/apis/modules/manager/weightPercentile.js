import qs from 'qs'
import apis from '@/apis'

export default {
  /**
   * 获取体重百分位统计数据列表
   * 根绝 data.type 区别 url。（1：按年龄 2：按年级）
   * @param [request]
   * @param data
   * @returns {*}
   */
  getWeightPercentile(request, data) {
    return request({
      url: data.type === 1
        ? '/examine/examineStatisticsPercent/getExamineWeightPercentileStatistics'
        : '/examine/examineStatisticsPercent/getExamineWeightPercentileStatisticsByGrade',
      method: 'post',
      data: qs.stringify(data, { arrayFormat: 'comma' })
    })
  },
  /**
   * 导出体重百分位统计数据
   * @param request
   * @param data
   * @returns {*}
   */
  exportWeightPercentile(request, data) {
    return request({
      url: '/examine/examineStatisticsPercent/exportPercentileStatisticsByWeight',
      method: 'post',
      data: qs.stringify(data, { arrayFormat: 'comma' }),
      responseType: 'blob'
    })
  },
  /**
   * 获取体重统计学生数据集
   * @param request
   * @param data
   * @returns {*}
   */
  getStudentsOfWeightPercentile(request, data) {
    return apis.getStudentsOfHeightStatistics(data)
  }
}

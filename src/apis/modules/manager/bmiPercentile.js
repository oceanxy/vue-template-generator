import qs from 'qs'
import apis from '@/apis'

export default {
  /**
   * 获取BMI百分位统计数据列表
   * 根绝 data.type 区别 url。（1：按年龄 2：按年级）
   * @param [request]
   * @param data
   * @returns {*}
   */
  getBmiPercentile(request, data) {
    return request({
      url: data.type === 1
        ? '/examine/examineStatisticsPercent/getExamineBMIPercentileStatistics'
        : '/examine/examineStatisticsPercent/getExamineBMIPercentileStatisticsByGrade',
      method: 'post',
      data: qs.stringify(data, { arrayFormat: 'comma' })
    })
  },
  /**
   * 导出BMI百分位统计数据
   * @param request
   * @param data
   * @returns {*}
   */
  exportBmiPercentile(request, data) {
    return request({
      url: '/examine/examineStatisticsPercent/exportPercentileStatisticsByBMI',
      method: 'post',
      data: qs.stringify(data, { arrayFormat: 'comma' }),
      responseType: 'blob'
    })
  },
  /**
   * 获取BMI统计学生数据集
   * @param request
   * @param data
   * @returns {*}
   */
  getStudentsOfBmiPercentile(request, data) {
    return apis.getStudentsOfHeightStatistics(data)
  }
}

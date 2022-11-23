import qs from 'qs'
import apis from '@/apis'

export default {
  /**
   * 获取舒张压百分位统计数据列表
   * 根绝 data.type 区别 url。（1：按年龄 2：按年级）
   * @param [request]
   * @param data
   * @returns {*}
   */
  getDiastolicBloodPressurePercentile(request, data) {
    return request({
      url: data.type === 1
        ? '/examine/examineStatisticsPercent/getExamineDiastolicPercentileStatistics'
        : '/examine/examineStatisticsPercent/getExamineDiastolicPercentileStatisticsByGrade',
      method: 'post',
      data: qs.stringify(data, { arrayFormat: 'comma' })
    })
  },
  /**
   * 导出舒张压百分位统计数据
   * @param request
   * @param data
   * @returns {*}
   */
  exportDiastolicBloodPressurePercentile(request, data) {
    return request({
      url: '/examine/examineStatisticsPercent/exportPercentileStatisticsByDiastolic',
      method: 'post',
      data: qs.stringify(data, { arrayFormat: 'comma' }),
      responseType: 'blob'
    })
  },
  /**
   * 获取舒张压统计学生数据集
   * @param request
   * @param data
   * @returns {*}
   */
  getStudentsOfDiastolicBloodPressurePercentile(request, data) {
    return apis.getStudentsOfHeightStatistics(data)
  }
}

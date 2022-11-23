import qs from 'qs'
import apis from '@/apis'

export default {
  /**
   * 获取收缩压百分位统计数据列表
   * 根绝 data.type 区别 url。（1：按年龄 2：按年级）
   * @param [request]
   * @param data
   * @returns {*}
   */
  getSystolicBloodPressurePercentile(request, data) {
    return request({
      url: data.type === 1
        ? '/examine/examineStatisticsPercent/getExamineSystolicPercentileStatistics'
        : '/examine/examineStatisticsPercent/getExamineSystolicPercentileStatisticsByGrade',
      method: 'post',
      data: qs.stringify(data, { arrayFormat: 'comma' })
    })
  },
  /**
   * 导出收缩压百分位统计数据
   * @param request
   * @param data
   * @returns {*}
   */
  exportSystolicBloodPressurePercentile(request, data) {
    return request({
      url: '/examine/examineStatisticsPercent/exportPercentileStatisticsBySystolic',
      method: 'post',
      data: qs.stringify(data, { arrayFormat: 'comma' }),
      responseType: 'blob'
    })
  },
  /**
   * 获取收缩压统计学生数据集
   * @param request
   * @param data
   * @returns {*}
   */
  getStudentsOfSystolicBloodPressurePercentile(request, data) {
    return apis.getStudentsOfHeightStatistics(data)
  }
}

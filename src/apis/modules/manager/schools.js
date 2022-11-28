import qs from 'qs'

export default {
  /**
   * 获取学校数据（统计分析模块专用）
   * @param [request]
   * @param data
   * @returns {*}
   */
  getSchoolsForStatisticalAnalysis(request, data) {
    return request({
      url: '/examine/examineStatistics/getStatisticsSchoolList',
      method: 'post',
      data: qs.stringify(data, { arrayFormat: 'comma' })
    })
  },
  /**
   * 获取学校数据（按组织ID）
   * @param [request]
   * @param data
   * @returns {*}
   */
  getSchoolsByOrganizationId(request, data) {
    return request({
      url: '/personnel/school/getListByOrganId',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

import qs from 'qs'

export default {
  /**
   * 获取身高统计数据列表（按年龄）
   * @param [request]
   * @param data
   * @returns {*}
   */
  getHeightOfStatistical(request, data) {
    return request({
      url: '/examine/examineStatistics/getExamineHeightStatistics',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 获取身高统计数据列表（按年级）
   * @param [request]
   * @param data
   * @returns {*}
   */
  getHeightOfStatisticalByGrade(request, data) {
    return request({
      url: '/examine/examineStatistics/getExamineHeightStatisticsByGrade',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 导出体检基础数据
   * @param request
   * @param params
   * @returns {*}
   */
  exportBasicData(request, params) {
    return request({
      url: '/examine/examineStatistics/exportDataExcel',
      method: 'get',
      params,
      responseType: 'blob'
    })
  }
}

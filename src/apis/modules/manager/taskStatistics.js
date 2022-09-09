import qs from 'qs'

export default {
  /**
   * 获取团队任务列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getTaskStatistics(request, data) {
    return request({
      url: '/business/clues/cluesTaskPaginationList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 获取导出列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getExcelOfTaskStatistics(request, data) {
    return request({
      url: '/business/clues/cluesTaskImport',
      method: 'post',
      responseType: 'blob',
      data: qs.stringify(data)
    })
  }
}

import qs from 'qs'

export default {
  /**
   * 获取我的报表列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getMyReports(request) {
    return request({
      url: '/operate/reportRecord/getMyReportList',
      method: 'post'
    })
  },
  /**
   * 获取报表项目集合
   * @param request
   * @param data
   * @returns {*}
   */
  getFillOutReportOfMyReports(request, data) {
    return request({
      url: '/operate/reportRecord/getItemList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 获取我的报表->填报记录列表
   * @param request
   * @param data
   * @returns {*}
   */
  getFillInRecordsOfMyReports(request, data) {
    return request({
      url: '/operate/reportRecord/getMyReportResultList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 提交填报报表
   * @param request
   * @param data
   * @returns {*}
   */
  addReportRecord(request, data) {
    return request({
      url: '/operate/reportRecord/add',
      method: 'post',
      data
    })
  }
}

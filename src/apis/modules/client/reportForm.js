import qs from 'qs'

export default {
  /**
   * 获取我的报表集合
   * @param [request]
   * @param data
   * @returns {*}
   */
  getMyReportList(request) {
    return request({
      url: '/operate/report/getMyReportList',
      method: 'post'
    })
  },
  /**
   * 获取报表项目集合
   * @param [request]
   * @param data
   * @returns {*}
   */
  reportGetItemList(request, data) {
    return request({
      url: '/operate/report/getItemList',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

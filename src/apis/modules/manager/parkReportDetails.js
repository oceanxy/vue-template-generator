import qs from 'qs'

export default {
  /**
   * 获取中心报表明细列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getParkReportDetails(request, data) {
    return request({
      url: '/operate/reportRecord/getParkReportRecordPageList',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

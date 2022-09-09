import qs from 'qs'

export default {
  /**
   * 获取缴费记录列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getFinanceRecords(request, data) {
    return request({
      url: '/operate/notifyMessage/getUserCompanyBillRecordList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 获取缴费记录详情
   * @param [request]
   * @param data
   * @returns {*}
   */
  getFinanceRecordsDetails(request, data) {
    return request({
      url: '/operate/notifyMessage/getUserCompanyBillRecordDetailList',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

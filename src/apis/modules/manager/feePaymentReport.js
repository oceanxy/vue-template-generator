import qs from 'qs'

export default {
  /**
   * 获取缴费记录列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getFeePaymentReport(request, data) {
    return request({
      url: '/business/billRecord/getRecordPageList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 获取缴费记录明细
   * @param request
   * @param data
   * @returns {*}
   */
  getDetailsOfFeePaymentReport(request, data) {
    return request({
      url: '/business/billRecord/getRecordDetailList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 开具发票
   * @param request
   * @param data
   * @returns {*}
   */
  billing(request, data) {
    return request({
      url: 'business/invoice/add',
      method: 'post',
      data
    })
  },
  /**
   * 确认收款
   * @param request
   * @param data
   * @returns {*}
   */
  confirmedPaid(request, data) {
    return request({
      url: '/business/billRecord/confirmReceipt',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

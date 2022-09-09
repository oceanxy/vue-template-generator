import qs from 'qs'

export default {
  /**
   * 获取公司账单
   * @param [request]
   * @param data
   * @returns {*}
   */
  getDetailsOfBills(request, data) {
    return request({
      url: '/operate/notifyMessage/getUserCompanyBillList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 缴费
   * @param request
   * @param data
   * @returns {*}
   */
  paymentOnClient(request, data) {
    return request({
      url: '/operate/notifyMessage/payContractBill',
      method: 'post',
      data
    })
  }
}

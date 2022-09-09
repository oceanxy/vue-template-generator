import qs from 'qs'

export default {
  /**
   * 获取保证金列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getEarnestMoney(request, data) {
    return request({
      url: '/business/earnest/getEarnestList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 获取保证金变动明细
   * @param request
   * @param data
   * @returns {*}
   */
  getDetailsOfEarnestMoney(request, data) {
    return request({
      url: '/business/earnest/getEarnestChangeList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 收款/退款
   * @param request
   * @param data
   * @returns {*}
   */
  earnestMoneySettlement(request, data) {
    return request({
      url: '/business/earnest/incomeEarnest',
      method: 'post',
      data
    })
  }
}

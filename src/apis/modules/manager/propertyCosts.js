import qs from 'qs'

export default {
  /**
   * 获取物业费列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getPropertyCosts(request, data) {
    return request({
      url: '/business/billAmount/getServiceAmountList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 更新物业费金额
   * @param request
   * @param data
   * @returns {*}
   */
  updatePropertyCosts(request, data) {
    return request({
      url: '/business/billAmount/updateServiceAmount',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

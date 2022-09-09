import qs from 'qs'

export default {
  /**
   * 获取水电费列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getUtilities(request, data) {
    return request({
      url: '/business/billAmount/getElectricAmountList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 更新水电费金额
   * @param request
   * @param data
   * @returns {*}
   */
  updateUtilities(request, data) {
    return request({
      url: '/business/billAmount/updateElectricAmount',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

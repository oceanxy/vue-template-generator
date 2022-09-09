import qs from 'qs'

export default {
  /**
   * 获取账单统计列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getBillingStatistics(request, data) {
    return request({
      url: '/business/billCount/getBillTypeCountList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 获取图表数据
   * @param request
   * @param data
   * @returns {*}
   */
  getChartOfBillingStatistics(request, data) {
    return request({
      url: '/business/billCount/getDateBillCountList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 获取统计图年份数据集
   * @param request
   * @returns {*}
   */
  getChartYearsOfBillingStatistics(request) {
    return request({
      url: '/business/billCount/getBillDateList',
      method: 'post'
    })
  }
}

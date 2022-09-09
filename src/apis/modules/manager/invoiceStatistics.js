import qs from 'qs'

export default {
  /**
   * 获取开票统计列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getInvoiceStatistics(request, data) {
    return request({
      url: '/business/invoice/getRecordPageList',
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
  getChartOfInvoiceStatistics(request, data) {
    return request({
      url: '/business/invoice/getInvoiceCount',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 获取统计图年份数据集
   * @param request
   * @returns {*}
   */
  getChartYearsOfInvoiceStatistics(request) {
    return request({
      url: '/business/invoice/getYearList',
      method: 'post'
    })
  },
  /**
   * 获取开票明细数据集
   * @param request
   * @param data
   * @returns {*}
   */
  getDetailsOfInvoiceStatistics(request, data) {
    return request({
      url: '/business/invoice/getInvoiceInfo',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

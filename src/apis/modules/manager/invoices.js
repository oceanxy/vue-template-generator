import qs from 'qs'

export default {
  /**
   * 获取发票列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getInvoices(request, data) {
    return request({
      url: '/business/invoice/getInvoicePageList',
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
  invoice(request, data) {
    return request({
      url: '/business/invoice/openInvoice',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 导出发票
   * @param [request]
   * @param params
   * @returns {*}
   */
  getExcelOfInvoices(request, params) {
    return request({
      url: '/business/invoice/exportExcel',
      method: 'get',
      params,
      responseType: 'blob'
    })
  }
}

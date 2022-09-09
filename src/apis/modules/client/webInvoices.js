import qs from 'qs'

export default {
  /**
   * 发票列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getWebInvoices(request, data = {}) {
    return request({
      url: '/business/invoice/getInvoicePageList',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

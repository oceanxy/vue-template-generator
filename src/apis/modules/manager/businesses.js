import qs from 'qs'

export default {
  /**
   * 获取企业列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getBusinesses(request, data) {
    return request({
      url: '/business/company/getCompanyPageList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 获取企业详情
   * @param request
   * @param data
   * @returns {*}
   */
  getDetailsOfBusinesses(request, data) {
    return request({
      // url: '/business/company/getCompany',
      url: '/business/invoice/getInvoiceDetail',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 获取已签约企业集合
   * @param request
   * @param data
   * @returns {*}
   */
  getBusinessesForSelect(request, data) {
    return request({
      url: '/business/company/getSignCompanySearchPageList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 发送短信
   * @param request
   * @param data
   * @returns {*}
   */
  sendSMS(request, data) {
    return request({
      url: '/business/company/sendSMS',
      method: 'post',
      data: qs.stringify(data, { arrayFormat: 'comma' })
    })
  },
  /**
   * 获取投诉建议集合
   * @param request
   * @param data
   * @returns {*}
   */
  getSuggestionsOfBusinesses(request, data) {
    return request({
      url: '/business/company/getComplaintList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 获取缴费记录集合
   * @param request
   * @param data
   * @returns {*}
   */
  getPaymentRecordsOfBusinesses(request, data) {
    return request({
      url: '/business/company/getPayRecord',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 获取账单集合
   * @param request
   * @param data
   * @returns {*}
   */
  getBillsOfBusinesses(request, data) {
    return request({
      url: '/business/company/getBillList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 导出企业
   * @param request
   * @param params
   * @returns {*}
   */
  getExcelOfBusinesses(request, params) {
    return request({
      url: '/business/company/exportExcel',
      method: 'get',
      params,
      responseType: 'blob'
    })
  },
  /**
   * 删除企业
   * @param request
   * @param data
   * @returns {*}
   */
  deleteBusinesses(request, data) {
    return request({
      url: '/business/company/delete',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

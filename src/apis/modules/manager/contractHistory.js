import qs from 'qs'

export default {
  /**
   * 获取历史签约列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getContractHistory(request, data) {
    return request({
      url: '/business/contractAudit/getHistoryContractList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 导出签约历史
   * @param [request]
   * @param params
   * @returns {*}
   */
  getExcelOfContractHistory(request, params) {
    return request({
      url: '/business/contractAudit/exportExcel',
      method: 'get',
      params,
      responseType: 'blob'
    })
  }
}

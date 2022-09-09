import qs from 'qs'

export default {
  /**
   * 获取财务 -> 合同列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getValidContracts(request, data) {
    return request({
      url: '/business/contract/getContractList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 企业缴费
   * @param request
   * @param data
   * @returns {*}
   */
  enterprisePayment(request, data) {
    return request({
      url: '/business/contract/payContractBill',
      method: 'post',
      data
    })
  },
  /**
   * 催缴
   * @param request
   * @param data
   * @returns {*}
   */
  urgingPayment(request, data) {
    return request({
      url: '/business/contract/sendMindMessage',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 获取支付方式
   * @param request
   * @param data
   * @returns {*}
   */
  getPaymentMethods(request, data) {
    return request({
      url: '/business/contract/getContractPayType',
      method: 'post',
      data
    })
  },
  /**
   * 获取待缴费账单（企业缴费弹窗内）
   * @param request
   * @param data
   * @returns {*}
   */
  getPendingOrders(request, data) {
    return request({
      url: '/business/contract/getContractWaitPayBillList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 获取待缴费账单（待缴费弹窗内的列表）
   * @param request
   * @param data
   * @returns {*}
   */
  getListOfPendingOrder(request, data) {
    return request({
      url: '/business/contract/getWaitPayBillList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 获取缴费记录
   * @param request
   * @param data
   * @returns {*}
   */
  getListOfPaymentRecords(request, data) {
    return request({
      url: '/business/contract/getPayRecordList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 删除合同
   * @param request
   * @param data
   * @returns {*}
   */
  deleteValidContracts(request, data) {
    return request({
      url: '/business/companyContract/delete',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

import qs from 'qs'

export default {
  /**
   * 获取解约申请记录分页列表-园区
   * @param [request]
   * @param data
   * @returns {*}
   */
  getCancellationReviewFromFinance(request, data) {
    return request({
      url: '/business/contractRemove/getFinancialContractRemoveList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 提交审核
   * @param request
   * @param data
   * @returns {*}
   */
  cancellationReviewFromFinance(request, data) {
    return request({
      url: '/business/contractRemove/financialAuditRemove',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 获取审核详细信息
   * @param request
   * @param data
   * @returns {*}
   */
  getDetailsOfCancellationReviewFromFinance(request, data) {
    return request({
      url: '/business/contractRemove/getContractRemoveDetailFinancial',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

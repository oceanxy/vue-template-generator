import qs from 'qs'

export default {
  /**
   * 获取审核企业优惠记录分页集合
   * @param [request]
   * @param data
   * @returns {*}
   */
  getDiscountVerify(request, data) {
    return request({
      url: '/business/saleRecord/getAuditSaleRecordPageList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 优惠记录审核
   * @param [request]
   * @param data
   * @returns {*}
   */
  auditRecordDiscountVerify(request, data) {
    return request({
      url: '/business/saleRecord/auditRecord',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

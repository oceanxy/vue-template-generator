import qs from 'qs'

export default {
  /**
   * 获取优惠记录列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getDiscountRecord(request, data) {
    return request({
      url: '/business/saleRecord/getSaleRecordPageList',
      method: 'post',
      data: qs.stringify(data)
    })
  },

  /**
   * 删除优惠记录
   * @param request
   * @param data
   * @returns {*}
   */
  deleteDiscountRecord(request, data) {
    return request({
      url: '/business/saleRecord/delete',
      method: 'post',
      data: qs.stringify(data)
    })
  },

  /**
   * 获取优惠记录详情
   * @param request
   * @param data
   * @returns {*}
   */
  getDetailsOfDiscountRecord(request, data) {
    return request({
      url: '/business/saleRecord/getSaleRecord',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

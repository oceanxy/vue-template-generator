import qs from 'qs'

export default {
  /**
   * 获取解约申请记录分页列表-园区
   * @param [request]
   * @param data
   * @returns {*}
   */
  getCancellationReviewFromPark(request, data) {
    return request({
      url: '/business/contractRemove/getParkContractRemoveList',
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
  cancellationReviewFromPark(request, data) {
    return request({
      url: '/business/contractRemove/parkAuditRemove',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

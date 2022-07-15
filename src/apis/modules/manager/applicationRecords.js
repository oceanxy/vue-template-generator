import qs from 'qs'

export default {
  /**
   * 获取解约申请记录列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getApplicationRecords(request, data) {
    return request({
      url: '/business/contractRemove/getContractRemoveList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 获取解约申请记录详情
   * @param request
   * @param data
   * @returns {*}
   */
  getDetailsOfApplicationRecords(request, data) {
    return request({
      url: '/business/contractRemove/getContractRemoveDetail',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

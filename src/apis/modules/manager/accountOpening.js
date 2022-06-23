import qs from 'qs'

export default {
  /**
   * 获取账号申请列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getAccountOpening(request, data) {
    return request({
      url: '/system/accountApply/getAccountApplyPage',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 账号审核
   * @param [request]
   * @param data
   * @returns {*}
   */
  updateAccountOpening(request, data) {
    return request({
      url: '/system/accountApply/auditAccountApply',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 新增账号申请
   * @param request
   * @param data
   * @returns {*}
   */
  addAccountOpening(request, data) {
    return request({
      url: '/basic/park/add',
      method: 'post',
      data
    })
  }
}

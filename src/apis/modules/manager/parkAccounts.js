import qs from 'qs'

export default {
  /**
   * 获取中心账号列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getParkAccounts(request, data) {
    return request({
      url: '/system/account/getAccountPage',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 修改中心账号状态
   * @param [request]
   * @param data
   * @returns {*}
   */
  updateParkAccountsStatus(request, data) {
    return request({
      url: '/system/account/updateStatus',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 更新中心账号
   * @param request
   * @param data
   * @returns {*}
   */
  updateParkAccounts(request, data) {
    return request({
      url: '/system/account/update',
      method: 'post',
      data
    })
  },
  /**
   * 更新中心账号密码
   * @param request
   * @param data
   * @returns {*}
   */
  updatePasswordOfParkAccounts(request, data) {
    return request({
      url: '/system/account/resetPwd',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

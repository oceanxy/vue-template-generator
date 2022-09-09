import qs from 'qs'

export default {
  /**
   * 获取小程序用户列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getSystemXcxUser(request, data) {
    return request({
      url: '/system/user/getUserList',
      method: 'post',
      data: qs.stringify(data)
    })
  },

  /**
   * 删除用户
   * @param request
   * @param data
   * @returns {*}
   */
  deleteSystemXcxUser(request, data) {
    return request({
      url: '/system/user/delete',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 更新员工
   * @param request
   * @param data
   * @returns {*}
   */
  updateSystemXcxUser(request, data) {
    return request({
      url: '/system/user/update',
      method: 'post',
      data
    })
  },

  /**
   * 获取用户可选企业分页集合
   * @param request
   * @param data
   * @returns {*}
   */
  getWaitCompanyContractList(request, data) {
    return request({
      url: '/system/user/getWaitCompanyContractList',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

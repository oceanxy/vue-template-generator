export default {
  /**
   * 获取服务管理费配置详情
   * @param [request]
   * @returns {*}
   */
  getServiceManagementFee(request) {
    return request({
      url: '/business/payItemConfig/getServicePayItem',
      method: 'post'
    })
  },
  /**
   * 修改服务管理费配置
   * @param request
   * @param data
   * @returns {*}
   */
  updateServiceManagementFee(request, data) {
    return request({
      url: '/business/payItemConfig/updateServicePayItem',
      method: 'post',
      data
    })
  },
  /**
   * 获取履约保证金配置详情
   * @param request
   * @returns {*}
   */
  getSecurityDeposit(request) {
    return request({
      url: '/business/payItemConfig/getMarginPayItem',
      method: 'post'
    })
  },
  /**
   * 修改保证金配置
   * @param request
   * @param data
   * @returns {*}
   */
  updateSecurityDeposit(request, data) {
    return request({
      url: '/business/payItemConfig/updateMarginPayItem',
      method: 'post',
      data
    })
  },
  /**
   * 获取租金配置详情
   * @param request
   * @returns {*}
   */
  getRentsOfFinancialConf(request) {
    return request({
      url: '/business/payItemConfig/getRentItem',
      method: 'post'
    })
  },
  /**
   * 修改租金配置
   * @param request
   * @param data
   * @returns {*}
   */
  updateRent(request, data) {
    return request({
      url: '/business/payItemConfig/updateRentItem',
      method: 'post',
      data
    })
  },
  /**
   * 获取应付款项配置列表
   * @param request
   * @returns {*}
   */
  getPayables(request) {
    return request({
      url: '/business/payItemConfig/getPayItemList',
      method: 'post'
    })
  }
}

export default {
  /**
   * 获取签约业务模版列表
   * @param [request]
   * @returns {*}
   */
  getDetailsOfBusinessConfiguration(request) {
    return request({
      url: '/business/payItemConfig/getServicePayItem',
      method: 'post'
    })
  }
}

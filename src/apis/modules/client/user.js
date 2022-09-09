export default {
  /**
   * 获取用户信息接口
   * @param [request]
   * @returns {*}
   */
  getDetailInfo(request) {
    return request({
      url: '/auth/userInfo/getDetailInfo',
      method: 'post'
    })
  }
}

import qs from 'qs'

export default {
  /**
   * 登录
   * @param [request]
   * @param data
   * @returns {*}
   */
  login(request, data) {
    return request({
      url: '/auth/passport/login',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 登出
   * @param [request]
   * @returns {*}
   */
  logout(request) {
    return request({
      url: '/auth/passport/logout',
      method: 'post'
    })
  }
}

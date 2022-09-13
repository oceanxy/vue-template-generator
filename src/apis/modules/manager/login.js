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
  },
  /**
   * 获取当前登录用户信息
   * @param [request]
   * @returns {*}
   */
  getUserInfo(request) {
    return request({
      url: '/auth/passport/getUserInfo',
      method: 'post'
    })
  },
  /**
   * 获取当前登录用户的菜单
   * @param [request]
   * @returns {*}
   */
  getMenusOfCurrentUser(request) {
    return request({
      url: '/auth/passport/getUserMenuList',
      method: 'post'
    })
  },
  /**
   * 获取当前登录用户的中心列表
   * @param request
   * @returns {*}
   */
  getParksOfCurrentUser(request) {
    return request({
      url: '/auth/passport/getUserParkList',
      method: 'post'
    })
  }
}
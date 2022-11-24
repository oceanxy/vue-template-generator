export default {
  /**
   * 获取角色树
   * @param [request]
   * @returns {*}
   */
  getRoleTree(request) {
    return request({
      url: '/system/role/getRoles',
      method: 'post'
    })
  }
}

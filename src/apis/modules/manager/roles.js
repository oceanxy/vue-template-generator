import qs from 'qs'

export default {
  /**
   * 获取角色列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getRoles(request, data) {
    return request({
      url: '/system/role/getRoleList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 更新角色
   * @param request
   * @param data
   * @returns {*}
   */
  updateRoles(request, data) {
    return request({
      url: '/system/role/update',
      method: 'post',
      data
    })
  },
  /**
   * 新增角色
   * @param [request]
   * @param data
   * @returns {*}
   */
  addRoles(request, data) {
    return request({
      url: '/system/role/add',
      method: 'post',
      data
    })
  },
  /**
   * 删除角色
   * @param request
   * @param data
   * @returns {*}
   */
  deleteRoles(request, data) {
    return request({
      url: '/system/role/delete',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 获取角色树
   * @param request
   * @param data
   * @returns {*}
   */
  getRoleTree(request, data) {
    return request({
      url: '/system/role/getRoleTree',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

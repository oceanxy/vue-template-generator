import qs from 'qs'

export default {
  /**
   * 获取角色列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getSystemRole(request, data) {
    return request({
      url: '/system/role/getRoleList',
      method: 'post',
      data: qs.stringify(data)
    })
  },

  /**
   * 删除角色
   * @param request
   * @param data
   * @returns {*}
   */
  deleteSystemRole(request, data) {
    return request({
      url: '/system/role/delete',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 新增角色
   * @param request
   * @param data
   * @returns {*}
   */
  addSystemRole(request, data) {
    return request({
      url: '/system/role/add',
      method: 'post',
      data
    })
  },
  /**
   * 更新角色
   * @param request
   * @param data
   * @returns {*}
   */
  updateSystemRole(request, data) {
    return request({
      url: '/system/role/update',
      method: 'post',
      data
    })
  },
  /**
   * 获取角色详情
   * @param request
   * @param data
   * @returns {*}
   */
  getDetailsOfSystemRole(request, data) {
    return request({
      url: '/system/role/getRole',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 获取角色树
   * @param request
   * @returns {*}
   */
  getRoleTree(request) {
    return request({
      url: '/system/role/getRoleTree',
      method: 'post'
    })
  },
  /**
   * 获取菜单树
   * @param request
   * @returns {*}
   */
  getPrivilegeTree(request, data) {
    return request({
      url: '/system/privilege/getPrivilegeTree',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 获取角色的权限菜单
   * @param request
   * @param data
   * @returns {*}
   */
  getPermissionMenus(request, data) {
    return request({
      url: '/system/privilege/getRoleMergerMenuList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 设置角色的权限菜单
   * @param request
   * @param data
   * @returns {*}
   */
  setPermissionMenus(request, data) {
    return request({
      url: '/system/privilege/setPrivilege',
      method: 'post',
      data: data
    })
  }
}

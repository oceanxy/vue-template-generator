import qs from 'qs'

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
  },
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
   * 新增角色
   * @param request
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
   * 获取角色详情
   * @param request
   * @param data
   * @returns {*}
   */
  getDetailsOfRoles(request, data) {
    return request({
      url: '/system/role/getRole',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 获取角色权限配置菜单树
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
      url: '/system/privilege/setprivilege',
      method: 'post',
      data: data
    })
  }
}

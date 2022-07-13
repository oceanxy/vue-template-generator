import qs from 'qs'

export default {
  /**
   * 获取菜单列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getSystemMenu(request, data) {
    return request({
      url: '/system/menu/getMenuList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 修改菜单状态
   * @param [request]
   * @param data
   * @returns {*}
   */
  updateSystemMenuStatus(request, data) {
    return request({
      url: '/system/menu/updateStatus',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 删除菜单
   * @param request
   * @param data
   * @returns {*}
   */
  deleteSystemMenu(request, data) {
    return request({
      url: '/system/menu/delete',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 新增菜单
   * @param request
   * @param data
   * @returns {*}
   */
  addSystemMenu(request, data) {
    return request({
      url: '/system/menu/add',
      method: 'post',
      data
    })
  },
  /**
   * 更新菜单
   * @param request
   * @param data
   * @returns {*}
   */
  updateSystemMenu(request, data) {
    return request({
      url: '/system/menu/update',
      method: 'post',
      data
    })
  },
  /**
   * 获取菜单树
   * @param request
   * @returns {*}
   */
  getSystemMenuTree(request) {
    return request({
      url: '/system/menu/getMenuTree',
      method: 'post'
    })
  }
}

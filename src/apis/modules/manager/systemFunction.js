import qs from 'qs'

export default {
  /**
   * 获取系统功能列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getSystemFunction(request, data) {
    return request({
      url: '/system/function/getFunctionList',
      method: 'post',
      data: qs.stringify(data)
    })
  },

  /**
   * 删除系统功能
   * @param request
   * @param data
   * @returns {*}
   */
  deleteSystemFunction(request, data) {
    return request({
      url: '/system/function/delete',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 新增系统功能
   * @param request
   * @param data
   * @returns {*}
   */
  addSystemFunction(request, data) {
    return request({
      url: '/system/function/add',
      method: 'post',
      data
    })
  },
  /**
   * 更新系统功能
   * @param request
   * @param data
   * @returns {*}
   */
  updateSystemFunction(request, data) {
    return request({
      url: '/system/function/update',
      method: 'post',
      data
    })
  },
  /**
   * 获取系统功能详情
   * @param request
   * @param data
   * @returns {*}
   */
  getDetailsOfSystemFunction(request, data) {
    return request({
      url: '/system/function/getFunctionInfoList',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

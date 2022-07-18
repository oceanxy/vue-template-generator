import qs from 'qs'

export default {
  /**
   * 获取员工列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getSystemUser(request, data) {
    return request({
      url: '/system/employee/getEmployeeList',
      method: 'post',
      data: qs.stringify(data)
    })
  },

  /**
   * 删除员工
   * @param request
   * @param data
   * @returns {*}
   */
  deleteSystemUser(request, data) {
    return request({
      url: '/system/employee/delete',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 新增员工
   * @param request
   * @param data
   * @returns {*}
   */
  addSystemUser(request, data) {
    return request({
      url: '/system/employee/add',
      method: 'post',
      data
    })
  },
  /**
   * 更新员工
   * @param request
   * @param data
   * @returns {*}
   */
  updateSystemUser(request, data) {
    return request({
      url: '/system/employee/update',
      method: 'post',
      data
    })
  },
  /**
   * 获取员工详情
   * @param request
   * @param data
   * @returns {*}
   */
  getDetailsOfSystemUser(request, data) {
    return request({
      url: '/system/employee/getEmployee',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 密码重置
   * @param request
   * @param data
   * @returns {*}
   */
  employeeResetPwd(request, data) {
    return request({
      url: '/system/employee/resetPwd',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

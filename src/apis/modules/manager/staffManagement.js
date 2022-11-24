import qs from 'qs'

export default {
  /**
   * 获取职员数据
   * @param [request]
   * @param data
   * @returns {*}
   */
  getStaffManagement(request, data) {
    return request({
      url: '/system/employee/getEmployeeList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 删除职员
   * @param request
   * @param data
   * @returns {*}
   */
  deleteStaffManagement(request, data) {
    return request({
      url: '/system/employee/delete',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 新增职员
   * @param request
   * @param data
   * @returns {*}
   */
  addStaffManagement(request, data) {
    return request({
      url: '/system/employee/add',
      method: 'post',
      data
    })
  },
  /**
   * 更新职员
   * @param request
   * @param data
   * @returns {*}
   */
  updateStaffManagement(request, data) {
    return request({
      url: '/system/employee/update',
      method: 'post',
      data
    })
  },
  /**
   * 修改密码
   * @param request
   * @param data
   * @returns {*}
   */
  updatePasswordOfStaff(request, data) {
    return request({
      url: '/system/employee/resetpwd',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

import qs from 'qs'

export default {
  /**
   * 获取物业人员管理列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getWorkOrderUser(request, data) {
    return request({
      url: '/property/propertyPerson/getPropertyPersonPage',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 获取物业员工搜索分页集合
   * @param [request]
   * @param data
   * @returns {*}
   */
  getPropertyPersonSearchPage(request, data) {
    return request({
      url: '/property/propertyPerson/getPropertyPersonSearchPage',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 更新物业人员管理
   * @param request
   * @param data
   * @returns {*}
   */
  updateWorkOrderUser(request, data) {
    return request({
      url: '/property/propertyPerson/update',
      method: 'post',
      data
    })
  },
  /**
   * 新增物业人员管理
   * @param [request]
   * @param data
   * @returns {*}
   */
  addWorkOrderUser(request, data) {
    return request({
      url: '/property/propertyPerson/add',
      method: 'post',
      data
    })
  },
  /**
   * 删除物业人员管理
   * @param request
   * @param data
   * @returns {*}
   */
  deleteWorkOrderUser(request, data) {
    return request({
      url: '/property/propertyPerson/delete',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 修改物业员工状态
   * @param request
   * @param data
   * @returns {*}
   */
  updateWorkOrderUserStatus(request, data) {
    return request({
      url: '/property/propertyPerson/updateStatus',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 获取物业员工详情
   * @param request
   * @param data
   * @returns {*}
   */
  getDetailsOfWorkOrderUser(request, data) {
    return request({
      url: '/property/propertyPerson/getPropertyPerson',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 导出人员
   * @param [request]
   * @param params
   * @returns {*}
   */
  getExcelOfWorkOrderUser(request, params) {
    return request({
      url: '/property/propertyPerson/exportExcel',
      method: 'get',
      params,
      responseType: 'blob'
    })
  }
}

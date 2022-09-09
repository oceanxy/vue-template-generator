import qs from 'qs'

export default {
  /**
   * 获取工单管理列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getWorkOrderManage(request, data) {
    return request({
      url: '/operate/workOrder/getWorkOrderPageList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 更新工单管理
   * @param request
   * @param data
   * @returns {*}
   */
  updateWorkOrderManage(request, data) {
    return request({
      url: '/operate/workOrder/update',
      method: 'post',
      data
    })
  },
  /**
   * 新增工单管理
   * @param [request]
   * @param data
   * @returns {*}
   */
  addWorkOrderManage(request, data) {
    return request({
      url: '/operate/workOrder/add',
      method: 'post',
      data
    })
  },
  /**
   * 删除工单管理
   * @param request
   * @param data
   * @returns {*}
   */
  deleteWorkOrderManage(request, data) {
    return request({
      url: '/operate/workOrder/delete',
      method: 'post',
      data: qs.stringify(data)
    })
  },

  /**
   * 分配工单
   * @param request
   * @param data
   * @returns {*}
   */
  assignWorkOrder(request, data) {
    return request({
      url: '/operate/workOrder/assign',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 撤销工单
   * @param request
   * @param data
   * @returns {*}
   */
  revokeWorkOrder(request, data) {
    return request({
      url: '/operate/workOrder/revoke',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 导出工单
   * @param [request]
   * @param params
   * @returns {*}
   */
  getExcelOfWorkOrderManage(request, params) {
    return request({
      url: '/operate/workOrder/exportExcel',
      method: 'get',
      params,
      responseType: 'blob'
    })
  }
}

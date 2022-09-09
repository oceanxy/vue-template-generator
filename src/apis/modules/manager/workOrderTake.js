import qs from 'qs'

export default {
  /**
   * 获取接单管理分页集合
   * @param [request]
   * @param data
   * @returns {*}
   */
  getWorkOrderTake(request, data) {
    return request({
      url: '/operate/workOrder/getTakeOrderPage',
      method: 'post',
      data: qs.stringify(data)
    })
  },

  /**
   * 处理工单
   * @param request
   * @param data
   * @returns {*}
   */
  handleWorkOrder(request, data) {
    return request({
      url: '/operate/workOrder/handle',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

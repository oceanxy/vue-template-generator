import qs from 'qs'

export default {
  /**
   * 获取我的报修记录分页集合
   * @param [request]
   * @param data
   * @returns {*}
   */
  getRepair(request, data) {
    return request({
      url: '/operate/workOrder/getMyWorkOrderPage',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 报修
   * @param [request]
   * @param data
   * @returns {*}
   */
  addRepair(request, data) {
    return request({
      url: '/operate/workOrder/add',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

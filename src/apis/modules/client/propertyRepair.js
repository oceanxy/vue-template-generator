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
      url: '/operate/propertyRepair/getWorkOrderList',
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
      url: '/operate/propertyRepair/addWorkOrder',
      method: 'post',
      data: data
    })
  }
}

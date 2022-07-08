import qs from 'qs'

export default {
  /**
   * 获取我的投诉分页集合
   * @param [request]
   * @param data
   * @returns {*}
   */
  getComplaintsPageList(request, data) {
    return request({
      url: '/operate/propertyComplaints/getComplaintsPageList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 新增投诉
   * @param [request]
   * @param data
   * @returns {*}
   */
  addPropertyComplaints(request, data) {
    return request({
      url: '/operate/propertyComplaints/add',
      method: 'post',
      data: data
    })
  }
}

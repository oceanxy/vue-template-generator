import qs from 'qs'

export default {
  /**
   * 获取处理投诉建议列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getHandlingComplaints(request, data) {
    return request({
      url: '/operate/complaint/getComplaintHandlePage',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

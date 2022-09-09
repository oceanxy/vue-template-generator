import qs from 'qs'

export default {
  /**
   * 获取投诉建议列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getAssignComplaints(request, data) {
    return request({
      url: '/operate/complaint/getComplaintPageList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 获取当前用户投诉记录
   * @param request
   * @returns {*}
   */
  getRecordsOfComplaint(request) {
    return request({
      url: '/operate/complaint/getComplaintRecordList',
      method: 'post'
    })
  },
  /**
   * 新增投诉建议
   * @param request
   * @param data
   * @returns {*}
   */
  addAssignComplaints(request, data) {
    return request({
      url: '/operate/complaint/add',
      method: 'post',
      data
    })
  },
  /**
   * 分配/转移投诉建议
   * @param request
   * @param data
   * @returns {*}
   */
  assignComplaints(request, data) {
    return request({
      url: '/operate/complaint/assign',
      method: 'post',
      data: qs.stringify(data, { arrayFormat: 'comma' })
    })
  },
  /**
   * 处理投诉建议
   * @param request
   * @param data
   * @returns {*}
   */
  handlingComplaints(request, data) {
    return request({
      url: '/operate/complaint/handle',
      method: 'post',
      data: qs.stringify(data, { arrayFormat: 'comma' })
    })
  },
  /**
   * 撤销投诉
   * @param request
   * @param data
   * @returns {*}
   */
  complaintWithdrawn(request, data) {
    return request({
      url: '/operate/complaint/revoke',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

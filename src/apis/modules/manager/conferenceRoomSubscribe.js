import qs from 'qs'

export default {
  /**
   * 获取会议室预约列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getConferenceRoomSubscribe(request, data) {
    return request({
      url: '/business/meetingRoomAppointment/getMeetingRoomAppointmentPageList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 添加会议室预约
   * @param request
   * @param data
   * @returns {*}
   */
  addConferenceRoomSubscribe(request, data) {
    return request({
      url: '/business/meetingRoomAppointment/add',
      method: 'post',
      data
    })
  },
  /**
   * 更新会议室预约
   * @param request
   * @param data
   * @returns {*}
   */
  updateConferenceRoomSubscribe(request, data) {
    return request({
      url: '/business/meetingRoomAppointment/update',
      method: 'post',
      data
    })
  },
  /**
   * 删除会议室预约
   * @param request
   * @param data
   * @returns {*}
   */
  deleteConferenceRoomSubscribe(request, data) {
    return request({
      url: '/business/meetingRoomAppointment/delete',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 取消会议室预约
   * @param request
   * @param data
   * @returns {*}
   */
  cancelMeetingRoomAppointment(request, data) {
    return request({
      url: '/business/meetingRoomAppointment/cancelMeetingRoomAppointment',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

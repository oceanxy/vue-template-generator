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
  },
  /**
   * 获取楼层树
   * @param request
   * @returns {*}
   */
  getMeetingRoomTree(request) {
    return request({
      url: '/business/meetingRoomAppointment/getRoomTreeList',
      method: 'post'
    })
  },
  /**
   * 获取新增/编辑内的企业树
   * @param request
   * @param data
   * @returns {*}
   */
  getMeetingUseCompanyList(request, data) {
    return request({
      url: '/business/meetingRoomAppointment/getMeetingUseCompanyList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 获取新增/编辑内的会议室树
   * @param request
   * @param data
   * @returns {*}
   */
  getBookMeetingRoom(request, data) {
    return request({
      url: '/business/meetingRoomAppointment/getMeetingRoomSearchPageList',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

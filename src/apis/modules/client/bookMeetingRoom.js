import qs from 'qs'

export default {
  /**
   * 获取会议室房源分页集合
   * @param [request]
   * @param data
   * @returns {*}
   */
  getBookMeetingRoom(request, data) {
    return request({
      url: '/business/meetingRoomAppointment/getMeetingRoomPageList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 预约管理-新增
   * @param [request]
   * @param data
   * @returns {*}
   */
  addBookMeetingRoom(request, data) {
    return request({
      url: '/business/meetingRoomAppointment/add',
      method: 'post',
      data: data
    })
  },
  /**
   * 获取会议室指定日期预约记录集合
   * @param [request]
   * @param data
   * @returns {*}
   */
  getMeetingRoomAppointmentList(request, data) {
    return request({
      url: '/business/meetingRoomAppointment/getMeetingRoomAppointmentList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 预约管理-分页集合
   * @param [request]
   * @param data
   * @returns {*}
   */
  getBookMeetingRoomRecords(request, data) {
    return request({
      url: '/business/meetingRoomAppointment/getMeetingRoomAppointmentPageList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 预约管理-取消预约
   * @param [request]
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

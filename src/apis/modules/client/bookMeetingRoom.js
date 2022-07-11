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
  }
}

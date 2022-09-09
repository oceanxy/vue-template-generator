import qs from 'qs'

export default {
  /**
   * 获取会议室使用列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getConferenceRoomStatistics(request, data) {
    return request({
      url: '/business/meetingRoomAppointment/getMeetingRoomAppointmentPageList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 预约管理-预约详情
   * @param [request]
   * @param data
   * @returns {*}
   */
  getMeetingRoomAppointmentDetailList(request, data) {
    return request({
      url: '/business/meetingRoomAppointment/getMeetingRoomAppointmentDetailList',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

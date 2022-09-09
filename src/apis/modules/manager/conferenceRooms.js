import qs from 'qs'

export default {
  /**
   * 获取会议室列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getConferenceRooms(request, data) {
    return request({
      url: '/business/meetingRoomAppointment/getMeetingRoomPageList',
      method: 'post',
      data: qs.stringify(data)
    })
  },

  /**
   * 获取配套设施集合
   * @param request
   * @returns {*}
   */
  getFacilitiesForSelect(request) {
    return request({
      url: '/system/dictionary/getFacilityList',
      method: 'post'
    })
  },

  /**
   * 更新会议室
   * @param request
   * @param data
   * @returns {*}
   */
  updateConferenceRooms(request, data) {
    return request({
      url: '/business/meetingRoomAppointment/updateMeetRoom',
      method: 'post',
      data
    })
  }
}

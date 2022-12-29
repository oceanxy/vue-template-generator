import qs from 'qs'

export default {
  /**
   * 获取房间列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getRooms(request, data) {
    return request({
      url: '/morningNoon/room/getRoomPageList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 新增房间
   * @param request
   * @param data
   * @returns {*}
   */
  addRooms(request, data) {
    return request({
      url: '/morningNoon/room/add',
      method: 'post',
      data
    })
  },
  /**
   * 修改房间
   * @param request
   * @param data
   * @returns {*}
   */
  updateRooms(request, data) {
    return request({
      url: '/morningNoon/room/update',
      method: 'post',
      data
    })
  },
  /**
   * 删除房间
   * @param request
   * @param data
   * @returns {*}
   */
  deleteRooms(request, data) {
    return request({
      url: '/morningNoon/room/delete',
      method: 'post',
      data: qs.stringify(data, { arrayFormat: 'comma' })
    })
  },
  /**
   * 导出房间数据
   * @param request
   * @param params
   * @returns {*}
   */
  exportRooms(request, params) {
    return request({
      url: '/morningNoon/room/exportExcel',
      method: 'get',
      params,
      responseType: 'blob'
    })
  },
  /**
   * 修改房间状态
   * @param request
   * @param data
   * @returns {*}
   */
  updateRoomsStatus(request, data) {
    return request({
      url: '/morningNoon/room/updateStatus',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 获取房间内的学生信息
   * @param [request]
   * @param data
   * @returns {*}
   */
  getStudentInfoOfRooms(request, data) {
    return request({
      url: '/morningNoon/room/getStudentsByRoomId',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 删除房间里的学生
   * @param request
   * @param data
   * @returns {*}
   */
  deleteStudentInfoOfRooms(request, data) {
    return request({
      url: '/morningNoon/room/removeStudentForRoom',
      method: 'post',
      data: qs.stringify(data, { arrayFormat: 'comma' })
    })
  }
}

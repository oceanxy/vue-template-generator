import qs from 'qs'

export default {
  /**
   * 设置/取消负责人
   * @param request
   * @param data
   * @returns {*}
   */
  updateMerchantsIsLeader(request, data) {
    return request({
      url: '/basic/teamMember/updateIsLeader',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

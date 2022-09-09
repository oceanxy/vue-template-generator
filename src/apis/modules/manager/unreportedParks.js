import qs from 'qs'

export default {
  /**
   * 获取未填报的中心的名单列表
   * @param request
   * @param data
   * @returns {*}
   */
  getUnreportedParks(request, data) {
    return request({
      url: '/operate/reportRecord/getParkUnFillRecordPageList',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

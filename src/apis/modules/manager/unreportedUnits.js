import qs from 'qs'

export default {
  /**
   * 获取未填报的监管单位的名单列表
   * @param request
   * @param data
   * @returns {*}
   */
  getUnreportedUnits(request, data) {
    return request({
      url: '/operate/reportRecord/getRegulationUnFillRecordPageList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 监管单位/中心催报
   * @param request
   * @param data
   * @returns {*}
   */
  reminderToFillIn(request, data) {
    return request({
      url: '/operate/reportRecord/urgeUnit',
      method: 'post',
      data
    })
  }
}

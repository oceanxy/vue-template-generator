import qs from 'qs'

export default {
  /**
   * 获取监管单位报表明细列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getUnitReportDetails(request, data) {
    return request({
      url: '/operate/reportRecord/getRegulationReportRecordPageList',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

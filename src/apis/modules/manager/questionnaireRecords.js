import qs from 'qs'

export default {
  /**
   * 获取问卷记录列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getQuestionnaireRecords(request, data) {
    return request({
      url: '/operate/questionnaireRecord/getQuestionnaireRecordPageList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 获取问卷/报表记录详情列表
   * @param request
   * @param data
   * @returns {*}
   */
  getResultsOfQuestionnaireRecords(request, data) {
    return request({
      url: '/operate/reportRecord/getReportRecord',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

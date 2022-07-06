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
  getResultsOfQuestionnaireRecords(request, data) {
    return request({
      url: '/operate/questionnaireRecord/getQuestionnaireRecord',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

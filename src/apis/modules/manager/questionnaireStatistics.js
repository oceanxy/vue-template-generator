import qs from 'qs'

export default {
  /**
   * 获取问卷统计列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getQuestionnaireStatistics(request, data) {
    return request({
      url: '/operate/questionnaireResult/getQuestionnaireResultCount',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 获取问卷统计结果列表
   * @param request
   * @param data
   * @returns {*}
   */
  getResultsOfQuestionnaireStatistics(request, data) {
    return request({
      url: '/operate/questionnaireResult/getQuestionnaireResultPageList',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

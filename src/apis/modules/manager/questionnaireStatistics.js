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
  },
  /**
   * 导出结果
   * @param request
   * @param params
   * @returns {*}
   */
  getExcelOfQuestionnaireStatistics(request, params) {
    return request({
      url: '/operate/questionnaireResult/exportResultExcel',
      method: 'get',
      params,
      responseType: 'blob'
    })
  }
}

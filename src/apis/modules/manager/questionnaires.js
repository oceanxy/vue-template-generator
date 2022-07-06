import qs from 'qs'

export default {
  /**
   * 获取问卷管理列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getQuestionnaires(request, data) {
    return request({
      url: '/operate/questionnaire/getQuestionnairePageList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 获取问卷下拉列表
   * @param request
   * @param data
   * @returns {*}
   */
  getQuestionnairesForSelect(request, data) {
    return request({
      url: '/operate/questionnaire/getQuestionnaireList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 删除问卷管理
   * @param request
   * @param data
   * @returns {*}
   */
  deleteQuestionnaires(request, data) {
    return request({
      url: '/operate/questionnaire/delete',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 新增问卷管理
   * @param request
   * @param data
   * @returns {*}
   */
  addQuestionnaires(request, data) {
    return request({
      url: '/operate/questionnaire/add',
      method: 'post',
      data
    })
  },
  /**
   * 更新问卷管理
   * @param request
   * @param data
   * @returns {*}
   */
  updateQuestionnaires(request, data) {
    return request({
      url: '/operate/questionnaire/update',
      method: 'post',
      data
    })
  }
}

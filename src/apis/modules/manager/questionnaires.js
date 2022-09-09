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
   * 获取问卷/报表下拉列表
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
      url: '/operate/report/delete',
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
  },
  /**
   * 发布问卷调查/报表
   * @param request
   * @param data
   * @returns {*}
   */
  publishQuestionnaires(request, data) {
    return request({
      url: '/operate/report/publish',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 结束问卷调查/报表
   * @param request
   * @param data
   * @returns {*}
   */
  finishQuestionnaires(request, data) {
    return request({
      url: '/operate/report/finish',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 获取问卷模版管理列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getListOfQuestionnaireTemplates(request, data) {
    return request({
      url: '/operate/template/getQuestionnaireSearchPageList',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

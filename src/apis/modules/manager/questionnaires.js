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
   * 修改问卷管理状态
   * @param [request]
   * @param data
   * @returns {*}
   */
  updateQuestionnairesStatus(request, data) {
    return request({
      url: '/operate/questionnaire/updateStatus',
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

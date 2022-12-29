import qs from 'qs'

export default {
  /**
   * 体检配置-告警规则管理-获取分类分页集合
   * @param [request]
   * @param data
   * @returns {*}
   */
  getAlarmRuleManagement(request, data) {
    return request({
      url: '/examine/examineAlert/getExamineAlertList',
      method: 'post',
      data: qs.stringify(data)
    })
  },

  /**
   * 修改告警规则
   * @param request
   * @param data
   * @returns {*}
   */
  updateAlarmRuleManagement(request, data) {
    return request({
      url: '/examine/examineAlert/update',
      method: 'post',
      data
    })
  },

  /**
   * 新增告警规则
   * @param request
   * @param data
   * @returns {*}
   */
  addAlarmRuleManagement(request, data) {
    return request({
      url: '/examine/examineAlert/add',
      method: 'post',
      data
    })
  },

  /**
   * 修改警规则状态
   * @param request
   * @param data
   * @returns {*}
   */
  updateAlarmRuleManagementStatus(request, data) {
    return request({
      url: '/examine/examineAlert/updateStatus',
      method: 'post',
      data: qs.stringify(data)
    })
  },

  /**
   * 删除告警规则
   * @param request
   * @param data
   * @returns {*}
   */
  deleteAlarmRuleManagement(request, data) {
    return request({
      url: '/examine/examineAlert/delete',
      method: 'post',
      data: qs.stringify(data, { arrayFormat: 'comma' })
    })
  },

  /**
   * 获取指标和参数集合
   * @param [request]
   * @param data
   * @returns {*}
   */
  getKpiAndParam(request, data) {
    return request({
      url: '/examine/examineItemKpi/getKpiAndParam',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

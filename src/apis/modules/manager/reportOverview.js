import qs from 'qs'

export default {
  /**
   * 获取晨午检上报列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getReportOverview(request, data) {
    return request({
      url: '/morningNoon/checkReport/getCheckReportPageList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 获取待处理学生信息
   * @param [request]
   * @param data
   * @returns {*}
   */
  getPendingStudents(request, data) {
    return request({
      url: '/morningNoon/checkReport/getPendingStudents',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 一键上报
   * @param request
   * @param data
   * @returns {*}
   */
  onClickReport(request, data) {
    return request({
      url: '/morningNoon/checkReport/oneKeyReport',
      method: 'post',
      data
    })
  },
  /**
   * 根据学生姓名查询学生信息
   * @param request
   * @param data
   * @returns {*}
   */
  getStudentsByName(request, data) {
    return request({
      url: '/morningNoon/checkReport/getStudentsByName',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 根据名称获取症状信息
   * @param request
   * @param data
   * @returns {*}
   */
  getSymptomsByName(request, data) {
    return request({
      url: '/morningNoon/checkReport/getSymptom',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 根据名称获取诊断信息
   * @param request
   * @param data
   * @returns {*}
   */
  getDiagnosesByName(request, data) {
    return request({
      url: '/morningNoon/checkReport/getDiagnose',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 新增异常上报
   * @param request
   * @param data
   * @returns {*}
   */
  updateReportOverview(request, data) {
    return request({
      url: '/morningNoon/checkReport/add',
      method: 'post',
      data
    })
  }
}

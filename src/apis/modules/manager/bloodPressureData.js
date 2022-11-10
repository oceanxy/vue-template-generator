import qs from 'qs'

export default {
  /**
   * 获取血压数据列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getBloodPressureData(request, data) {
    return request({
      url: '/examine/examineBloodPressure/getExamineBloodPressureList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 通过学生ID获取血压数据列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getBloodPressureDataByStudentId(request, data) {
    return request({
      url: '/examine/examineProgress/getBloodList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 修改血压数据生效状态
   * @param [request]
   * @param data
   * @returns {*}
   */
  updateBloodPressureDataStatus(request, data) {
    return request({
      url: '/examine/examineProgress/updateBloodEffective',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 获取结论等级（血压数据）
   * @param request
   * @param data
   * @returns {*}
   */
  getConclusionGradeOfBloodPressureData(request, data) {
    return request({
      url: '/examine/examineBloodPressure/getLevelList',
      method: 'post',
      data
    })
  },
  /**
   * 导出血压数据
   * @param request
   * @param params
   * @returns {*}
   */
  exportBloodPressureData(request, params) {
    return request({
      url: '/examine/examineBloodPressure/exportDataExcel',
      method: 'get',
      params,
      responseType: 'blob'
    })
  },
  /**
   * 获取血压详情
   * @param request
   * @param data
   * @returns {*}
   */
  getDetailsOfBloodPressureData(request, data) {
    return request({
      url: '/examine/examineBloodPressure/getExamineBloodPressure',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

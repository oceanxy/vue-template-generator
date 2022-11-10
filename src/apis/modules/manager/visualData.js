import qs from 'qs'

export default {
  /**
   * 获取视力数据列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getVisualData(request, data) {
    return request({
      url: '/examine/examineVision/getExamineVisionList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 通过学生ID获取视力数据列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getVisualDataByStudentId(request, data) {
    return request({
      url: '/examine/examineProgress/getVisionList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 修改视力数据生效状态
   * @param [request]
   * @param data
   * @returns {*}
   */
  updateVisualDataStatus(request, data) {
    return request({
      url: '/examine/examineProgress/updateVisionEffective',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 获取结论等级（视力数据）
   * @param request
   * @param data
   * @returns {*}
   */
  getConclusionGradeOfVisualData(request, data) {
    return request({
      url: '/examine/examineVision/getLevelList',
      method: 'post',
      data
    })
  },
  /**
   * 导出视力数据
   * @param request
   * @param params
   * @returns {*}
   */
  exportVisualData(request, params) {
    return request({
      url: '/examine/examineVision/exportDataExcel',
      method: 'get',
      params,
      responseType: 'blob'
    })
  }
}

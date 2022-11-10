import qs from 'qs'

export default {
  /**
   * 获取肺功能数据列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getLungFunctionData(request, data) {
    return request({
      url: '/examine/examineLung/getExamineLungList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 通过学生ID获取肺功能数据列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getLungFunctionDataByStudentId(request, data) {
    return request({
      url: '/examine/examineProgress/getLungList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 修改肺功能数据生效状态
   * @param [request]
   * @param data
   * @returns {*}
   */
  updateLungFunctionDataStatus(request, data) {
    return request({
      url: '/examine/examineProgress/updateLungEffective',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 获取结论等级（肺功能数据）
   * @param request
   * @param data
   * @returns {*}
   */
  getConclusionGradeOfLungFunctionData(request, data) {
    return request({
      url: '/examine/examineLung/getLevelList',
      method: 'post',
      data
    })
  },
  /**
   * 导出肺功能费数据
   * @param request
   * @param params
   * @returns {*}
   */
  exportLungFunctionData(request, params) {
    return request({
      url: '/examine/examineLung/exportDataExcel',
      method: 'get',
      params,
      responseType: 'blob'
    })
  }
}

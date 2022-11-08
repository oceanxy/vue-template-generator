import qs from 'qs'

export default {
  /**
   * 获取身高体重数据列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getHeightAndWeightData(request, data) {
    return request({
      url: '/examine/examineHeight/getExamineHeightList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 获取结论等级（身高体重数据）
   * @param request
   * @param data
   * @returns {*}
   */
  getConclusionGradeOfHeightAndWeightData(request, data) {
    return request({
      url: '/examine/examineHeight/getLevelList',
      method: 'post',
      data
    })
  },
  /**
   * 导出身高体重数据
   * @param request
   * @param params
   * @returns {*}
   */
  exportHeightAndWeightData(request, params) {
    return request({
      url: '/examine/examineHeight/exportDataExcel',
      method: 'get',
      params,
      responseType: 'blob'
    })
  }
}

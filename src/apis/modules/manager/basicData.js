import qs from 'qs'

export default {
  /**
   * 获取体检基础数据列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getBasicData(request, data) {
    return request({
      url: '/examine/examineInfo/getExamineInfoList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 导出体检基础数据
   * @param request
   * @param params
   * @returns {*}
   */
  exportBasicData(request, params) {
    return request({
      url: '/examine/examineInfo/exportDataExcel',
      method: 'get',
      params,
      responseType: 'blob'
    })
  }
}

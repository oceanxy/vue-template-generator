import qs from 'qs'

export default {
  /**
   * 获取内科数据列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getInternalMedicineData(request, data) {
    return request({
      url: '/examine/examineInternal/getExamineInternalList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 导出内科数据
   * @param request
   * @param params
   * @returns {*}
   */
  exportInternalMedicineData(request, params) {
    return request({
      url: '/examine/examineInternal/exportDataExcel',
      method: 'get',
      params,
      responseType: 'blob'
    })
  }
}

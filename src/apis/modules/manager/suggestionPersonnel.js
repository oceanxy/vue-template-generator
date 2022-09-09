import qs from 'qs'

export default {
  /**
   * 获取运营人员列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getSuggestionPersonnel(request, data) {
    return request({
      url: '/operate/operatePerson/getOperatePersonPage',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 获取运营人员下拉列表数据（分页）
   * @param request
   * @param data
   * @returns {*}
   */
  getSuggestionPersonnelForSelect(request, data) {
    return request({
      url: '/operate/operatePerson/getOperatePersonSearchPage',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 修改运营人员状态
   * @param [request]
   * @param data
   * @returns {*}
   */
  updateSuggestionPersonnelStatus(request, data) {
    return request({
      url: '/operate/operatePerson/updateStatus',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 删除运营人员
   * @param request
   * @param data
   * @returns {*}
   */
  deleteSuggestionPersonnel(request, data) {
    return request({
      url: '/operate/operatePerson/delete',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 新增运营人员
   * @param request
   * @param data
   * @returns {*}
   */
  addSuggestionPersonnel(request, data) {
    return request({
      url: '/operate/operatePerson/add',
      method: 'post',
      data
    })
  },
  /**
   * 更新运营人员
   * @param request
   * @param data
   * @returns {*}
   */
  updateSuggestionPersonnel(request, data) {
    return request({
      url: '/operate/operatePerson/update',
      method: 'post',
      data
    })
  },
  /**
   * 导出运营人员
   * @param [request]
   * @param params
   * @returns {*}
   */
  getExcelOfSuggestionPersonnel(request, params) {
    return request({
      url: '/operate/operatePerson/exportExcel',
      method: 'get',
      params,
      responseType: 'blob'
    })
  }
}

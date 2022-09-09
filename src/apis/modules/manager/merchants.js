import qs from 'qs'

export default {
  /**
   * 获取招商人员列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getMerchants(request, data) {
    return request({
      url: '/basic/teamMember/getTeamMemberPageList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 修改招商人员状态
   * @param [request]
   * @param data
   * @returns {*}
   */
  updateMerchantsStatus(request, data) {
    return request({
      url: '/basic/teamMember/updateStatus',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 删除招商人员
   * @param request
   * @param data
   * @returns {*}
   */
  deleteMerchants(request, data) {
    return request({
      url: '/basic/teamMember/delete',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 新增招商人员
   * @param request
   * @param data
   * @returns {*}
   */
  addMerchants(request, data) {
    return request({
      url: '/basic/teamMember/add',
      method: 'post',
      data
    })
  },
  /**
   * 更新招商人员
   * @param request
   * @param data
   * @returns {*}
   */
  updateMerchants(request, data) {
    return request({
      url: '/basic/teamMember/update',
      method: 'post',
      data
    })
  },
  /**
   * 导出招商人员
   * @param [request]
   * @param params
   * @returns {*}
   */
  getExcelOfMerchants(request, params) {
    return request({
      url: '/basic/teamMember/exportExcel',
      method: 'get',
      params,
      responseType: 'blob'
    })
  }
}

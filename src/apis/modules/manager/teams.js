import qs from 'qs'

export default {
  /**
   * 获取团队列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getTeams(request, data) {
    return request({
      url: '/basic/team/getTeamPageList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 修改团队状态
   * @param [request]
   * @param data
   * @returns {*}
   */
  updateTeamsStatus(request, data) {
    return request({
      url: '/basic/team/updateStatus',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 删除团队
   * @param request
   * @param data
   * @returns {*}
   */
  deleteTeams(request, data) {
    return request({
      url: '/basic/team/delete',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 新增团队
   * @param request
   * @param data
   * @returns {*}
   */
  addTeams(request, data) {
    return request({
      url: '/basic/team/add',
      method: 'post',
      data
    })
  },
  /**
   * 更新团队
   * @param request
   * @param data
   * @returns {*}
   */
  updateTeams(request, data) {
    return request({
      url: '/basic/team/update',
      method: 'post',
      data
    })
  },
  /**
   * 导出招商团队
   * @param [request]
   * @param params
   * @returns {*}
   */
  getExcelOfTeams(request, params) {
    return request({
      url: '/basic/team/exportExcel',
      method: 'get',
      params,
      responseType: 'blob'
    })
  }
}

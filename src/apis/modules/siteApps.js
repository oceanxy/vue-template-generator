import qs from 'qs'

export default {
  /**
   * 获取站点应用分页列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getSiteApps(request, data) {
    return request({
      url: '/deploy/application/getApplicationPageList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 更新站点状态
   * @param [request]
   * @param data
   * @returns {*}
   */
  updateSiteAppsStatus(request, data) {
    return request({
      url: '/deploy/application/updateStatus',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 删除站点应用
   * @param [request]
   * @param data
   * @returns {*}
   */
  deleteSiteApp(request, data) {
    return request({
      url: '/deploy/application/delete',
      method: 'post',
      data: qs.stringify(data, { arrayFormat: 'comma' })
    })
  },
  /**
   * 新增站点应用
   * @param [request]
   * @param data
   * @returns {*}
   */
  addSiteApp(request, data) {
    return request({
      url: '/deploy/application/add',
      method: 'post',
      data
    })
  },
  /**
   * 修改站点应用
   * @param [request]
   * @param data
   * @returns {*}
   */
  updateSiteApp(request, data) {
    return request({
      url: '/deploy/application/update',
      method: 'post',
      data
    })
  },
  /**
   * 获取所有站点应用（用于select）
   * @param [request]
   * @returns {*}
   */
  getAllSiteApps(request) {
    return request({
      url: '/deploy/application/getDicList',
      method: 'post'
    })
  }
}

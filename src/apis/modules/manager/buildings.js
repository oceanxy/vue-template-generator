import qs from 'qs'

export default {
  /**
   * 获取体检基础数据列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getBuildings(request, data) {
    return request({
      url: '/morningNoon/build/getBuildPageList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 新增楼栋
   * @param request
   * @param data
   * @returns {*}
   */
  addBuildings(request, data) {
    return request({
      url: '/morningNoon/build/add',
      method: 'post',
      data
    })
  },
  /**
   * 修改楼栋
   * @param request
   * @param data
   * @returns {*}
   */
  updateBuildings(request, data) {
    return request({
      url: '/morningNoon/build/update',
      method: 'post',
      data
    })
  },
  /**
   * 删除楼栋
   * @param request
   * @param data
   * @returns {*}
   */
  deleteBuildings(request, data) {
    return request({
      url: '/morningNoon/build/delete',
      method: 'post',
      data: qs.stringify(data, { arrayFormat: 'comma' })
    })
  },
  /**
   * 导出楼栋数据
   * @param request
   * @param params
   * @returns {*}
   */
  exportBuildings(request, params) {
    return request({
      url: '/morningNoon/build/exportExcel',
      method: 'get',
      params,
      responseType: 'blob'
    })
  },
  /**
   * 修改楼栋状态
   * @param request
   * @param data
   * @returns {*}
   */
  updateBuildingsStatus(request, data) {
    return request({
      url: '/morningNoon/build/updateStatus',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 根据学校树获取楼层树
   * @param request
   * @param params
   * @returns {*}
   */
  getFloorTreeBySchoolTree(request, params) {
    return request({
      url: '/morningNoon/build/getAllBuildFloorList',
      method: 'get',
      params
    })
  }
}

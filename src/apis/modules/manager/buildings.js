import qs from 'qs'

export default {
  /**
   * 获取楼栋列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getBuildings(request, data) {
    return request({
      url: '/basic/build/getBuildPageList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 修改楼栋状态
   * @param [request]
   * @param data
   * @returns {*}
   */
  updateBuildingsStatus(request, data) {
    return request({
      url: '/basic/build/updateStatus',
      method: 'post',
      data: qs.stringify(data)
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
      url: '/basic/build/delete',
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
      url: '/basic/build/add',
      method: 'post',
      data
    })
  },
  /**
   * 更新楼栋
   * @param request
   * @param data
   * @returns {*}
   */
  updateBuildings(request, data) {
    return request({
      url: '/basic/build/update',
      method: 'post',
      data
    })
  },
  /**
   * 获取楼栋下拉树
   * @param request
   * @returns {*}
   */
  getBuildingsForSelect(request) {
    return request({
      url: '/basic/park/getBuildTreeList',
      method: 'post'
    })
  },
  /**
   * 获取楼层树
   * @param request
   * @returns {*}
   */
  getFloorTree(request) {
    return request({
      url: '/basic/park/getFloorTreeList',
      method: 'post'
    })
  },
  /**
   * 获取侧边栏数据
   * @param request
   * @returns {*}
   */
  getSideFloorTree(request) {
    return request({
      url: '/basic/park/getFloorTree',
      method: 'post'
    })
  },
  /**
   * 获取房间树
   * @param request
   * @returns {*}
   */
  getRoomTreeList(request) {
    return request({
      url: '/basic/park/getRoomTreeList',
      method: 'post'
    })
  },
  /**
   * 导出楼栋
   * @param request
   * @param params
   * @returns {*}
   */
  getExcelOfBuildings(request, params) {
    return request({
      url: '/basic/build/exportExcel',
      method: 'get',
      params,
      responseType: 'blob'
    })
  }
}

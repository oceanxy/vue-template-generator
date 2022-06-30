import qs from 'qs'

export default {
  /**
   * 获取企业续约申请列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getRenewalApplication(request, data) {
    return request({
      url: '/business/clues/getRenewalApplicationList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 修改企业续约申请状态
   * @param [request]
   * @param data
   * @returns {*}
   */
  updateRenewalApplicationStatus(request, data) {
    return request({
      url: '/basic/park/updateStatus',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 删除企业续约申请
   * @param request
   * @param data
   * @returns {*}
   */
  deleteRenewalApplication(request, data) {
    return request({
      url: '/basic/park/delete',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 新增企业续约申请
   * @param request
   * @param data
   * @returns {*}
   */
  addRenewalApplication(request, data) {
    return request({
      url: '/basic/park/add',
      method: 'post',
      data
    })
  },
  /**
   * 更新企业续约申请
   * @param request
   * @param data
   * @returns {*}
   */
  updateRenewalApplication(request, data) {
    return request({
      url: '/basic/park/update',
      method: 'post',
      data
    })
  },
  /**
   * 获取企业续约申请树
   * @param request
   * @returns {*}
   */
  getParkTree(request) {
    return request({
      url: '/basic/park/getParkTree',
      method: 'post'
    })
  },
  /**
   * 获取企业续约申请下拉列表数据
   * @param request
   * @returns {*}
   */
  getRenewalApplicationForSelect(request) {
    return request({
      url: '/basic/park/getParkList',
      method: 'post'
    })
  },
  /**
   * 获取楼栋下拉列表数据
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
      url: '/basic/park/getFloodTree',
      method: 'post'
    })
  }
}

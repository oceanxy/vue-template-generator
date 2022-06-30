import qs from 'qs'

export default {
  /**
   * 获取我的签约列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getMyContracts(request, data) {
    return request({
      url: '/business/companyContract/getMyContractList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 修改我的签约状态
   * @param [request]
   * @param data
   * @returns {*}
   */
  updateMyContractsStatus(request, data) {
    return request({
      url: '/basic/park/updateStatus',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 删除我的签约
   * @param request
   * @param data
   * @returns {*}
   */
  deleteMyContracts(request, data) {
    return request({
      url: '/basic/park/delete',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 新增我的签约
   * @param request
   * @param data
   * @returns {*}
   */
  addMyContracts(request, data) {
    return request({
      url: '/basic/park/add',
      method: 'post',
      data
    })
  },
  /**
   * 更新我的签约
   * @param request
   * @param data
   * @returns {*}
   */
  updateMyContracts(request, data) {
    return request({
      url: '/basic/park/update',
      method: 'post',
      data
    })
  },
  /**
   * 获取我的签约树
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
   * 获取我的签约下拉列表数据
   * @param request
   * @returns {*}
   */
  getMyContractsForSelect(request) {
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

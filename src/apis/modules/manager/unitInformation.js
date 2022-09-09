import qs from 'qs'

export default {
  /**
   * 获取单位配置详情
   * @param request
   * @returns {*}
   */
  getUnitDetails(request) {
    return request({
      url: '/archive/companyInfo/getUnit',
      method: 'post'
    })
  },
  /**
   * 获取园区配置详情
   * @param [request]
   * @param data
   * @returns {*}
   */
  getParkDetails(request, data) {
    return request({
      url: '/archive/companyInfo/getPark',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 修改园区管理
   * @param request
   * @param data
   * @returns {*}
   */
  updatePark(request, data) {
    return request({
      url: '/archive/companyInfo/update',
      method: 'post',
      data
    })
  }
}

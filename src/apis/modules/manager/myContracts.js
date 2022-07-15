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
  }
}

import qs from 'qs'
import apis from '@/apis'

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
   * 删除合同
   * @param request
   * @param data
   */
  deleteMyContracts(request, data) {
    return apis.deleteValidContracts(data)
  }
}

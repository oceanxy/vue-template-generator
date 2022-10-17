import qs from 'qs'
import { omit } from 'lodash'

export default {
  /**
   * 获取企业综合信息（包括企业信息、签约信息、合同信息）
   * @param request
   * @param data
   * @returns {*}
   */
  getGeneralInformation(request, data) {
    let url

    if (data.cid) {
      // cid 合同ID
      // url = '/business/contractAudit/getContractDetail'
      url = '/business/contractAudit/getContractDetailV2'
      data.id = data.cid
      data = omit(data, 'cid')
    } else {
      // bid 企业ID
      url = '/business/company/getCompanyDetail'
      data.id = data.bid
      data = omit(data, 'bid')
    }

    return request({
      url,
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 企业详情-账号信息
   * @param [request]
   * @param data
   * @returns {*}
   */
  getBusinessDetails(request, data) {
    return request({
      url: '/business/company/getUserList',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

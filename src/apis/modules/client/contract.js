import qs from 'qs'

export default {
  /**
   * 我的合同
   * @param [request]
   * @param data
   * @returns {*}
   */
  getContracts(request, data = {}) {
    return request({
      url: '/operate/notifyMessage/getUserContractList',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

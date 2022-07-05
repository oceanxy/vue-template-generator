import qs from 'qs'

export default {
  /**
   * 获取公司账单
   * @param [request]
   * @returns {*}
   */
  getUserCompanyBillList(request, data) {
    return request({
      url: '/operate/notifyMessage/getUserCompanyBillList',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

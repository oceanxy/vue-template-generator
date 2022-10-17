import qs from 'qs'

export default {
  /**
   * 获取租金列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getRents(request, data) {
    return request({
      url: '/business/billAmount/getRoomAmountList',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

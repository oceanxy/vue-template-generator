import qs from 'qs'

export default {
  /**
   * 获取中心信息列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getParkInfo(request, data) {
    return request({
      url: '/basic/park/getParkInfoPageList',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

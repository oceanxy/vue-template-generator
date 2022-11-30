import qs from 'qs'

export default {
  /**
   * 获取存档数据分页集合
   * @param request
   * @param data
   * @returns {*}
   */
  getCodeByIdNumbers(request, data) {
    return request({
      url: '/personnel/qrCode/getCodeByIdNumbers',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

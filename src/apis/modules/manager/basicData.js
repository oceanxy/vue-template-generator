import qs from 'qs'

export default {
  /**
   * 获取体检基础数据列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getBasicData(request, data) {
    return request({
      url: '/examine/examineInfo/getExamineInfoList',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

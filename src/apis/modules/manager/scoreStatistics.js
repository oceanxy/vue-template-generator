import qs from 'qs'

export default {
  /**
   * 获取考核分数统计列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getScoreStatistics(request, data) {
    return request({
      url: '/operate/reportRecord/getScoreCountPageList',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

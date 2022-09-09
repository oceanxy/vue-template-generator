import qs from 'qs'

export default {
  /**
   * 获取消息通知分页集合
   * @param [request]
   * @param data
   * @returns {*}
   */
  getNews(request, data) {
    return request({
      url: '/operate/notifyMessage/getNotifyMessagePageList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 全部通知设置已读
   * @param [request]
   * @param data
   * @returns {*}
   */
  updateIsReadAll(request, data) {
    return request({
      url: '/operate/notifyMessage/updateIsReadAll',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 删除消息通知
   * @param [request]
   * @param data
   * @returns {*}
   */
  delNews(request, data) {
    return request({
      url: '/operate/notifyMessage/delete',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 我的待办-待完善
   * @param [request]
   * @param data
   * @returns {*}
   */
  getBackLogList(request, data) {
    return request({
      url: '/operate/notifyMessage/getBackLogList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 获取首页新闻集合
   * @param [request]
   * @param data
   * @returns {*}
   */
  getNewsHomeList(request) {
    return request({
      url: '/console/index/getIndexArticleList',
      method: 'post'
    })
  }
}

import qs from 'qs'

export default {
  /**
   * 获取资讯分页集合
   * @param [request]
   * @param data
   * @returns {*}
   */
  getParkNews(request, data) {
    return request({
      url: '/archive/article/getArticleList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 获取资讯详情
   * @param [request]
   * @param data
   * @returns {*}
   */
  getDetailsOfParkNewsDetail(request, data) {
    return request({
      url: '/archive/article/getArticle',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

import qs from 'qs'

export default {
  /**
   * 体检配置-体检活动管理-获取分类分页集合
   * @param [request]
   * @param data
   * @returns {*}
   */
  getConclusionLevel(request, data) {
    return request({
      url: '/examine/itemConclusionLevel/getItemConclusionLevelList',
      method: 'post',
      data: qs.stringify(data)
    })
  },

  /**
   * 修改体检项
   * @param request
   * @param data
   * @returns {*}
   */
  updateConclusionLevel(request, data) {
    return request({
      url: '/examine/itemConclusionLevel/update',
      method: 'post',
      data: qs.stringify(data)
    })
  },

  /**
   * 新增体检项
   * @param request
   * @param data
   * @returns {*}
   */
  addConclusionLevel(request, data) {
    return request({
      url: '/examine/itemConclusionLevel/add',
      method: 'post',
      data: qs.stringify(data)
    })
  },

  /**
   * 删除体检项
   * @param request
   * @param data
   * @returns {*}
   */
  deleteConclusionLevel(request, data) {
    return request({
      url: '/examine/itemConclusionLevel/delete',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

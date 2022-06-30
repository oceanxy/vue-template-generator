import qs from 'qs'

export default {
  /**
   * 获取线索列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getClues(request, data) {
    return request({
      url: '/business/clues/getCluesList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 修改线索状态
   * @param [request]
   * @param data
   * @returns {*}
   */
  updateCluesStatus(request, data) {
    return request({
      url: '/business/clues/updateStatus',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 删除线索
   * @param request
   * @param data
   * @returns {*}
   */
  deleteClues(request, data) {
    return request({
      url: '/business/clues/delete',
      method: 'post',
      data: qs.stringify(data)
    })
  },

  /**
   * 收回线索
   * @param request
   * @param data
   * @returns {*}
   */
  takeBackClues(request, data) {
    return request({
      url: '/business/clues/takeBackClues',
      method: 'post',
      data: qs.stringify(data)
    })
  },

  /**
   * 新增线索
   * @param request
   * @param data
   * @returns {*}
   */
  addClues(request, data) {
    return request({
      url: '/business/clues/add',
      method: 'post',
      data
    })
  },
  /**
   * 更新线索
   * @param request
   * @param data
   * @returns {*}
   */
  updateClues(request, data) {
    return request({
      url: '/business/clues/update',
      method: 'post',
      data
    })
  },
  /**
   * 线索进展详情列表
   * @param request
   * @returns {*}
   */
  getModalOfDetailsOfClues(request, data) {
    return request({
      url: '/business/clues/progressDetail',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 线索进展详情列表
   * @param request
   * @returns {*}
   */
  getCluesCountList(request) {
    return request({
      url: '/business/clues/getCluesCountList',
      method: 'post'
    })
  }
}

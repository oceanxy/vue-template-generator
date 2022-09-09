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
   * 分配线索
   * @param request
   * @param data
   * @returns {*}
   */
  allotClues(request, data) {
    return request({
      url: '/business/clues/allotClues',
      method: 'post',
      data: qs.stringify(data, { arrayFormat: 'comma' })
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
      data: qs.stringify(data, { arrayFormat: 'comma' })
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
   * 线索进展详情列表
   * @param request
   * @returns {*}
   */
  getClueDetailsOfClues(request, data) {
    return request({
      url: '/business/clues/progressDetail',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 线索分类摘要开卡片数据
   * @param request
   * @returns {*}
   */
  getCluesCountList(request) {
    return request({
      url: '/business/clues/getCluesCountList',
      method: 'post'
    })
  },
  /**
   * 获取园区团队
   * @param request
   * @param data
   * @returns {*}
   */
  getParkTeams(request, data) {
    return request({
      url: '/business/clues/getParkTeamList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 获取园区团队成员
   * @param request
   * @param data
   * @returns {*}
   */
  getMembersOfParkTeam(request, data) {
    return request({
      url: '/business/clues/getParkTeamMemberList',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

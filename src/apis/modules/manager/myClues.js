import qs from 'qs'
import apis from '@/apis'

export default {
  /**
   * 获取我的线索列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getMyClues(request, data) {
    return request({
      url: '/business/clues/getMyCluesList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 线索进展详情列表
   * @param request
   * @param data
   * @returns {*}
   */
  getClueDetailsOfMyClues(request, data) {
    return apis.getClueDetailsOfClues(data)
  },
  /**
   * 线索跟进历史详情列表
   * @param request
   * @param data
   * @returns {*}
   */
  getFollowUpDetailsList(request, data) {
    return request({
      url: '/business/clues/progressDetail',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 跟进线索
   * @param request
   * @param data
   * @returns {*}
   */
  followUpLead(request, data) {
    return request({
      url: '/business/clues/addMyCluesFollow',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 新增我的线索
   * @param request
   * @param data
   * @returns {*}
   */
  addMyClues(request, data) {
    return request({
      url: '/business/clues/addMyClues',
      method: 'post',
      data
    })
  }
}

import qs from 'qs'
import apis from '@/apis'

export default {
  /**
   * 获取病例追踪列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getTrackingCases(request, data) {
    return request({
      url: '/morningNoon/studentTrace/getStudentTracePageList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 获取追踪详细信息
   * @param [request]
   * @param data
   * @returns {*}
   */
  getDetailsOfTrackingCases(request, data) {
    return request({
      url: '/morningNoon/studentTrace/getStudentTrace',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 更新追踪病例记录（新增）
   * @param request
   * @param data
   * @returns {*}
   */
  addTrackingCases(request, data) {
    return request({
      url: '/morningNoon/studentTrace/add',
      method: 'post',
      data
    })
  },
  /**
   * 停止追踪
   * @param request
   * @param data
   * @returns {*}
   */
  stopFollowingUp(request, data) {
    return request({
      url: '/morningNoon/studentTrace/stopTrace',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 获取同寝室学生
   * @param request
   * @param data
   * @returns {*}
   */
  getPotentiallyInfectedStudentsOfTrackingCases(request, data) {
    return apis.getPotentiallyInfectedStudentsOfReportReview(data)
  }
}

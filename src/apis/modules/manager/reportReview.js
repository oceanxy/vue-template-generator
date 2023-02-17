import apis from '@/apis'
import qs from 'qs'

export default {
  /**
   * 获取晨午检上报异常信息列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getReportReview(request, data) {
    return apis.getReportDetails(data)
  },
  /**
   * 获取一键审核的学生列表
   * @param request
   * @param data
   * @returns {*}
   */
  getStudentsNeedToQuickReview(request, data) {
    return request({
      url: '/morningNoon/checkAbnormal/getOneKeyStudentList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 校医一键审核
   * @param request
   * @param data
   * @returns {*}
   */
  rapidReviewBySchoolDoctor(request, data) {
    return request({
      url: '/morningNoon/checkAbnormal/oneKeyAudit',
      method: 'post',
      data
    })
  },
  /**
   * 校医审核
   * @param request
   * @param data
   * @returns {*}
   */
  reviewBySchoolDoctor(request, data) {
    return request({
      url: '/morningNoon/checkAbnormal/auditAbnormal',
      method: 'post',
      data
    })
  },
  /**
   * 获取同宿舍学生集合
   * @param request
   * @param data
   * @returns {*}
   */
  getPotentiallyInfectedStudentsOfReportReview(request, data) {
    return request({
      url: '/morningNoon/checkAbnormal/getStudentListBySource',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

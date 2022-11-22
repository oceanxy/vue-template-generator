import qs from 'qs'

export default {
  /**
   * 按学校获取活动视力集合
   * @param [request]
   * @param data
   * @returns {*}
   */
  getActivityVisionBySchool(request, data) {
    return request({
      url: '/examine/examineStatistics/getActivityVisionByLevel',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 按年级获取活动视力集合
   * @param request
   * @param data
   * @returns {*}
   */
  getActivityVisionByGrade(request, data) {
    return request({
      url: '/examine/examineStatistics/getActivityVisionWithGrade',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 按班级获取活动视力集合
   * @param request
   * @param data
   * @returns {*}
   */
  getActivityVisionByClass(request, data) {
    return request({
      url: '/examine/examineStatistics/getActivityVisionWithClass',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 导出活动视力（按学校）
   * @param request
   * @param params
   * @returns {*}
   */
  exportActivityVisionBySchool(request, params) {
    return request({
      url: '/examine/examineStatistics/exportVisionLevelBySchool',
      method: 'get',
      params,
      responseType: 'blob'
    })
  },
  /**
   * 导出活动视力（按年级）
   * @param request
   * @param params
   * @returns {*}
   */
  exportActivityVisionByGrade(request, params) {
    return request({
      url: '/examine/examineStatistics/exportVisionLevelByGrade',
      method: 'get',
      params,
      responseType: 'blob'
    })
  },
  /**
   * 导出活动视力（按班级）
   * @param request
   * @param params
   * @returns {*}
   */
  exportActivityVisionByClass(request, params) {
    return request({
      url: '/examine/examineStatistics/exportVisionLevelByClass',
      method: 'get',
      params,
      responseType: 'blob'
    })
  }
}

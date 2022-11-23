import qs from 'qs'

export default {
  /**
   * 按学校获取活动身高集合
   * @param [request]
   * @param data
   * @returns {*}
   */
  getActivityHeightBySchool(request, data) {
    return request({
      url: '/examine/examineStatistics/getActivityHeightByLevel',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 按年级获取活动身高集合
   * @param request
   * @param data
   * @returns {*}
   */
  getActivityHeightByGrade(request, data) {
    return request({
      url: '/examine/examineStatistics/getActivityHeightWithGrade',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 按班级获取活动身高集合
   * @param request
   * @param data
   * @returns {*}
   */
  getActivityHeightByClass(request, data) {
    return request({
      url: '/examine/examineStatistics/getActivityHeightWithClass',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 导出活动身高（按学校）
   * @param request
   * @param params
   * @returns {*}
   */
  exportActivityHeightBySchool(request, params) {
    return request({
      url: '/examine/examineStatistics/exportHeightLevelBySchool',
      method: 'get',
      params,
      responseType: 'blob'
    })
  },
  /**
   * 导出活动身高（按年级）
   * @param request
   * @param params
   * @returns {*}
   */
  exportActivityHeightByGrade(request, params) {
    return request({
      url: '/examine/examineStatistics/exportHeightLevelByGrade',
      method: 'get',
      params,
      responseType: 'blob'
    })
  },
  /**
   * 导出活动身高（按班级）
   * @param request
   * @param params
   * @returns {*}
   */
  exportActivityHeightByClass(request, params) {
    return request({
      url: '/examine/examineStatistics/exportHeightLevelByClass',
      method: 'get',
      params,
      responseType: 'blob'
    })
  }
}

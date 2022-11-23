import qs from 'qs'

export default {
  /**
   * 按学校获取活动肺活量集合
   * @param [request]
   * @param data
   * @returns {*}
   */
  getActivityVitalCapacityBySchool(request, data) {
    return request({
      url: '/examine/examineStatistics/getActivityLungByLevel',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 按年级获取活动肺活量集合
   * @param request
   * @param data
   * @returns {*}
   */
  getActivityVitalCapacityByGrade(request, data) {
    return request({
      url: '/examine/examineStatistics/getActivityLungWithGrade',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 按班级获取活动肺活量集合
   * @param request
   * @param data
   * @returns {*}
   */
  getActivityVitalCapacityByClass(request, data) {
    return request({
      url: '/examine/examineStatistics/getActivityLungWithClass',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 导出活动肺活量（按学校）
   * @param request
   * @param params
   * @returns {*}
   */
  exportActivityVitalCapacityBySchool(request, params) {
    return request({
      url: '/examine/examineStatistics/exportLungLevelBySchool',
      method: 'get',
      params,
      responseType: 'blob'
    })
  },
  /**
   * 导出活动肺活量（按年级）
   * @param request
   * @param params
   * @returns {*}
   */
  exportActivityVitalCapacityByGrade(request, params) {
    return request({
      url: '/examine/examineStatistics/exportLungLevelByGrade',
      method: 'get',
      params,
      responseType: 'blob'
    })
  },
  /**
   * 导出活动肺活量（按班级）
   * @param request
   * @param params
   * @returns {*}
   */
  exportActivityVitalCapacityByClass(request, params) {
    return request({
      url: '/examine/examineStatistics/exportLungLevelByClass',
      method: 'get',
      params,
      responseType: 'blob'
    })
  }
}

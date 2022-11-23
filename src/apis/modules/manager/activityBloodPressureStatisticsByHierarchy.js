import qs from 'qs'

export default {
  /**
   * 按学校获取活动血压集合
   * @param [request]
   * @param data
   * @returns {*}
   */
  getActivityBloodPressureBySchool(request, data) {
    return request({
      url: '/examine/examineStatistics/getActivityBloodByLevel',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 按年级获取活动血压集合
   * @param request
   * @param data
   * @returns {*}
   */
  getActivityBloodPressureByGrade(request, data) {
    return request({
      url: '/examine/examineStatistics/getActivityBloodWithGrade',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 按班级获取活动血压集合
   * @param request
   * @param data
   * @returns {*}
   */
  getActivityBloodPressureByClass(request, data) {
    return request({
      url: '/examine/examineStatistics/getActivityBloodWithClass',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 导出活动血压（按学校）
   * @param request
   * @param params
   * @returns {*}
   */
  exportActivityBloodPressureBySchool(request, params) {
    return request({
      url: '/examine/examineStatistics/exportBloodLevelBySchool',
      method: 'get',
      params,
      responseType: 'blob'
    })
  },
  /**
   * 导出活动血压（按年级）
   * @param request
   * @param params
   * @returns {*}
   */
  exportActivityBloodPressureByGrade(request, params) {
    return request({
      url: '/examine/examineStatistics/exportBloodLevelByGrade',
      method: 'get',
      params,
      responseType: 'blob'
    })
  },
  /**
   * 导出活动血压（按班级）
   * @param request
   * @param params
   * @returns {*}
   */
  exportActivityBloodPressureByClass(request, params) {
    return request({
      url: '/examine/examineStatistics/exportBloodLevelByClass',
      method: 'get',
      params,
      responseType: 'blob'
    })
  }
}

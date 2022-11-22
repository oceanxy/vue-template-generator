import qs from 'qs'

export default {
  /**
   * 按学校获取活动BMI集合
   * @param [request]
   * @param data
   * @returns {*}
   */
  getActivityBmiBySchool(request, data) {
    return request({
      url: '/examine/examineStatistics/getActivityBmiByLevel',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 按年级获取活动BMI集合
   * @param request
   * @param data
   * @returns {*}
   */
  getActivityBmiByGrade(request, data) {
    return request({
      url: '/examine/examineStatistics/getActivityBmiWithGrade',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 按班级获取活动BMI集合
   * @param request
   * @param data
   * @returns {*}
   */
  getActivityBmiByClass(request, data) {
    return request({
      url: '/examine/examineStatistics/getActivityBmiWithClass',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 导出活动BMI（按学校）
   * @param request
   * @param params
   * @returns {*}
   */
  exportActivityBmiBySchool(request, params) {
    return request({
      url: '/examine/examineStatistics/exportBmiLevelBySchool',
      method: 'get',
      params,
      responseType: 'blob'
    })
  },
  /**
   * 导出活动BMI（按年级）
   * @param request
   * @param params
   * @returns {*}
   */
  exportActivityBmiByGrade(request, params) {
    return request({
      url: '/examine/examineStatistics/exportBmiLevelByGrade',
      method: 'get',
      params,
      responseType: 'blob'
    })
  },
  /**
   * 导出活动BMI（按班级）
   * @param request
   * @param params
   * @returns {*}
   */
  exportActivityBmiByClass(request, params) {
    return request({
      url: '/examine/examineStatistics/exportBmiLevelByClass',
      method: 'get',
      params,
      responseType: 'blob'
    })
  }
}

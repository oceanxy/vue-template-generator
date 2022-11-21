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
  }
}

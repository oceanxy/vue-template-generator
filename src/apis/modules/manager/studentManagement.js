import qs from 'qs'

export default {
  /**
   * 获取学生分页集合
   * @param [request]
   * @param data
   * @returns {*}
   */
  getStudentManagement(request, data) {
    return request({
      url: '/personnel/student/getStudentList',
      method: 'post',
      data: qs.stringify(data)
    })
  },

  /**
   * 修改学生
   * @param request
   * @param data
   * @returns {*}
   */
  updateStudentManagement(request, data) {
    return request({
      url: '/personnel/student/update',
      method: 'post',
      data
    })
  },

  /**
   * 新增学生
   * @param request
   * @param data
   * @returns {*}
   */
  addStudentManagement(request, data) {
    return request({
      url: '/personnel/student/add',
      method: 'post',
      data
    })
  },

  /**
   * 删除学生
   * @param request
   * @param data
   * @returns {*}
   */
  deleteStudentManagement(request, data) {
    return request({
      url: '/personnel/student/delete',
      method: 'post',
      data: qs.stringify(data)
    })
  },

  /**
   * 根据学校ID获取年级
   * @param [request]
   * @param data
   * @returns {*}
   */
  getGradeListBySchoolId(request, data) {
    return request({
      url: '/personnel/grade/getGradeListBySchoolId',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 转出学生
   * @param [request]
   * @param data
   * @returns {*}
   */
  studentRollOut(request, data) {
    return request({
      url: '/personnel/student/rollOut',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

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
      data: qs.stringify(data, { arrayFormat: 'comma' })
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
  },
  /**
   * 学生转出宿舍
   * @param [request]
   * @param data
   * @returns {*}
   */
  outRooms(request, data) {
    return request({
      url: '/personnel/student/outRooms',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 根据学生ID生成二维码
   * @param [request]
   * @param params
   * @returns {*}
   */
  getCodeSelf(request, params) {
    return request({
      url: '/personnel/qrCode/getCodeSelf',
      method: 'get',
      params,
      responseType: 'blob'
    })
  },
  /**
   * 上传导入文件
   * @param [request]
   * @param formData
   * @returns {*}
   */

  studentImportFile(request, formData) {
    return request({
      url: '/personnel/student/importFile',
      method: 'post',
      data: formData
    })
  },
  /**
   * 全局导入成功数据
   * @param [request]
   * @param data
   * @returns {*}
   */
  importSuccessData(request, data) {
    return request({
      url: '/personnel/student/importSuccessData',
      method: 'post',
      data
    })
  },
  /**
   * 局部导入成功数据
   * @param [request]
   * @param data
   * @returns {*}
   */
  importSuccessSingeData(request, data) {
    return request({
      url: '/personnel/student/importSuccessSingeData',
      method: 'post',
      data
    })
  },
  /**
   * 批量生成二维码
   * @param request
   * @param data
   * @returns {*}
   */
  getCodeBatch(request, data) {
    return request({
      url: '/personnel/qrCode/getCode',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 获取导入学生模板
   * @param request
   * @param data
   * @returns {*}
   */
  getTemplateUrl(request, data) {
    return request({
      url: '/personnel/student/getTemplateUrl',
      method: 'post',
      data
    })
  },
  /**
   * 下载失败数据
   * @param request
   * @param params
   * @returns {*}
   */
  exportDownErrorFailExcel(request, params) {
    return request({
      url: '/personnel/student/downFailExcel',
      method: 'get',
      params,
      responseType: 'blob'
    })
  },
  /**
   * 设置学生宿舍
   * @param request
   * @param data
   * @returns {*}
   */
  studentSetRooms(request, data) {
    return request({
      url: '/personnel/student/setRooms',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 导出学生
   * @param request
   * @param params
   * @returns {*}
   */
  exportStudentManagement(request, params) {
    return request({
      url: '/personnel/student/exportStudent',
      method: 'get',
      params,
      responseType: 'blob'
    })
  },
  /**
   * 根据当前用户获取所有学校集合
   * @param [request]
   * @param data
   * @returns {*}
   */
  getSchoolListByThisUser(request, data) {
    return request({
      url: '/personnel/school/getSchoolListByThisUser',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

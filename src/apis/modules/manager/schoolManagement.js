import qs from 'qs'

export default {
  /**
   * 获取学校分页集合
   * @param [request]
   * @param data
   * @returns {*}
   */
  getSchoolManagement(request, data) {
    return request({
      url: '/personnel/school/getSchoolList',
      method: 'post',
      data: qs.stringify(data)
    })
  },

  /**
   * 修改学校
   * @param request
   * @param data
   * @returns {*}
   */
  updateSchoolManagement(request, data) {
    return request({
      url: '/personnel/school/update',
      method: 'post',
      data
    })
  },

  /**
   * 新增学校
   * @param request
   * @param data
   * @returns {*}
   */
  addSchoolManagement(request, data) {
    return request({
      url: '/personnel/school/add',
      method: 'post',
      data
    })
  },

  /**
   * 删除学校
   * @param request
   * @param data
   * @returns {*}
   */
  deleteSchoolManagement(request, data) {
    return request({
      url: '/personnel/school/delete',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 修改学校状态
   * @param request
   * @param data
   * @returns {*}
   */
  updateSchoolManagementStatus(request, data) {
    return request({
      url: '/personnel/school/updateStatus',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 获取学校详情
   * @param [request]
   * @param data
   * @returns {*}
   */
  getDetailsOfSchoolManagement(request, data) {
    return request({
      url: '/personnel/school/getSchool',
      method: 'post',
      data: qs.stringify(data)
    })
  },

  /**
   * 获取所有学校集合
   * @param [request]
   * @param data
   * @returns {*}
   */
  getAllSchoolList(request, data) {
    return request({
      url: '/personnel/school/getAllSchoolList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 上传导入文件
   * @param [request]
   * @param formData
   * @returns {*}
   */

  schoolImportFile(request, formData) {
    return request({
      url: '/personnel/school/importFile',
      method: 'post',
      data: formData
    })
  },
  /**
   * 导入成功数据
   * @param [request]
   * @param data
   * @returns {*}
   */
  schoolImportSuccessData(request, data) {
    return request({
      url: '/personnel/school/importSuccessData',
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
  schoolDownFailExcel(request, params) {
    return request({
      url: '/personnel/school/downFailExcel',
      method: 'get',
      params,
      responseType: 'blob'
    })
  },
  /**
   * 获取导入学校模板
   * @param request
   * @param data
   * @returns {*}
   */
  schoolGetTemplateUrl(request, data) {
    return request({
      url: '/personnel/school/getTemplateUrl',
      method: 'post',
      data
    })
  }
}

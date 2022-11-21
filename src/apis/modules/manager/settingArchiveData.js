import qs from 'qs'

export default {
  /**
   * 获取存档数据分页集合
   * @param request
   * @param data
   * @returns {*}
   */
  getSettingArchiveData(request, data) {
    return request({
      url: '/examine/examineSaveLog/getExamineSaveLogList',
      method: 'post',
      data: qs.stringify(data)
    })
  },

  /**
   * 新增存档数据
   * @param request
   * @param data
   * @returns {*}
   */
  addSettingArchiveData(request, data) {
    return request({
      url: '/examine/examineSaveLog/add',
      method: 'post',
      data
    })
  }, /**
   * 修改存档数据
   * @param request
   * @param data
   * @returns {*}
   */
  updateSettingArchiveData(request, data) {
    return request({
      url: '/examine/examineSaveLog/add',
      method: 'post',
      data
    })
  },

  /**
   * 删除存档数据
   * @param request
   * @param data
   * @returns {*}
   */
  deleteSettingArchiveData(request, data) {
    return request({
      url: '/examine/examineSaveLog/delete',
      method: 'post',
      data: qs.stringify(data)
    })
  },

  /**
   * 生成报告
   * @param request
   * @param data
   * @returns {*}
   */
  createReport(request, data) {
    return request({
      url: '/examine/examineSaveLog/createReport',
      method: 'post',
      data: qs.stringify(data)
    })
  },

  /**
   * 生成打印报告
   * @param request
   * @param data
   * @returns {*}
   */
  createPrintReport(request, data) {
    return request({
      url: '/examine/examineSaveLog/createPrintReport',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 根据活动ID获取学校集合
   * @param request
   * @returns {*}
   */
  getSchoolTreeByActivityId(request, data) {
    return request({
      url: '/personnel/school/getSchoolTreeByActivityId',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

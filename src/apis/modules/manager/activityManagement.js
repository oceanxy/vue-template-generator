import qs from 'qs'

export default {
  /**
   * 体检配置-体检活动管理-获取分类分页集合
   * @param [request]
   * @param data
   * @returns {*}
   */
  getActivityManagement(request, data) {
    return request({
      url: '/examine/examineActivity/getExamineActivityList',
      method: 'post',
      data: qs.stringify(data)
    })
  },

  /**
   * 修改活动
   * @param request
   * @param data
   * @returns {*}
   */
  updateActivityManagement(request, data) {
    return request({
      url: '/examine/examineActivity/update',
      method: 'post',
      data
    })
  },

  /**
   * 新增活动
   * @param request
   * @param data
   * @returns {*}
   */
  addActivityManagement(request, data) {
    return request({
      url: '/examine/examineActivity/add',
      method: 'post',
      data
    })
  },

  /**
   * 删除活动
   * @param request
   * @param data
   * @returns {*}
   */
  deleteActivityManagement(request, data) {
    return request({
      url: '/examine/examineActivity/delete',
      method: 'post',
      data: qs.stringify(data, { arrayFormat: 'comma' })
    })
  },

  /**
   * 修改活动状态
   * @param request
   * @param data
   * @returns {*}
   */
  updateActivityManagementStatus(request, data) {
    return request({
      url: '/examine/examineActivity/updateStatus',
      method: 'post',
      data: qs.stringify(data)
    })
  },

  /**
   * 获取活动详情
   * @param request
   * @param data
   * @returns {*}
   */
  getDetailsOfActivityManagement(request, data) {
    return request({
      url: '/examine/examineActivity/getExamineActivity',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 获取学年集合
   * @param [request]
   * @param data
   * @returns {*}
   */
  getActivityYearList(request, data) {
    return request({
      url: '/examine/examineActivity/getYearList',
      method: 'post',
      data
    })
  },
  /**
   * 获取体检组织集合
   * @param [request]
   * @param data
   * @returns {*}
   */
  getActivityItemList(request, data) {
    return request({
      url: '/examine/examineActivity/getItemList',
      method: 'post',
      data
    })
  },

  /**
   * 获取组织机构树
   * @param [request]
   * @returns {*}
   */
  getOrganOnlyTree(request, data) {
    return request({
      url: '/system/organ/getOrganOnlyTree',
      method: 'post',
      data
    })
  },

  /**
   * 活动根据条件搜索学校集合
   * @param request
   * @returns {*}
   */
  getListBySearch(request, data) {
    return request({
      url: '/personnel/school/getListBySearch',
      method: 'post',
      data: qs.stringify(data)
    })
  },

  /**
   * 获取学校街道集合
   * @param request
   * @returns {*}
   */
  getSchoolStreetList(request, data) {
    return request({
      url: '/examine/examineActivity/getSchoolStreetList',
      method: 'post',
      data
    })
  }
}

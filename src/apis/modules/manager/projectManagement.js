import qs from 'qs'

export default {
  /**
   * 体检配置-体检项目分类-获取分类分页集合
   * @param [request]
   * @param data
   * @returns {*}
   */
  getProjectManagement(request, data) {
    return request({
      url: '/examine/examineItem/getExamineItemList',
      method: 'post',
      data: qs.stringify(data)
    })
  },

  /**
   * 修改体检项
   * @param request
   * @param data
   * @returns {*}
   */
  updateProjectManagement(request, data) {
    return request({
      url: '/examine/examineItem/update',
      method: 'post',
      data: qs.stringify(data)
    })
  },

  /**
   * 新增体检项
   * @param request
   * @param data
   * @returns {*}
   */
  addProjectManagement(request, data) {
    return request({
      url: '/examine/examineItem/add',
      method: 'post',
      data: qs.stringify(data)
    })
  },

  /**
   * 删除体检项
   * @param request
   * @param data
   * @returns {*}
   */
  deleteProjectManagement(request, data) {
    return request({
      url: '/examine/examineItem/delete',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

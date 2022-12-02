import qs from 'qs'

export default {
  /**
   * 体检配置-结论等级管理-获取分类分页集合
   * @param [request]
   * @param data
   * @returns {*}
   */
  getConclusionLevel(request, data) {
    return request({
      url: '/examine/itemConclusionLevel/getItemConclusionLevelList',
      method: 'post',
      data: qs.stringify(data)
    })
  },

  /**
   * 修改结论等级
   * @param request
   * @param data
   * @returns {*}
   */
  updateConclusionLevel(request, data) {
    return request({
      url: '/examine/itemConclusionLevel/update',
      method: 'post',
      data
    })
  },

  /**
   * 新增结论等级
   * @param request
   * @param data
   * @returns {*}
   */
  addConclusionLevel(request, data) {
    return request({
      url: '/examine/itemConclusionLevel/add',
      method: 'post',
      data
    })
  },

  /**
   * 修改结论等级状态
   * @param request
   * @param data
   * @returns {*}
   */
  updateConclusionLevelStatus(request, data) {
    return request({
      url: '/examine/examineCatalog/updateStatus',
      method: 'post',
      data: qs.stringify(data)
    })
  },

  /**
   * 删除结论等级
   * @param request
   * @param data
   * @returns {*}
   */
  deleteConclusionLevel(request, data) {
    return request({
      url: '/examine/itemConclusionLevel/delete',
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
  getDetailsOfConclusionLevel(request, data) {
    return request({
      url: '/examine/itemConclusionLevel/getItemConclusionLevel',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 获取项目集合
   * @param [request]
   * @param data
   * @returns {*}
   */
  getLevelList(request, data) {
    return request({
      url: '/examine/examineItem/getLevelList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 根据体检项目获取指标集合
   * @param [request]
   * @param data
   * @returns {*}
   */
  getListByItemId(request, data) {
    return request({
      url: '/examine/examineItemKpi/getListByItemId',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   *  根据指标ID获取参数集合
   * @param [request]
   * @param data
   * @returns {*}
   */
  getListByKpiId(request, data) {
    return request({
      url: '/examine/examineItemKpi/getListByKpiId',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

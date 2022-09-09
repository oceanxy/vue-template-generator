import qs from 'qs'

export default {
  /**
   * 获取数据采集模版管理列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getDataCollectionTemplates(request, data) {
    return request({
      url: '/operate/template/getTemplatePageList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 获取数据采集模版搜索数据
   * @param [request]
   * @param data
   * @returns {*}
   */
  getItemsOfTemplate(request, data) {
    return request({
      url: '/operate/template/getTemplateSearchPageList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 修改数据采集模版管理状态
   * @param [request]
   * @param data
   * @returns {*}
   */
  updateDataCollectionTemplatesStatus(request, data) {
    return request({
      url: '/operate/template/updateStatus',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 删除数据采集模版管理
   * @param request
   * @param data
   * @returns {*}
   */
  deleteDataCollectionTemplates(request, data) {
    return request({
      url: '/operate/template/delete',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 新增数据采集模版管理
   * @param request
   * @param data
   * @returns {*}
   */
  addDataCollectionTemplates(request, data) {
    return request({
      url: '/operate/template/add',
      method: 'post',
      data
    })
  },
  /**
   * 更新数据采集模版管理
   * @param request
   * @param data
   * @returns {*}
   */
  updateDataCollectionTemplates(request, data) {
    return request({
      url: '/operate/template/update',
      method: 'post',
      data
    })
  },
  /**
   * 获取模版详情
   * @param request
   * @param data
   * @returns {*}
   */
  getDetailsOfDataCollectionTemplates(request, data) {
    return request({
      url: '/operate/template/getTemplate',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

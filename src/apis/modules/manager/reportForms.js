import qs from 'qs'

export default {
  /**
   * 获取报表列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getReportForms(request, data) {
    return request({
      url: '/operate/report/getReportPageList',
      method: 'post',
      data: qs.stringify(data, { arrayFormat: 'comma' })
    })
  },
  /**
   * 获取报表详情
   * @param request
   * @param data
   * @returns {*}
   */
  getDetailsOfReportForms(request, data) {
    return request({
      url: '/operate/report/getReport',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 修改报表状态
   * @param [request]
   * @param data
   * @returns {*}
   */
  updateReportFormsStatus(request, data) {
    return request({
      url: '/operate/report/updateStatus',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 删除报表
   * @param request
   * @param data
   * @returns {*}
   */
  deleteReportForms(request, data) {
    return request({
      url: '/operate/report/delete',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 新增报表
   * @param request
   * @param data
   * @returns {*}
   */
  addReportForms(request, data) {
    return request({
      url: '/operate/report/add',
      method: 'post',
      data
    })
  },
  /**
   * 更新报表
   * @param request
   * @param data
   * @returns {*}
   */
  updateReportForms(request, data) {
    return request({
      url: '/operate/report/update',
      method: 'post',
      data
    })
  },
  /**
   * 获取报表项目集合
   * @param request
   * @param data
   * @returns {*}
   */
  getReportItems(request, data) {
    return request({
      url: '/operate/report/getItemList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 获取问卷/报表模版项
   * @param [request]
   * @param data
   * @returns {*}
   */
  getItemsOfTemplateById(request, data) {
    return request({
      url: '/operate/report/getItemShortList',
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
  getItemsOfDataCollectionTemplate(request, data) {
    return request({
      url: '/operate/template/getCollectSearchPageList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 获取报表预览
   * @param request
   * @param data
   * @returns {*}
   */
  getReportPreview(request, data) {
    return request({
      url: '/operate/report/getReportPreview',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

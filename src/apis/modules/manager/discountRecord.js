import qs from 'qs'

export default {
  /**
   * 获取优惠记录列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getDiscountRecord(request, data) {
    return request({
      url: '/business/saleRecord/getSaleRecordPageList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 新增优惠记录
   * @param request
   * @param data
   * @returns {*}
   */
  addDiscountRecord(request, data) {
    return request({
      url: '/business/saleRecord/add',
      method: 'post',
      data
    })
  },
  /**
   * 企业优惠记录修改
   * @param request
   * @param data
   * @returns {*}
   */
  updateDiscountRecord(request, data) {
    return request({
      url: '/business/saleRecord/update',
      method: 'post',
      data
    })
  },
  /**
   * 删除优惠记录
   * @param request
   * @param data
   * @returns {*}
   */
  deleteDiscountRecord(request, data) {
    return request({
      url: '/business/saleRecord/delete',
      method: 'post',
      data: qs.stringify(data)
    })
  },

  /**
   * 获取优惠记录详情
   * @param request
   * @param data
   * @returns {*}
   */
  getDetailsOfDiscountRecord(request, data) {
    return request({
      url: '/business/saleRecord/getSaleRecordDetail',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 获取签约企业分页集合
   * @param request
   * @param data
   * @returns {*}
   */
  getSampleCompanyContractList(request, data) {
    return request({
      url: '/business/saleRecord/getSampleCompanyContractList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 获取企业分页集合
   * @param request
   * @param data
   * @returns {*}
   */
  getUseCompanyList(request, data) {
    return request({
      url: '/business/saleRecord/getUseCompanyList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 获取可用优惠政策分页集合
   * @param request
   * @param data
   * @returns {*}
   */
  saleRecord_getSaleRulePageList(request, data) {
    return request({
      url: '/business/saleRecord/getSaleRulePageList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 获取企业详情
   * @param request
   * @param data
   * @returns {*}
   */
  saleRecord_getCompanyProperties(request, data) {
    return request({
      url: '/business/saleRecord/getCompanyProperties',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 获取企业文件详情
   * @param request
   * @param data
   * @returns {*}
   */
  saleRecord_getAttachmentList(request, data) {
    return request({
      url: '/business/saleRecord/getAttachmentList',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

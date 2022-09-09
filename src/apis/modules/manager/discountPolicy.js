import qs from 'qs'

export default {
  /**
   * 获取优惠政策列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getDiscountPolicy(request, data) {
    return request({
      url: '/business/saleRule/getSaleRulePageList',
      method: 'post',
      data: qs.stringify(data)
    })
  },

  /**
   * 删除优惠政策
   * @param request
   * @param data
   * @returns {*}
   */
  deleteDiscountPolicy(request, data) {
    return request({
      url: '/business/saleRule/delete',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 新增优惠政策
   * @param request
   * @param data
   * @returns {*}
   */
  addDiscountPolicy(request, data) {
    return request({
      url: '/business/saleRule/add',
      method: 'post',
      data
    })
  },
  /**
   * 更新优惠政策
   * @param request
   * @param data
   * @returns {*}
   */
  updateDiscountPolicy(request, data) {
    return request({
      url: '/business/saleRule/update',
      method: 'post',
      data
    })
  },
  /**
   * 获取优惠政策详情
   * @param request
   * @param data
   * @returns {*}
   */
  getDetailsOfDiscountPolicy(request, data) {
    return request({
      url: '/business/saleRule/getSaleRule',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 查询所有可选费项列表
   * @param request
   * @param data
   * @returns {*}
   */
  getSaleItemList(request) {
    return request({
      url: '/business/saleRule/getSaleItemList',
      method: 'post'
    })
  },
  /**
   * 获取企业分类字典数据
   * @param request
   * @param data
   * @returns {*}
   */
  getCompanyDictionaryList(request) {
    return request({
      url: '/business/saleRule/getCompanyDictionaryList',
      method: 'post'
    })
  },
  /**
   * 修改租金优惠政策状态
   * @param request
   * @param data
   * @returns {*}
   */
  updateDiscountPolicyStatus(request, data) {
    return request({
      url: '/business/saleRule/updateStatus',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

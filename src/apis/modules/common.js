export default {
  /**
   * 获取行政区划级联数据
   * @param request
   * @returns {*}
   */
  getAdministrativeDivision(request) {
    return request({
      url: '/system/district/getThreeTree',
      method: 'post'
    })
  },
  /**
   * 获取企业分类（所属行业）
   * @param request
   * @returns {*}
   */
  getEnterpriseClassifications(request) {
    return request({
      url: '/business/companyContract/getCompanyDictionaryList',
      method: 'post'
    })
  }
}

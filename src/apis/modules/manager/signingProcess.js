import qs from 'qs'

export default {
  /**
   * 获取待签约企业集合
   * @param request
   * @param data
   * @returns {*}
   */
  getSelectCompanyOfSigningProcess(request, data) {
    return request({
      url: '/business/companyContract/getWaitCompanyContractList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 获取企业分类
   * @param request
   * @returns {*}
   */
  getEnterpriseClassifications(request) {
    return request({
      url: '/business/companyContract/getCompanyDictionaryList',
      method: 'post'
    })
  },
  /**
   * 提交合同第一步
   * @param request
   * @param data
   * @returns {*}
   */
  step1OfSubmitContract(request, data) {
    return request({
      url: '/business/companyContract/addCompanyContractStageOne',
      method: 'post',
      data
    })
  }
}

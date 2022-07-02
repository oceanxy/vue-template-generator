import qs from 'qs'

export default {
  /**
   * 通过合同ID获取合同详情
   * @param request
   * @param data
   * @returns {*}
   */
  getDetailsOfSigningProcess(request, data) {
    return request({
      url: '/business/companyContract/getCompanyContractDetail',
      method: 'post',
      data: qs.stringify(data)
    })
  },
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
  },
  /**
   * 获取多个房间的详情信息
   * @param request
   * @param data
   * @returns {*}
   */
  getFillInformationOfSigningProcess(request, data) {
    return request({
      url: '/business/companyContract/getRoomDetailList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 获取孵化场所集合
   * @param request
   * @param data
   * @returns {*}
   */
  getHatcheryTree(request, data) {
    return request({
      url: '/business/companyContract/getUsableParkRoomList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 获取企业应缴费项
   * @param request
   * @param data
   * @returns {*}
   */
  getFeesPayableByCompany(request, data) {
    return request({
      url: '/business/companyContract/getParkPayItemList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 获取企业缴费周期
   * @param request
   * @param data
   * @returns {*}
   */
  getEnterprisePaymentCycle(request, data) {
    return request({
      url: '/business/companyContract/getParkPayItemCycleList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 提交合同第二步
   * @param request
   * @param data
   * @returns {*}
   */
  step2OfSubmitContract(request, data) {
    return request({
      url: '/business/companyContract/addCompanyContractStageTwo',
      method: 'post',
      data
    })
  }
}

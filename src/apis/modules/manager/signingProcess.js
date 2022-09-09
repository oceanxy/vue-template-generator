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
  },
  /**
   * 获取费用核算清单
   * @param request
   * @param data
   * @returns {*}
   */
  getContractOfSigningProcess(request, data) {
    return request({
      url: '/business/companyContract/getContractItemList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 获取合同模版列表
   * @param request
   * @param data
   * @returns {*}
   */
  getContractTemplates(request, data) {
    return request({
      url: '/business/companyContract/getContractTemplateList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 获取合同模版预览
   * @param request
   * @param data
   * @returns {*}
   */
  getPreviewOfContractTemplate(request, data) {
    return request({
      url: '/business/companyContract/getTemplatePreview',
      method: 'post',
      data: qs.stringify(data),
      responseType: 'blob'
    })
  },
  /**
   * 获取合同预览
   * @param request
   * @param data
   * @returns {*}
   */
  getContractPreview(request, data) {
    return request({
      // url: '/business/companyContract/getContractTemplatePreview',
      url: '/business/companyContract/getContractTemplatePreviewAndAttachment',
      method: 'post',
      // data: qs.stringify(data),
      data,
      responseType: 'blob'
    })
  },
  /**
   * 提交合同第三步
   * @param request
   * @param data
   * @returns {*}
   */
  step3OfSubmitContract(request, data) {
    return request({
      // url: '/business/companyContract/addAuditCompanyContract',
      url: '/business/companyContract/addAuditCompanyContractAndAttachment',
      method: 'post',
      // data: qs.stringify(data)
      data
    })
  },
  /**
   * 获取合同审核结果
   * @param request
   * @param data
   * @returns {*}
   */
  getResultOfContractReview(request, data) {
    return request({
      url: '/business/companyContract/getContractAuditResult',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 获取最终签约合同的预览
   * @param request
   * @param data
   * @returns {*}
   */
  getPreviewOfFinalContract(request, data) {
    return request({
      url: '/business/companyContract/getContractPreview',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

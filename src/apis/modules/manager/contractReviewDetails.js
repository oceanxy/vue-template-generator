import qs from 'qs'

export default {
  /**
   * 获取签约完成的合同预览
   * @param [request]
   * @param data
   * @returns {*}
   */
  getContractPreviewContractReviewDetails(request, data) {
    return request({
      url: '/business/companyContract/getContractPreview',
      method: 'post',
      data: qs.stringify(data),
      responseType: 'blob'
    })
  }
}

import qs from 'qs'
import apis from '@/apis'

export default {
  /**
   * 获取监管单位报表明细列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getUnitReportDetails(request, data) {
    return request({
      url: '/operate/reportRecord/getRegulationReportRecordPageList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 导出监管单位报表明细
   * @param request
   * @param data
   * @returns {*}
   */
  getExcelOfUnitReportDetails(request, data) {
    return apis.getExcelOfEnterpriseReportDetails(data)
  }
}

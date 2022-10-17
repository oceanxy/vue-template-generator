import qs from 'qs'
import apis from '@/apis'

export default {
  /**
   * 获取中心报表明细列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getParkReportDetails(request, data) {
    return request({
      url: '/operate/reportRecord/getParkReportRecordPageList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 导出园区报表明细
   * @param request
   * @param data
   * @returns {*}
   */
  getExcelOfParkReportDetails(request, data) {
    return apis.getExcelOfEnterpriseReportDetails(data)
  }
}

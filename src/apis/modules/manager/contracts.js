import qs from 'qs'

export default {
  /**
   * 获取合同列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getContracts(request, data) {
    return request({
      url: '/business/contractRemove/getContractList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 获取头部合同数据集
   * @param request
   * @returns {*}
   */
  getContractCards(request) {
    return request({
      url: '/business/contractRemove/getRemoveCountList',
      method: 'post'
    })
  },
  /**
   * 获取到期提醒内的提醒方式数据集
   * @param request
   * @param data
   * @returns {*}
   */
  getReminderMethods(request, data) {
    return request({
      url: '/business/contractRemove/getRemindTypeList',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 发送提醒消息
   * @param request
   * @param data
   * @returns {*}
   */
  sendReminder(request, data) {
    return request({
      url: '/business/contractRemove/sendMind',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  /**
   * 解约
   * @param request
   * @param data
   * @returns {*}
   */
  terminateContract(request, data) {
    return request({
      url: '/business/contractRemove/removeContract',
      method: 'post',
      data
    })
  }
}

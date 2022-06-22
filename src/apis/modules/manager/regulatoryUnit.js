import qs from 'qs'

export default {
  /**
   * 获取监管单位列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getRegulatoryUnits(request, data) {
    return request({
      url: '/system/regulationOrgan/getRegulationOrganPage',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  // /**
  //  * 修改园区状态
  //  * @param [request]
  //  * @param data
  //  * @returns {*}
  //  */
  // updateParksStatus(request, data) {
  //   return request({
  //     url: '/basic/park/updateStatus',
  //     method: 'post',
  //     data: qs.stringify(data)
  //   })
  // },
  // /**
  //  * 删除园区
  //  * @param request
  //  * @param data
  //  * @returns {*}
  //  */
  // deleteParks(request, data) {
  //   return request({
  //     url: '/basic/park/delete',
  //     method: 'post',
  //     data: qs.stringify(data)
  //   })
  // }
}

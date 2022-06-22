import qs from 'qs'

export default {
  /**
   * 获取物业单位列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getTenements(request, data) {
    return request({
      url: '/system/propertyOrgan/getPropertyOrganPage',
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

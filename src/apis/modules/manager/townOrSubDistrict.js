/**
 * 镇/街道
 * @Author: Omsber
 * @Email: xyzsyx@163.com
 * @Date: 2022-11-14 周一 20:49:59
 */

import qs from 'qs'

export default {
  /**
   * 根据活动ID获取参加该次活动的学校所在镇街集合
   * @param [request]
   * @param data
   * @returns {*}
   */
  getTownOrSubDistrictsForSelectByActivityId(request, data) {
    return request({
      url: '/examine/examineStatistics/getStreetListByActivityId',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

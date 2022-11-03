import qs from 'qs'

export default {
  /**
   * 获取体检基础数据列表
   * @param [request]
   * @param data
   * @returns {*}
   */
  getSchoolList(request, data) {
    return request({
      url: '/personnel/school/getSchoolList',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

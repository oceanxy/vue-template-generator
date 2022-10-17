import apis from '@/apis'

export default {
  /**
   * 获取组织机构树
   * @param [request]
   * @returns {*}
   */
  getOrganTree(request) {
    return apis.getOrganizationTree()
  }
}

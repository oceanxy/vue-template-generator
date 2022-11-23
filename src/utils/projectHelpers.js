/**
 * 项目辅助函数集合（仅适用于当前项目的辅助函数）
 * @Author: Omsber
 * @Email: xyzsyx@163.com
 * @Date: 2022-11-08 周二 17:24:00
 */

/**
 * 获取用于保存/传递学校树ID的字段名
 * @param treeHierarchy {number} 树的层级
 * @returns {string} 根据树的层级返回不同的字段名
 */
export function getFieldNameForSchoolTreeId(treeHierarchy) {
  switch (treeHierarchy) {
    case 3:
      return 'peObjOrgId'
    case 2:
      return 'schoolStreetId'
    case 1:
    default:
      return 'schoolCountyId'
  }
}

/**
 * 文档管理用于传递学校树id字段名
 * @param treeHierarchy {number} 树的层级
 * @returns {string} 根据树的层级返回不同的字段名
 */
export function getFileAdminForSchoolTreeId(treeHierarchy) {
  switch (treeHierarchy) {
    case 3:
      return 'schoolId'
    case 2:
      return 'schoolStreetId'
    case 1:
    default:
      return 'schoolCountyId'
  }
}

/**
 * 获取用于保存/传递街道树ID的字段名
 * @param treeHierarchy {number} 树的层级
 * @returns {string} 根据树的层级返回不同的字段名
 */
export function getFieldNameForSchoolGroupType(treeHierarchy) {
  switch (treeHierarchy) {
    case 3:
      return 'schoolId'
    case 2:
      return 'streetId'
    case 1:
    default:
      return 'countyId'
  }
}

/**
 * 体检配置--项目分类 用于保存/传递街道树ID的字段名
 * @param treeHierarchy {number} 树的层级
 * @returns {string} 根据树的层级返回不同的字段名
 */
export function getFieldNameForMedicallyType(treeHierarchy) {
  switch (treeHierarchy) {
    case 1:
    default:
      return 'parentId'
  }
}

/**
 * 体检配置--项目管理 用于保存/传递街道树ID的字段名
 * @param treeHierarchy {number} 树的层级
 * @returns {string} 根据树的层级返回不同的字段名
 */
export function getFieldNameForMedicallyAdmin(treeHierarchy) {
  switch (treeHierarchy) {
    case 2:
      return 'ecId'
    case 1:
    default:
      return 'parentId'
  }
}

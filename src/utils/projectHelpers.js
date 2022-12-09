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

/**
 * 格式化年级显示
 * @param grade {number} 年级代号 4代表一年级，5代表二年级，以此类推
 */
export function getGradeStr(grade) {
  if (grade <= 9) {
    return ['一', '二', '三', '四', '五', '六'][grade - 4] + '年级'
  } else if (grade > 9 && grade <= 12) {
    return ['初一', '初二', '初三'][grade - 10]
  } else if (grade > 12 && grade <= 15) {
    return ['高一', '高二', '高三'][grade - 13]
  } else {
    return '-'
  }
}

/**
 * 获取学校树的定制图标
 * @param treeNode
 * @returns {(function(): Promise<*>)|(function(): Promise<*>)|(function(): Promise<*>)}
 */
export function getSchoolTreeIcon(treeNode) {
  if (+treeNode.obj.parentId === 0) {
    return () => import('@/components/TGContainerWithTreeSider/assets/images/tree-district.svg')
  } else {
    if (treeNode.isParent) {
      return () => import('@/components/TGContainerWithTreeSider/assets/images/tree-street.svg')
    } else {
      return () => import('@/components/TGContainerWithTreeSider/assets/images/tree-school.svg')
    }
  }
}

/**
 * 获取体检配置树的定制图标
 * @param treeNode
 * @returns {(function(): Promise<*>)|(function(): Promise<*>)|(function(): Promise<*>)}
 */
export function getExaminedDisposeTreeIcon(treeNode) {
  console.log(treeNode)

  if (+treeNode.obj.parentId === 0) {
    return () => import('@/components/TGContainerWithTreeSider/assets/images/tree-examination-item.svg')
  } else {
    if (!treeNode.isParent && treeNode.name === '内科') {
      return () => import('@/components/TGContainerWithTreeSider/assets/images/tree-examination-malady.svg')
    } else if (!treeNode.isParent && treeNode.name === '五官') {
      return () => import('@/components/TGContainerWithTreeSider/assets/images/tree-examination-five.svg')
    }
  }
}

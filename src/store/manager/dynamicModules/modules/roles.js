import { createStoreModule } from '@/store/template'

export default commitRootInModule =>
  createStoreModule({
    state: {
      visibleOfMenu: false,
      // 配置菜单弹窗内的菜单数据
      menuTree: {
        loading: false,
        list: []
      },
      roleTree: {
        loading: false,
        list: []
      },
      // 配置菜单弹窗内的角色权限菜单数据
      permissionMenus: {
        loading: false,
        list: []
      }
    }
  })

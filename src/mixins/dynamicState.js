/**
 * 创建动态vuex模块.依赖common
 * @Author: Oceanxy
 * @Email: xyzsyx@163.com
 * @Date: 2022-03-10 周四 16:31:00
 */

import store, { dynamicModules } from '@/store'
import common from './common'
import { commitRootInModule } from '@/utils/store'

export default {
  mixins: [common],
  created() {
    if (this.moduleName) {
      if (!store.hasModule(this.moduleName)) {
        store.registerModule(
          this.moduleName,
          dynamicModules[this.moduleName]?.(commitRootInModule.bind(null, this.moduleName, store.commit))
        )
      }
    } else {
      console.warn(`未在vuex store(store/dynamicModules/modules)中找到与“${this.moduleName}”对应的名称，vuex 动态模块将不会创建！`)
    }
  },
  methods: {}
  /**
   * 组件销毁时，取消注册动态store模块
   */
  // destroyed() {
  //   if (store.hasModule(this.moduleName)) {
  //     store.unregisterModule(this.moduleName)
  //   }
  // }
}

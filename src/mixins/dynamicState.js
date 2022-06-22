/**
 * 创建动态vuex模块.依赖common
 * @Author: Oceanxy
 * @Email: xyzsyx@163.com
 * @Date: 2022-03-10 周四 16:31:00
 */

import forIndex from './forIndex'
import { commitRootInModule } from '@/utils/store'
import utilityFunction from '@/utils/utilityFunction'

export default (store, dynamicModules, customModuleName) => {
  let dynamicState

  if (customModuleName) {
    // 如果存在自定义模块名，仅动态注册该模块
    dynamicState = {
      async created() {
        if (!store.hasModule(customModuleName)) {
          store.registerModule(
            customModuleName,
            dynamicModules[customModuleName]?.(commitRootInModule.bind(null, customModuleName, store.commit))
          )

          // 动态注册store模块后，立即请求该模块的数据
          await this.$store.dispatch('getList', {
            api: `get${utilityFunction.firstLetterToUppercase(customModuleName)}`,
            moduleName: customModuleName
          })
        }
      },
      methods: {
        /**
         * 下拉列表搜索事件的回调
         * @param keyword
         * @returns {Promise<void>}
         */
        async onSelectSearch(keyword) {
          // 动态注册store模块后，立即请求该模块的数据
          await this.$store.dispatch('getList', {
            api: `get${utilityFunction.firstLetterToUppercase(customModuleName)}`,
            moduleName: customModuleName,
            pagination: {
              pageIndex: 0,
              fullName: keyword
            }
          })
        }
      }
    }
  } else {
    dynamicState = {
      mixins: [forIndex],
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
      }
      /**
       * 组件销毁时，取消注册动态store模块
       */
      // destroyed() {
      //   if (store.hasModule(this.moduleName)) {
      //     store.unregisterModule(this.moduleName)
      //   }
      // }
    }
  }

  return dynamicState
}

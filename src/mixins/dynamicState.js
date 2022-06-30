/**
 * 创建动态vuex模块.依赖 forModuleName 混合
 * @Author: Oceanxy
 * @Email: xyzsyx@163.com
 * @Date: 2022-03-10 周四 16:31:00
 */

import { commitRootInModule } from '@/utils/store'
import utilityFunction from '@/utils/utilityFunction'
import forModuleName from './forModuleName'

/**
 * 创建动态vuex模块
 * @param store {Object} store 后期会自动引入，不需手动传入
 * @param dynamicModules {Object} @/store 内的所有动态模块，后期会自动引入，不需手动传入
 * @param [customModuleName] 自定义模块名。如果存在自定义模块名，仅动态注册该模块
 * @param [isRequestData] 是否在注册 customModuleName 模块后立即请求该模块的数据列表。依赖 customModuleName 参数，默认 true
 * @returns {Object}
 */
export default (store, dynamicModules, customModuleName, isRequestData = true) => {
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

          if (isRequestData) {
            // 动态注册store模块后，立即请求该模块的数据
            await this.$store.dispatch('getList', {
              api: `get${utilityFunction.firstLetterToUppercase(customModuleName)}`,
              moduleName: customModuleName
            })
          }
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
            additionalQueryParameters: {
              pageIndex: 0,
              fullName: keyword
            }
          })
        }
      }
    }
  } else {
    dynamicState = {
      mixins: [forModuleName()],
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

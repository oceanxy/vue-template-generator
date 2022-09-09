/**
 * 根据页面 name 自动生成 moduleName 的混合
 * @Author: Oceanxy
 * @Email: xyzsyx@163.com
 * @Date: 2022-06-27 周一 10:09:06
 */

import forIndex from '@/mixins/forIndex'

/**
 * 根据页面 name 自动生成 moduleName 的混合
 * @param [injectSubmoduleName] {boolean} 注入 submoduleName
 * @returns {Object}
 */
export default (injectSubmoduleName = false) => {
  let forModuleName = {
    mixins: [forIndex],
    computed: {
      moduleName() {
        let name = this.$options.name || ''

        // 获取父级模块名称，moduleName 一律使用父级模块的名称。
        // 格式 父级模块名称-本级模块名称
        const index = name.indexOf('-')

        if (index > -1) {
          name = name.substring(0, index)
        }

        if (!name) {
          console.warn('请设置组件的名称(name)，动态创建store模块需要该属性！')

          return null
        }

        return name.replace(/^\S/g, s => s.toLowerCase())
      }
    },
    provide() {
      return { moduleName: this.moduleName }
    }
  }

  if (injectSubmoduleName) {
    forModuleName = {
      ...forModuleName,
      computed: {
        ...forModuleName.computed,
        submoduleName() {
          let name = this.$options.name || ''
          const index = name.indexOf('-')

          if (index > -1) {
            name = name.substring(index + 1)
          }

          if (!name) {
            console.warn('请设置组件的名称(name，格式 “{moduleName}-{subModuleName}”)，获取子模块数据需要该属性！')

            return null
          }

          return name.replace(/^\S/g, s => s.toLowerCase())
        }
      },
      provide() {
        return {
          moduleName: this.moduleName,
          submoduleName: this.submoduleName
        }
      }
    }
  }

  return forModuleName
}

/**
 * 模块首页（index）组件通用，主要提供moduleName，以及一些模块辅助函数
 * @Author: Oceanxy
 * @Email: xyzsyx@163.com
 * @Date: 2022-05-31 周二 17:25:55
 */

import { dispatch } from '@/utils/store'

export default {
  provide() {
    return {
      moduleName: this.moduleName
    }
  },
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
  methods: {
    /**
     * 注入封装后的 dispatch，不必再手动传入 moduleName。
     * 供使用了 index mixin 的组件使用。
     * 使用：this._dispatch(action, payload)
     *    也可以直接调用 '@/utils/store' 里的 'dispatch(moduleName, action, payload)'
     * 如果需要调用全局的 actions 和 mutations，请传第三个参数 root:true
     *    也可以直接在组件内以 this.$store.dispatch() 来调用全局 actions
     * @param action {string}
     * @param payload {{payload: *} | *}
     * @param [optional] {{root: boolean}}
     */
    async _dispatch(action, payload, optional) {
      if (optional.root) {
        await this.$store.dispatch(action, { ...payload, moduleName: this.moduleName })
      } else {
        await dispatch(this.moduleName, action, payload)
      }
    }
  }
}

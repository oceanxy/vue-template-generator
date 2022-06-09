/**
 * 组件通用
 * @Author: Oceanxy
 * @Email: xyzsyx@163.com
 * @Date: 2022-05-31 周二 17:25:55
 */

import { dispatch } from '@/utils/store'

export default {
  provide() {
    return { moduleName: this.moduleName }
  },
  computed: {
    moduleName() {
      let name = this.$options.name
      const index = name.indexOf('-')

      if (index > -1) {
        name = name.substring(0, name.indexOf('-'))
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
     * 注入封装后的 dispatch，不必再手动传入 moduleName。使用：this.dispatch(action, payload)
     * 也可以直接调用 '@/utils/store' 里的 'dispatch(moduleName, action, payload)'
     * @param action {string}
     * @param payload {*}
     * @returns {Promise<*>}
     */
    async dispatch(action, payload) {
      return await dispatch(this.moduleName, action, payload)
    }
  }
}

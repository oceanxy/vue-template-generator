/**
 * 模块组件（components路径下）组件通用，主要提供一些通用的辅助函数
 * @Author: Oceanxy
 * @Email: xyzsyx@163.com
 * @Date: 2022-06-14 周二 15:05:10
 */

import { cloneDeep } from 'lodash'

export default {
  inject: ['moduleName'],
  methods: {
    /**
     * 打开弹窗操作
     *  1、设置 currentItem 数据。（当前用于操作的数据）
     *  2、设置对应弹窗的可见性为true，弹窗的控制字段请对应store内定义的字段
     * @param record {Object} 当前用于操作的数据。编辑弹窗为回显数据，详情弹窗为详情数据
     * @param [visibleField] {string} 默认值为打开编辑弹窗的可见性控制字段：visibleOfEdit
     * @param [moduleName] {string} 目标模块名，在一个模块内调用另外一个模块的 state 时，需要传递对应模块的 moduleName
     * @returns {Promise<void>}
     */
    async _setVisibleOfModal(record, visibleField, moduleName) {
      await this.$store.dispatch('setCurrentItem', {
        value: cloneDeep(record),
        moduleName: this.moduleName
      })
      await this.$store.dispatch('setModalVisible', {
        statusField: visibleField,
        statusValue: true,
        moduleName: moduleName || this.moduleName
      })
    }
  }
}

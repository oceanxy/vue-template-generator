/**
 * 弹窗 依赖 forIndex
 * @Author: Oceanxy
 * @Email: xyzsyx@163.com
 * @Date: 2022-05-31 周二 17:39:54
 */

import { mapGetters } from 'vuex'
import forIndex from '@/mixins/forIndex'

export default {
  mixins: [forIndex],
  inject: ['moduleName'],
  props: {
    /**
     * 标题（可定义占位符）
     * “{action}” 为占位符，稍后会在 mixin 中替换为对应的字符，比如“新增”、“编辑”
     */
    title: {
      type: String,
      default: '{action}'
    }
  },
  data() {
    return {
      visibleField: '',
      modalProps: {
        visible: false,
        title: '',
        okText: '提交',
        maskClosable: false,
        confirmLoading: false,
        width: 600,
        style: {
          overflow: 'auto',
          maxHeight: 'calc(90vh - 100px)'
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      getVisibleFromStore: 'getVisible',
      getCurrentItem: 'getCurrentItem'
    }),
    currentItem() {
      return this.getCurrentItem(this.moduleName)
    },
    visible() {
      return this.getVisibleFromStore(this.moduleName, this.visibleField)
    }
  },
  watch: {
    visible(value) {
      if (value) {
        this.modalProps.title = this.title
      }

      this.modalProps.visible = value
    }
  },
  methods: {
    /**
     * 取消/关闭 弹窗
     * @param [visibleField] {string} 对应store模块内控制该弹窗的字段名。默认为新增/编辑弹窗的字段名：visibleOfEdit
     * @returns {Promise<void>}
     */
    async onCancel(visibleField) {
      await this._dispatch(
        'setModalVisible',
        {
          statusField: visibleField,
          statusValue: false
        },
        { root: true }
      )
    }
  }
}

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
      this.modalProps.visible = value
    }
  },
  methods: {
    async onCancel(action) {
      await this._dispatch(
        'setModalVisible',
        {
          statusField: action,
          statusValue: false
        },
        { root: true }
      )
    }
  }
}

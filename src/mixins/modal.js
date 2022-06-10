/**
 * 弹窗 依赖common
 * @Author: Oceanxy
 * @Email: xyzsyx@163.com
 * @Date: 2022-05-31 周二 17:39:54
 */

import { mapGetters } from 'vuex'
import common from '@/mixins/common'

export default {
  mixins: [common],
  inject: ['moduleName'],
  data() {
    return {
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
    }
  },
  watch: {
    visible(value) {
      this.modalProps.visible = value

      if (!value) {
        this.form.resetFields()
      }
    }
  },
  methods: {
    getVisible(action) {
      return this.getVisibleFromStore(this.moduleName, action)
    },
    async onCancel(action) {
      await this.dispatch(action || 'setVisibleOfEdit', false, { root: true })
    }
  }
}

/**
 * 新增/编辑弹窗 依赖modal
 * @Author: Oceanxy
 * @Email: xyzsyx@163.com
 * @Date: 2022-03-14 周一 15:43:52
 */

import { mapGetters } from 'vuex'
import { dispatch } from '@/utils/store'
import { message } from 'ant-design-vue'
import modal from '@/mixins/modal'

export default {
  mixins: [modal],
  computed: {
    ...mapGetters({
      getVisibleForModal: 'getVisibleForModal',
      getCurrentItem: 'getCurrentItem'
    }),
    visible() {
      return this.getVisibleForModal(this.moduleName)
    }
  },
  watch: {
    visible(value) {
      if (value) {
        this.modalProps.title = this.title.replace('{action}', this.currentItem.id ? '编辑' : '新增')
      }
    }
  },
  methods: {
    onSubmit(transformValue) {
      this.form.validateFields(async (err, values) => {
        if (!err) {
          this.modalProps.confirmLoading = true

          let status
          const data = {
            ...values,
            status: values.status ? 1 : 2,
            ...transformValue(values)
          }

          // 存在ID，目前为编辑模式
          if (this.currentItem?.id) {
            data.id = this.currentItem.id
            status = await dispatch(this.moduleName, 'update', data)
          } else /* 新增模式 */ {
            status = await dispatch(this.moduleName, 'add', data)
          }

          if (status) {
            await this.onCancel()
            message.success('操作成功！')
          }

          this.modalProps.confirmLoading = false
        }
      })
    }
  }
}

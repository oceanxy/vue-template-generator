/**
 * 新增/编辑弹窗 依赖modal
 * @Author: Oceanxy
 * @Email: xyzsyx@163.com
 * @Date: 2022-03-14 周一 15:43:52
 */

import { message } from 'ant-design-vue'
import forModal from '@/mixins/forModal'
import { omit } from 'lodash'

export default {
  mixins: [forModal()],
  data: () => ({
    visibleField: 'visibleOfEdit'
  }),
  watch: {
    visible: {
      immediate: true,
      handler(value) {
        if (value) {
          this.modalProps.title = this.title.replace('{action}', this.currentItem.id ? '编辑' : '新增')
        } else {
          this.form.resetFields()
        }
      }
    }
  },
  methods: {
    transformValue(values) {
      let temp = { ...values }

      if ('status' in temp) {
        temp.status = temp.status ? 1 : 2
      }

      if ('areaCode' in temp) {
        temp.provinceId = temp.areaCode[0]
        temp.cityId = temp.areaCode[1]
        temp.countyId = temp.areaCode[2]
        temp = omit(temp, 'areaCode')
      }

      if ('imgList' in temp && temp.imgList.length) {
        temp.imgs = temp.imgList.map(item => item.response?.data[0].key ?? item.key).join()
        temp = omit(temp, 'imgList')
      }

      return temp
    },
    onSubmit() {
      this.form.validateFields(async (err, values) => {
        if (!err) {
          this.modalProps.confirmLoading = true

          // 存在ID，目前为编辑模式
          let action
          const payload = this.transformValue(values)

          if (this.currentItem?.id) {
            action = 'update'
            payload.id = this.currentItem.id
          } else {
            action = 'add'
          }

          const status = await this.$store.dispatch(action, {
            moduleName: this.moduleName,
            payload
          })

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

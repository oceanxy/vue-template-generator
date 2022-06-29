/**
 * 新增/编辑弹窗 依赖 forModal 混合
 * @Author: Oceanxy
 * @Email: xyzsyx@163.com
 * @Date: 2022-03-14 周一 15:43:52
 */

import { message } from 'ant-design-vue'
import forModal from '@/mixins/forModal'
import { omit } from 'lodash'

export default () => {
  return {
    mixins: [forModal()],
    data: () => ({
      visibleField: 'visibleOfEdit'
    }),
    watch: {
      visible: {
        immediate: true,
        handler(value) {
          if (value) {
            this.modalProps.title = this.modalTitle.replace('{action}', this.currentItem.id ? '编辑' : '新增')
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

        if ('regulationOrganIds' in temp) {
          temp.regulationOrganIds = temp.regulationOrganIds.join()
        }

        if ('operationOrganIds' in temp) {
          temp.operationOrganIds = temp.operationOrganIds.join()
        }

        if ('propertyOrganIds' in temp) {
          temp.propertyOrganIds = temp.propertyOrganIds.join()
        }

        if ('areaCode' in temp) {
          if (Array.isArray(temp.areaCode)) {
            temp.provinceId = temp.areaCode[0]
            temp.cityId = temp.areaCode[1]
            temp.countyId = temp.areaCode[2]
          } else {
            temp.provinceId = ''
            temp.cityId = ''
            temp.countyId = ''
          }

          temp = omit(temp, 'areaCode')
        }

        if ('logo' in temp) {
          if (temp.logo.length) {
            temp.logo = temp.logo[0].response?.data[0].key ?? temp.logo[0].key
          } else {
            temp.logo = ''
          }
        }

        if ('imgList' in temp && temp.imgList.length) {
          temp.imgs = temp.imgList.map(item => item.response?.data[0].key ?? item.key).join()
          temp = omit(temp, 'imgList')
        }

        if ('roleIds' in temp) {
          temp.roleIds = temp.roleIds.join()
        }

        if ('facilityList' in temp) {
          temp.facilityList = temp.facilityList.map(id => ({
            id,
            fullName: (this.supportingFacilities?.find(item => item.id === id)).fullName
          }))
        }

        return temp
      },
      /**
       * 提交表单
       * @param options {{isFetchList: boolean, [customApiName]: string}, [customValidation]: Function}
       * isFetchList：是否在提交并单后立即刷新对应的列表，默认 true；
       * customApiName：自定义请求API
       * customValidation: 自定义验证函数
       */
      onSubmit(options = { isFetchList: true }) {
        this.form.validateFields(async (err, values) => {
          console.log(values)
          let validation = true

          if (typeof options.customValidation === 'function') {
            validation = options.customValidation()
          }

          if (!err && validation) {
            this.modalProps.confirmLoading = true

            // 存在ID，目前为编辑模式
            let action
            const payload = this.transformValue(values)

            if (this.currentItem?.id) {
              action = 'update'
              payload.id = this.currentItem.id
            } else if (this.currentItem?.ids) {
              action = 'update'
              payload.ids = this.currentItem.ids
            } else {
              action = 'add'
            }

            const status = await this.$store.dispatch(action, {
              moduleName: this.moduleName,
              visibleField: this.visibleField,
              isFetchList: options.isFetchList,
              customApiName: options.customApiName,
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
}

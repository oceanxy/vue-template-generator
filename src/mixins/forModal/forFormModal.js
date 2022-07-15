/**
 * 新增/编辑弹窗 依赖 forModal 混合
 * @Author: Oceanxy
 * @Email: xyzsyx@163.com
 * @Date: 2022-03-14 周一 15:43:52
 */

import { message } from 'ant-design-vue'
import forModal from '@/mixins/forModal'
import { cloneDeep, omit } from 'lodash'
import moment from 'moment'

export default () => {
  return {
    mixins: [forModal()],
    props: {
      /**
       * 用于替换 modalTitle 内的 {action} 的候选值
       */
      candidateTitle: {
        type: Array,
        default: () => ['编辑', '新增']
      }
    },
    data: () => ({
      visibleField: 'visibleOfEdit'
    }),
    watch: {
      visible: {
        immediate: true,
        handler(value) {
          if (value) {
            this.modalProps.title = (this.$parent.$attrs.modalTitle || this.modalTitle)
              .replace('{action}', this.currentItem.id
                ? this.$parent.$attrs.candidateTitle?.[0] || this.candidateTitle[0]
                : this.$parent.$attrs.candidateTitle?.[1] || this.candidateTitle[1]
              )
          } else {
            this.form.resetFields()
          }
        }
      }
    },
    methods: {
      // 此函数逻辑后期需要改为在每个组件内各自判断，不再在混合里统一处理
      transformValue(values) {
        let temp = cloneDeep(values)

        if ('billIds' in temp) {
          // 筛选已勾选账单
          const ordersChecked = this.pendingOrders.list.filter(item => temp.billIds.includes(item.id))
          // 筛选已勾选账单内所有的子级ID
          temp.billIds = ordersChecked.reduce(
            (prev, current) => prev.concat(current.billList.reduce((p, c) => p.concat([c.id]), [])),
            []
          )
        }

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

        if ('dateRange' in temp) {
          temp.startTime = moment(temp.dateRange[0]).format('YYYYMMDDHHmm')
          temp.endTime = moment(temp.dateRange[1]).format('YYYYMMDDHHmm')

          temp = omit(temp, 'dateRange')
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

        // 招商人员管理头像
        if ('headPortrait' in temp) {
          if (temp.headPortrait.length) {
            temp.headPortrait = temp.headPortrait[0].response?.data[0].key ?? temp.headPortrait[0].key
          } else {
            temp.headPortrait = ''
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

        if ('isUnderground' in temp) {
          temp.isUnderground = temp.isUnderground ? 1 : 0
        }

        // 此itemList为问卷列表的字段，如有重复请更改为其他字段名
        if ('itemList' in temp) {
          temp.itemList.forEach(item => {
            item.isRequired = item.isRequired ? 1 : 0
            item.status = item.status ? 1 : 0
          })
        }

        if ('isShow' in temp) {
          temp.isShow = temp.isShow ? 1 : 0
        }
        if ('isDefault' in temp) {
          temp.isDefault = temp.isDefault ? 1 : 0
        }

        return temp
      },
      /**
       * 提交表单
       * @param options {{
       *   [isFetchList]: boolean,
       *   [customApiName]: string,
       *   [customValidation]: () => boolean,
       *   [customDataHandler]: (values) => values
       * }}
       * options.isFetchList：是否在提交表单后立即刷新对应的列表，默认 true；
       * options.customApiName：自定义请求API；
       * options.customValidation: 自定义验证函数；
       * options.customDataHandler(): ：自定义参数处理；
       */
      onSubmit(options) {
        options = {
          isFetchList: true,
          ...options
        }

        let validation = true

        if (typeof options.customValidation === 'function') {
          validation = options.customValidation()
        }

        this.form.validateFieldsAndScroll(async (err, values) => {
          if (!err && validation) {
            this.modalProps.confirmLoading = true

            let action
            let payload = this.transformValue(values)

            // 根据 this.currentItem.id 判断当前表单的提交模式，
            // 如果存在 options.customApiName，则可自定义请求模式
            if (!options.customApiName) {
              if (this.currentItem?.id) {
                // 存在 ID 为编辑模式
                action = 'update'
                payload.id = this.currentItem.id
              } else {
                // 不存在 ID 则为新增模式
                action = 'add'
              }
            } else {
              // 自定义表单提交模式
              action = 'custom'

              if (this.currentItem?.ids) {
                payload.ids = this.currentItem.ids
              } else {
                payload.id = this.currentItem.id
              }
            }

            //自定义处理请求参数
            if (typeof options.customDataHandler === 'function') {
              payload = options.customDataHandler(payload)
            }

            const status = await this.$store.dispatch(action, {
              moduleName: this.moduleName,
              visibleField: this.visibleField,
              isFetchList: options.isFetchList,
              customApiName: options.customApiName,
              payload
            })

            if (status) {
              message.success('操作成功！')
            }

            this.modalProps.confirmLoading = false
          }
        })
      }
    }
  }
}

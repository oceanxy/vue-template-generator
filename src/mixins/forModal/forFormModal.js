/**
 * 新增/编辑弹窗 依赖 forModal 混合
 * @Author: Oceanxy
 * @Email: xyzsyx@163.com
 * @Date: 2022-03-14 周一 15:43:52
 */

import forModal from '@/mixins/forModal'
import { cloneDeep, omit } from 'lodash'
import moment from 'moment'
import Message from '@/utils/message'

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
    data() {
      return {
        visibleField: 'visibleOfEdit',
        modalProps: { okButtonProps: { props: { disabled: true } } }
      }
    },
    watch: {
      visible: {
        immediate: true,
        handler(value) {
          if (value) {
            this.modalProps.title = (this.$parent.$attrs.modalTitle || this.modalTitle).replace(
              '{action}',
              this.currentItem.id
                ? this.$parent.$attrs.candidateTitle?.[0] || this.candidateTitle[0]
                : this.$parent.$attrs.candidateTitle?.[1] || this.candidateTitle[1]
            )
          } else {
            this.form.resetFields()
          }
        }
      }
    },
    created() {
      // 进入表单弹窗时，做任何修改之前禁用提交按钮
      if (this.form) {
        this.$watch(
          () => this.form?.isFieldsTouched(),
          () => {
            this.modalProps.okButtonProps.props.disabled = false
          }
        )
      }
    },
    methods: {
      // 此处仅处理共用字段。如 status, dateRange, datetimeRange，areaCode 等。
      // 组件内独有字段请在 forFormModal 的 customDataHandler 回调函数内处理
      transformValue(values) {
        let temp = cloneDeep(values)

        if ('status' in temp) {
          temp.status = temp.status ? 1 : 2
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

        return temp
      },
      /**
       * 提交表单
       * @param [isFetchList=true] {boolean} 是否在提交表单后立即刷新对应的列表，默认 true
       * @param [customApiName] {string} 自定义请求API
       * @param [customValidation] {() => boolean} 自定义验证函数
       * @param [customDataHandler] {(values) => Object} 自定义参数处理
       * @param [done] {() => void} 提交成功后的回调函数
       */
      onSubmit({
        isFetchList = true,
        customApiName,
        customValidation,
        customDataHandler,
        done
      } = {}) {
        this.form.validateFieldsAndScroll(async (err, values) => {
          let validation = true

          if (typeof customValidation === 'function') {
            validation = customValidation()
          }

          if (!err && validation) {
            this.modalProps.confirmLoading = true

            let action
            let payload = this.transformValue(values)

            // 根据 this.currentItem.id 判断当前表单的提交模式，
            // 如果存在 customApiName，则可自定义请求模式
            if (!customApiName) {
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

            // 自定义处理请求参数
            if (typeof customDataHandler === 'function') {
              payload = customDataHandler(payload)
            }

            const status = await this.$store.dispatch(action, {
              moduleName: this.moduleName,
              visibleField: this.visibleField,
              isFetchList: isFetchList,
              customApiName: customApiName,
              additionalQueryParameters: {
                ...this.$route.query,
                // 获取子模块数据需要的额外参数，在引用该混合的子模块内覆盖设置。
                // 请根据参数的取值和性质自行决定在 data 内或 computed 内定义。
                ...(this.additionalQueryParameters || {})
              },
              payload
            })

            if (status) {
              // 操作提示消息
              Message.message(status)

              // 成功回调
              if (typeof done === 'function') {
                done()
              }
            }

            this.modalProps.confirmLoading = false
          }
        })
      }
    }
  }
}

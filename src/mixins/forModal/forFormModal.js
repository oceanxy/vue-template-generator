/**
 * 新增/编辑弹窗 依赖 forModal 混合
 * @Author: Omsber
 * @Email: xyzsyx@163.com
 * @Date: 2022-03-14 周一 15:43:52
 */

import forModal from '@/mixins/forModal'
import { cloneDeep, omit } from 'lodash'
import moment from 'moment'
import { message } from '@/utils/message'

/**
 * @param [disableSubmitButton=true] {boolean} 加载表单后，在未修改表单内任一项的值之前，禁用提交按钮
 * @param [fetchDetailsFn] {() => FetchDetailsFnReturn} 请求本页列表某一项数据详细信息的配置函数。<br>
 * 注意，可以在回调函数内使用 this 关键字，此时请不要使用箭头函数。<br>
 * 请求得到的数据会被合并到本页面对应模块的 store.state.currentItem 对象内。<br>
 * 一般用在编辑弹窗内，请求详细信息的接口请在 apis 文件夹下对应模块内定义，定义规则请参考 全局 action： getDetails
 * @returns {Object}
 */
export default ({
  disableSubmitButton = true,
  fetchDetailsFn
} = {}) => {
  return {
    mixins: [forModal({ fetchDetailsFn })],
    inject: {
      /**
       * 判断本页面是否存在侧边树组件
       * 来自于 @/src/components/TGContainerWithTreeSider 组件
       */
      inTree: { default: false },
      /**
       * 刷新侧边树的数据
       * 来自于 @/src/components/TGContainerWithTreeSider 组件
       */
      refreshTree: { default: null }
    },
    props: {
      /**
       * 用于替换 modalTitle 内的 {action} 的候选值
       */
      candidateTitle: {
        type: Array,
        default: () => ['编辑', '新增']
      },
      /**
       * 控制弹窗显示的字段（本混合默认为 “visibilityOfEdit”）
       */
      visibilityFieldName: {
        type: String,
        default: 'visibilityOfEdit'
      }
    },
    data() {
      return { modalProps: { okButtonProps: { props: { disabled: disableSubmitButton } } } }
    },
    watch: {
      visible: {
        immediate: true,
        async handler(value) {
          if (value) {
            this.modalProps.okButtonProps.props.disabled = disableSubmitButton
            this.modalProps.title = (this.$parent.$attrs.modalTitle || this.modalTitle).replace(
              '{action}',
              this.currentItem?.id
                ? this.$parent.$attrs.candidateTitle?.[0] || this.candidateTitle[0]
                : this.$parent.$attrs.candidateTitle?.[1] || this.candidateTitle[1]
            )
          } else {
            this.form.resetFields()
          }
        }
      }
    },
    computed: {
      attributes() {
        return {
          attrs: this.modalProps,
          on: {
            cancel: () => this.onCancel(),
            ok: () => this.onSubmit()
          }
        }
      }
    },
    created() {
      // 进入表单弹窗时，做任何修改之前禁用提交按钮
      if (this.form && disableSubmitButton) {
        this.$watch(
          () => this.form?.isFieldsTouched(),
          () => {
            this.modalProps.okButtonProps.props.disabled = false
          },
          { deep: true }
        )
      }
    },
    methods: {
      // 此处仅处理共用字段，如 status, dateRange, datetimeRange 等。
      // 不推荐在此处处理字段，后期可能完全移除。推荐在 onSubmit 的 customDataHandler 回调函数内处理，
      // 也可以在 form.getFieldDecorator 内使用 getValueFromEvent 和 getValueProps 结合来处理。
      transformValue(values) {
        let temp = cloneDeep(values)

        if ('status' in temp && typeof temp.status === 'boolean') {
          temp.status = temp.status ? 1 : 2
        }

        if ('dateRange' in temp) {
          temp.startTime = moment(temp.dateRange[0]).format('YYYYMMDD')
          temp.endTime = moment(temp.dateRange[1]).format('YYYYMMDD')

          temp = omit(temp, 'dateRange')
        }

        return temp
      },
      /**
       * 提交表单
       * 注意 isResetSelectedRows 参数很重要，该清空 selectedRowKeys 时一定要清空，不然会造成下次请求时的参数重叠。
       * 主要应用在“删除”等会减少列表数据量的操作中
       * @param [refreshTree=false] {boolean} 是否在成功提交表单后刷新对应的侧边树，默认 false。依赖 inject.inTree 和 inject.refreshTree()
       * @param [isFetchList=true] {boolean} 是否在成功提交表单后刷新对应的列表，默认 true
       * @param [isResetSelectedRows] {boolean} 是否在成功提交表单后重置列表的选中行数据，默认 false
       * @param [customApiName] {string} 自定义请求API
       * @param [customAction] {string} 自定义请求 action。
       *  该参数仅在 this.currentItem.id 不存在时可用；反之则一定走 update Action，此时仍可自定义 customApiName。
       *  可选值 'add'/'update'/'custom'/'export'：
       *  新增弹窗时的默认 'add'，编辑弹窗时的默认 'update'，非以上二者时默认为 'custom'，此时需要配合 customApiName 一起使用。
       *  特例（批量更新），需要明确指定为 'update'；导出文件的弹窗需要明确指定为 'export'。
       *  默认值判断具体规则：
       *  优先根据当前被操作的数据是否存在 id 字段来判断，
       *  如果不存在，则根据 customAction 字段来判断。
       * @param [customValidation] {() => boolean} 自定义验证函数（请使用箭头函数）
       * @param [customDataHandler] {(values) => Object} 自定义参数处理（请使用箭头函数）
       * @param [done] {(response) => void} 提交成功后的回调函数（请使用箭头函数）
       */
      onSubmit({
        refreshTree,
        isFetchList = true,
        isResetSelectedRows,
        customApiName,
        customAction,
        customValidation,
        customDataHandler,
        done
      } = {}) {
        if (customAction && !['add', 'update', 'custom', 'export'].includes(customAction)) {
          customAction = 'custom'
        }

        this.form.validateFieldsAndScroll(async (err, values) => {
          let validation = true

          if (typeof customValidation === 'function') {
            validation = customValidation()
          }

          if (!err && validation) {
            await this.onConfirmLoading(async () => {
              let action
              let payload = this.transformValue(values)

              // 优先根据 this.currentItem.id 判断当前表单的提交模式，customAction 字段次之。
              // 并为 request 的参数设置对应的 ID。
              if (this.currentItem?.id) {
                // 为单个编辑模式
                action = 'update'
                payload.id = this.currentItem.id
                payload.ids = payload.id // 兼容批量操作的情况
              } else {
                if (!customAction || customAction === 'add') {
                  // 新增模式
                  action = 'add'
                } else {
                  // 默认为自定义模式
                  // 这里存在一个特例——批量更新（update）——需要明确定义 customAction 为 'update' 才会触发更新操作，
                  // 否则会触发自定义操作（custom）
                  isResetSelectedRows = true
                  action = customAction || 'custom'
                  payload.id = this.selectedRowKeys?.join?.(',')
                  payload.ids = payload.id // 兼容批量操作的情况
                }
              }

              if (action === 'custom' && !customApiName) {
                throw new Error(`${this.moduleName}内有表单弹窗设置错误：需要自定义接口名称（customApiName）！`)
              }

              // 自定义处理请求参数
              if (typeof customDataHandler === 'function') {
                payload = customDataHandler(payload)
              }

              const options = {
                moduleName: this.moduleName,
                visibilityFieldName: this._visibilityFieldName,
                isFetchList,
                customApiName,
                // 请求参数
                payload,
                isResetSelectedRows,
                // 附加请求参数，获取子模块数据需要的额外参数，在引用该混合的子模块内覆盖设置。
                // 请根据参数的取值和性质自行决定在混入组件的 data 内或 computed 内定义。
                parametersOfGetListAction: {
                  additionalQueryParameters: {
                    ...this.$route.query,
                    ...(this.additionalQueryParameters || {})
                  }
                }
              }

              // action 为 'export' 时可用。
              // 请根据参数的取值和性质自行决定在混入组件的 data 内或 computed 内定义。
              if (action === 'export') {
                options.fileName = this.fileName
                options.additionalQueryParameters = options.parametersOfGetListAction.additionalQueryParameters
                delete options.parametersOfGetListAction
              }

              const response = await this.$store.dispatch(action, options)

              let status

              if (typeof response === 'boolean') {
                status = response
              } else {
                status = response?.status
              }

              if (status) {
                // 操作提示消息
                message(status)

                // 执行侧边树刷新操作
                if (refreshTree && this.inTree) {
                  await this.refreshTree()
                }

                // 执行回调
                if (typeof done === 'function') {
                  done.call(this, response)
                }
              }
            })
          }
        })
      }
    }
  }
}

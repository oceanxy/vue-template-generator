/**
 * 表格搜索 混合
 * @Author: Omsber <xyzsyx@163.com>
 * @Date: 2022-03-14 周一 15:33:20
 */

/**
 * 必需入参的枚举配置
 * @typedef EnumOptionOfSearchParam
 * @property {string} stateName - 保存枚举的名称，位于相应模块的 store.state 中。
 * @property {string} customApiName - 请求该枚举的接口名称。
 * @property {(state: Object) => Object} [getRequestParams] - 枚举请求时的参数，默认为空对象。
 * @property {boolean} [isRequired] - 是否是请求列表数据的必传参数。
 * @property {boolean} [isDependentTreeNode] - 是否依赖本页面左侧的树的选中项。
 * @property {Function} [onTreeNodeChange] - 树节点变更回调，依赖 isDependentTreeNode。
 * @property {string} [paramName] - store.state.search 内对应选中枚举的参数名。当 isRequired 为 true 时可用。
 * @property {(data: Object[]|Object) => any} [getParam] - 枚举加载成功后的取值逻辑。当 isRequired 为 true 时可用。
 * - 参数 data 为接口请求的数据对象或数据数组；
 * - 返回值将赋值给 store.state.search 对象内 paramName 指定的字段。
 * @property {EnumOptionOfSearchParam[]} [cascadingEnums] - 级联枚举配置（暂未实现）
 */

import { cloneDeep, isBoolean, omit } from 'lodash'
import { Button, Form, Space } from 'ant-design-vue'
import moment from 'moment'
import TGPermissionsButton, { disabledType } from '@/components/TGPermissionsButton'
import { sleep } from '@/utils/utilityFunction'

/**
 * 用于表格搜索的混合
 *
 * 混入组件支持定义以下计算属性以扩展组件的渲染能力，但与render函数互斥（render函数不推荐使用）:
 * - forRender：返回搜素栏的搜索组件集合。
 * - extraContent：返回搜索栏额外的内容，不与搜索组件并列，在布局的样式上更灵活。
 *
 * 注意:以上计算属性的返回值类型为 JSX。
 *
 * @mixin
 * @param {boolean} [isFetchList=true] 是否通过本组件的搜索按钮来请求数据。
 * - 设置为 false 时，将隐藏搜索按钮。
 * - 在一些特殊场景，搜索按钮只负责改变 store 内的值，例如：
 *  如果其他组件（如左侧树、页面列表等）有请求数据的逻辑，此处请设置为 false，
 *  此时搜索按钮仅仅用来控制 store.state.search 的值，将发送请求的逻辑交由这些组件来完成。
 * @param {boolean} [isInitializeFromStore=false] 在组件加载成功时，是否把 store 内对应本组件的模块的搜索参数映射到 Form 组件内。
 * @param {()=>boolean} [buttonDisabledFn] 禁用查询按钮的方法。
 * @param {boolean} [disabledButtonPermission] 在启用按钮级权限的情况下，是否关闭该模块的按钮权限验证。默认 false。
 * @param {string} [buttonPermissionIdentification] 自定义按钮的权限标识，默认 'QUERY'
 * @param {()=>Object} [setParams] 调用查询接口时需要的额外请求参数。一般用于配置在子模块内的 inquiry 组件获取父模块参数等。
 * @param {()=>Object} [setOptions] 调用查询接口时需要的`全局Action(如：setSearch、getList等)`配置。一般用于自定义请求接口等配置。
 * @param {EnumOptionOfSearchParam[]} [enumOptionOfSearchParams] - 入参的枚举配置。
 * @param {() => Object} [beforeRequiredEnumsLoaded] - 必需入参的枚举加载前回调，依赖 enumOptionOfSearchParams。注意：因为此回调会在混入
 * 组件的 created 生命周期之前执行，所以如有需要提前注入 search 的参数，请在此回调的返回值中配置。
 * @param {(isFetchList: boolean) => Promise<Object>|undefined} [afterRequiredEnumsLoaded] 必需入参的枚举加载后回调，
 * 依赖 enumOptionOfSearchParams。
 * @returns {Object<Vue.mixin>}
 */
export default function forInquiry({
  isFetchList = true,
  isInitializeFromStore = false,
  buttonDisabledFn,
  disabledButtonPermission = false,
  buttonPermissionIdentification = 'QUERY',
  setParams,
  setOptions,
  enumOptionOfSearchParams,
  beforeRequiredEnumsLoaded,
  afterRequiredEnumsLoaded
} = {}) {
  return {
    inject: {
      moduleName: { default: '' },
      submoduleName: { default: '' },
      /**
       * 注入树标识：判断当前组件是否启用侧边树
       * 来自于 @/components/TGContainerWithTreeSider
       */
      inTree: { default: false },
      /**
       * 注入弹窗标识：判断当前组件是否在弹窗内
       * 来自于 @/mixins/forModal
       */
      inModal: { default: false },
      // 通知组件在初始化阶段是否自动请求数据。
      // 来自于 @/components/TGContainerWithTreeSider 组件。
      notInitList: { default: false }
    },
    data() {
      return {
        // 为了缓存 onSubmit 的参数
        params: {},
        // 为了缓存 onSubmit 的参数
        options: {},
        // 搜索表单初始化值
        initialValues: {},
        // 搜索表单内的初始化必填参数（如果有）的枚举是否已经就绪（已经全部加载到store的search对象内）
        isRequiredEnumsLoaded: false,
        // 搜索表单内依赖于左侧树结点且必填的参数（如果有）的枚举是否已经就绪（已经全部加载到store的search对象内）
        isRequiredAndDependentTreeNodeEnumsLoaded: false,
        // 按钮禁用状态
        buttonDisabled: false
      }
    },
    computed: {
      search: {
        get() {
          if (this.submoduleName) {
            return this.$store.state[this.moduleName][this.submoduleName].search
          }

          return this.$store.state[this.moduleName].search
        },
        set(value) {
          if (Object.keys(value || {}).length) {
            this.$store.commit('setState', {
              value: this.transformValue(value),
              moduleName: this.moduleName,
              submoduleName: this.submoduleName,
              stateName: 'search',
              merge: true
            })
          }
        }
      },
      treeIdField() {
        return this.$store.state[this.moduleName].treeIdField
      },
      treeCollapsed: {
        get() {
          return this.$store.state['common'].treeCollapsed
        },
        async set(value) {
          this.$store.commit('setState', {
            value,
            moduleName: 'common',
            stateName: 'treeCollapsed'
          })
        }
      },
      sideToggle() {
        return (
          <div class={'tg-inquiry-side-toggle'}>
            <IconFont
              class={'tree-btn'}
              type={'icon-side-tree-toggle'}
              onClick={this.onTreeFold}
              title={'折叠/展开 左侧树'}
            />
          </div>
        )
      },
      operationButtons() {
        return (
          <Space class={'tg-inquiry-form-buttons'}>
            {
              this.$config.buttonPermissions && !disabledButtonPermission
                ? [
                  <TGPermissionsButton
                    identification={buttonPermissionIdentification}
                    disabledType={disabledType.DISABLE}
                    disabled={this.buttonDisabled}
                    loading={this.loading}
                    htmlType="submit"
                    type="primary"
                    icon="search"
                  >
                    查询
                  </TGPermissionsButton>,
                  <TGPermissionsButton
                    onClick={this.onClear}
                    icon="reload"
                    identification={buttonPermissionIdentification}
                    disabledType={disabledType.DISABLE}
                  >
                    重置并刷新
                  </TGPermissionsButton>
                ]
                : [
                  <Button
                    disabled={this.buttonDisabled}
                    loading={this.loading}
                    htmlType="submit"
                    type="primary"
                    icon="search"
                  >
                    查询
                  </Button>,
                  <Button onClick={this.onClear} icon="reload">
                    重置并刷新
                  </Button>
                ]
            }
          </Space>
        )
      },
      content() {
        let content = this.forRender

        if (!content) {
          console.error(
            `未检测到 ${this.moduleName}${this.submoduleName ? `.${this.submoduleName}` : ''
            } 内 Inquiry 组件的 forRender 计算属性，请确认！`
          )

          return undefined
        }

        // 将渲染内容统一转换为数组以便后续处理
        if (!Array.isArray(content)) {
          content = [content]
        }

        // 当渲染数组中至少存在一个表单项时，将其内容全部放进 .inquiry-row-for-fields 容器
        if (content.find(VNode => VNode?.tag?.includes('AFormItem'))) {
          content = [<div class={'inquiry-row-for-fields'}>{content}</div>]
        }

        if (
          this.inTree &&
          this.$config.siderTree.showTrigger &&
          this.$config.siderTree.togglePosition === 'inInquiry' &&
          !this.inModal &&
          !content[0]?.children[0]?.data?.class?.includes('tg-inquiry-side-toggle')
        ) {
          content.at(0)?.children?.unshift(this.sideToggle)
        }

        if (isFetchList) {
          content.at(-1)?.children?.push(this.operationButtons)
        }

        return content
      }
    },
    async created() {
      if (typeof buttonDisabledFn === 'function') {
        this.$watch(
          () => this.form?.getFieldsValue(),
          () => {
            this.buttonDisabled = buttonDisabledFn.call(this)

            this.$nextTick(() => {
              // 仅仅为了使用 Form 组件的检验功能来改变必填框的错误状态
              this.form.validateFields(() => {/**/})
            })
          }
        )
      }

      // 同步 store.state.search 与 混入组件中定义的 initialValues，
      // 根据初始值的来源，可自行选择在混入组件的 computed 或 data 中定义 initialValues 对象
      if (isInitializeFromStore) {
        this.initialValues = { ...this.initialValues, ...cloneDeep(this.search) }
      }

      // 监听搜索表单的值的变化，与 store 做同步。以便其他组件执行表格查询时的参数统一
      this.$watch(
        () => this.form.getFieldsValue(),
        async value => {
          await this.$store.commit('setState', {
            value: this.transformValue(value),
            moduleName: this.moduleName,
            submoduleName: this.submoduleName,
            stateName: 'search',
            merge: true
          })
        }
      )

      this.search = this.initialValues

      await this.initEnums()
    },
    mounted() {
      if (!isInitializeFromStore) {
        this.search = this.convertBoolean(cloneDeep(this.form.getFieldsValue()))
      }
    },
    methods: {
      /**
       * 处理枚举
       * @returns {Promise<void>}
       */
      async initEnums() {
        try {
          if (enumOptionOfSearchParams) {
            // 初始化枚举
            const dispatches = enumOptionOfSearchParams.reduce((
              result,
              {
                stateName,
                customApiName,
                isRequired,
                paramName,
                getParam,
                getRequestParams,
                isDependentTreeNode,
                onTreeNodeChange
              }
            ) => {
              if (isRequired) {
                result[isDependentTreeNode ? 'requiredAndDependentTreeNode' : 'required'].push(
                  async () => {
                    if (typeof onTreeNodeChange === 'function') {
                      onTreeNodeChange.call(this)
                    }

                    return await this.$store.dispatch('getListWithLoadingStatus', {
                      moduleName: this.moduleName,
                      stateName,
                      customApiName,
                      payload: getRequestParams?.bind(this),
                      injectToSearch: {
                        paramName,
                        getParam: getParam?.bind(this)
                      }
                    })
                  }
                )
              } else {
                result[isDependentTreeNode ? 'notRequiredButDependentTreeNode' : 'notRequired'].push(
                  async () => {
                    if (typeof onTreeNodeChange === 'function') {
                      onTreeNodeChange.call(this)
                    }

                    return await this.$store.dispatch('getListWithLoadingStatus', {
                      moduleName: this.moduleName,
                      stateName,
                      customApiName,
                      payload: getRequestParams?.bind(this)
                    })
                  }
                )
              }

              return result
            }, {
              required: [],
              notRequired: [],
              requiredAndDependentTreeNode: [],
              notRequiredButDependentTreeNode: []
            })

            if (dispatches.required.length || dispatches.requiredAndDependentTreeNode.length) {
              await this._beforeRequiredEnumsLoaded()
            }

            await Promise.all(dispatches.required.map(cb => cb()))
            // 捕获到必填字段的 promise 异常会阻断此处代码继续往下执行
            this.isRequiredEnumsLoaded = true

            if (dispatches.notRequired.length) {
              await Promise.all(dispatches.notRequired.map(cb => cb()))
            }

            if (dispatches.requiredAndDependentTreeNode.length || dispatches.notRequiredButDependentTreeNode.length) {
              this.$watch(
                () => this.search,
                async (newSearch, oldSearch) => {
                  // 注意此处必须判断新值和旧值，不然会造成死循环
                  if (newSearch[this.treeIdField] && newSearch[this.treeIdField] !== oldSearch[this.treeIdField]) {
                    await Promise.all(dispatches.requiredAndDependentTreeNode.map(cb => cb()))
                    this.isRequiredAndDependentTreeNodeEnumsLoaded = true

                    if (dispatches.notRequiredButDependentTreeNode.length) {
                      await Promise.all(dispatches.notRequiredButDependentTreeNode.map(cb => cb()))
                    }
                  }
                },
                { deep: true }
              )
            } else {
              // 捕获到必填字段的 promise 异常会阻断此处代码继续往下执行
              this.isRequiredAndDependentTreeNodeEnumsLoaded = true
            }
          }
        } catch (error) {
          throw new Error(error)
        }
      },
      /**
       * 初始化异步请求参数的枚举
       * @returns {Promise<void>}
       * @private
       */
      async _beforeRequiredEnumsLoaded() {
        // 将异步参数加入任务队列，防止在左侧树组件未初始化完成的情况下请求列表数据
        this.$store.commit('setState', {
          moduleName: this.moduleName,
          stateName: 'taskQueues',
          merge: true,
          value: this._afterRequiredEnumsLoaded()
        })

        if (typeof beforeRequiredEnumsLoaded === 'function') {
          await beforeRequiredEnumsLoaded.call(this)
        }
      },
      async _afterRequiredEnumsLoaded() {
        while (!this.isRequiredEnumsLoaded || !this.isRequiredAndDependentTreeNodeEnumsLoaded) {
          await sleep()
        }

        if (typeof afterRequiredEnumsLoaded === 'function') {
          await afterRequiredEnumsLoaded.call(this)
        }

        return Promise.resolve({})
      },
      convertBoolean(value) {
        const temp = {}

        Object.entries(value).forEach(([k, v]) => {
          if (isBoolean(v)) {
            temp[k] = v ? 1 : 0
          } else {
            temp[k] = v
          }
        }, {})

        return temp
      },
      /**
       * 自定义转化搜索参数
       * 为了兼容旧项目，此函数只保留一些高频使用的参数处理（如果觉得有冗余代码，可在混入的组件内直接覆盖重写该方法）
       * @param {{}} values - 通过表单收集来的对象
       * @returns {{}} - 重写后的表单对象，该对象会作为搜索接口的参数发送给后端
       */
      transformValue(values) {
        let temp = this.convertBoolean(cloneDeep(values))

        if ('dateRange' in temp) {
          temp.startTime = temp.dateRange[0] ? moment(temp.dateRange[0]).format('YYYYMMDD') : ''
          temp.endTime = temp.dateRange[1] ? moment(temp.dateRange[1]).format('YYYYMMDD') : ''

          temp = omit(temp, 'dateRange')
        }

        if ('datetimeRange' in temp) {
          temp.startTime = temp.datetimeRange[0] ? moment(temp.datetimeRange[0]).format('YYYYMMDDHHmm') : ''
          temp.endTime = temp.datetimeRange[1] ? moment(temp.datetimeRange[1]).format('YYYYMMDDHHmm') : ''

          temp = omit(temp, 'datetimeRange')
        }

        if ('monthRange' in temp) {
          temp.appointmentDateStartMonth = temp.monthRange[0] ? moment(temp.monthRange[0]).format('YYYYMM') : ''
          temp.appointmentDateEndMonth = temp.monthRange[1] ? moment(temp.monthRange[1]).format('YYYYMM') : ''

          temp = omit(temp, 'monthRange')
        }

        return temp
      },
      async onClear() {
        this.form.resetFields()
        await this.onSubmit(null, this.params, this.options)
      },
      async onSearch(payload, options) {
        await this.$store.dispatch('setSearch', {
          moduleName: this.moduleName,
          submoduleName: this.submoduleName,
          isResetSelectedRows: true,
          additionalQueryParameters: {
            ...this.$route.query,
            // 获取子模块数据需要的额外参数，在引用该混合的子模块内覆盖设置。
            // 请根据参数的取值和性质自行决定在 data 内或 computed 内定义。
            ...(this.additionalQueryParameters || {})
          },
          isFetchList,
          ...options,
          payload
        })
      },
      /**
       * 查询
       * @param [e] {Event}
       * @param [params] {Object} 其他自定义参数
       * @param [options] {Object} 配置
       */
      onSubmit(e, params, options) {
        e?.preventDefault()

        if (typeof setParams === 'function') {
          this.params = {
            ...params,
            ...setParams.call(this)
          }
        } else {
          this.params = params
        }

        if (typeof setOptions === 'function') {
          this.options = {
            ...options,
            ...setOptions.call(this)
          }
        } else {
          this.options = options
        }

        this.form.validateFields(async (err, values) => {
          if (!err) {
            const payload = this.transformValue(values)

            await this.onSearch({ ...payload, ...this.params }, this.options)
          }
        })
      },
      onTreeFold() {
        this.treeCollapsed = !this.treeCollapsed
      }
    },
    render() {
      return (
        <Form
          layout="inline"
          onSubmit={this.onSubmit}
          colon={false}
          class={`tg-inquiry${this.treeCollapsed ? ' tg-inquiry-side-toggle-reverse' : ''}`}
        >
          {this.extraContent}
          {this.content}
        </Form>
      )
    }
  }
}

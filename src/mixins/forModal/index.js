/**
 * 弹窗混合 依赖 forIndex。注意如果弹窗内存在列表，一定要将弹窗注册成为子模块，这是为了不和页面的主列表数据产生混淆
 * @Author: Omsber
 * @Email: xyzsyx@163.com
 * @Date: 2022-05-31 周二 17:39:54
 */

import forIndex from '@/mixins/forIndex'

/**
 * 获取详情回调函数的返回值
 * @typedef FetchDetailsFnReturn
 * @global
 * @property {boolean} [express] - 请求详细信息的条件表达式，当条件满足时才执行请求（比如判断该弹窗是“新增”还是“编辑”模式。默认表达式：!!this.currentItem.id）
 * @property {Object} params - 请求详细信息接口的请求参数。
 * @property {string} [customApiName] - 自定义请求详情数据的接口。默认为当前页面的详情接口，具体拼接逻辑请参考全局 actions/getDetails
 */
/**
 * @param [customModuleName] {string} 使混入的组件连接到其他store模块
 * @param [fetchDetailsFn] {() => FetchDetailsFnReturn} 请求本页列表某一项数据详细信息的配置函数。<br>
 * 注意，可以在回调函数内使用 this 关键字，此时请不要使用箭头函数。<br>
 * 请求得到的数据会被合并到本页面对应模块的 store.state.currentItem 对象内。<br>
 * 一般用在编辑弹窗内，请求详细信息的接口请在 apis 文件夹下对应模块内定义，定义规则请参考 全局 action： getDetails
 * @returns {Object}
 */
export default ({ customModuleName, fetchDetailsFn } = {}) => {
  const mixinForModal = {
    inject: {
      moduleName: { default: '' },
      submoduleName: { default: '' }
    },
    mixins: [forIndex],
    props: {
      /**
       * 标题（可定义占位符）
       * “{action}” 为占位符，稍后会在 mixin 中替换为对应的字符，比如“新增”、“编辑”
       */
      modalTitle: {
        type: String,
        default: '{action}'
      },
      /**
       * 控制弹窗显示的字段
       */
      visibilityFieldName: {
        type: String,
        default: ''
      },
      /**
       * 在弹窗初始化阶段不清空 store 内存储的详情数据（如果 details 字段存在于 store 内）
       */
      notClear: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        inModal: true,
        modalProps: {
          // 全局组件 DragModal 内的表单加载状态，该属性不会传递给Antd vue Modal组件
          loading: false,
          visible: false,
          title: '',
          okText: '提交',
          maskClosable: false,
          confirmLoading: false,
          width: 600,
          style: {
            overflow: 'auto'
            // maxHeight: 'calc(90vh - 100px)'
          }
        }
      }
    },
    computed: {
      loading() {
        return this.$store.state[this.moduleName].loadingDetails
      },
      currentItem() {
        return this.$store.state[this.moduleName].currentItem
      },
      selectedRowKeys() {
        return this.$store.state[this.moduleName].selectedRowKeys
      },
      details() {
        return this.$store.state[this.moduleName].details
      },
      _visibilityFieldName() {
        return this.$parent.$attrs.visibilityFieldName || this.visibilityFieldName
      },
      visible() {
        return (
          this.$store.state[this.moduleName][this._visibilityFieldName] ??
          this.$store.state[this.moduleName][this.submoduleName][this._visibilityFieldName]
        )
      },
      attributes() {
        return {
          attrs: this.modalProps,
          on: { cancel: () => this.onCancel(this._visibilityFieldName) }
        }
      }
    },
    // 通知下层组件，当前处于弹窗中
    provide() {
      return { inModal: this.inModal }
    },
    watch: {
      visible: {
        immediate: true,
        async handler(value) {
          if (value) {
            this.modalProps.title = this.$parent.$attrs.modalTitle || this.modalTitle

            // 如果存在未清空的详情数据，则清空
            if (this.details && !this.notClear) {
              this.$store.commit('setState', {
                value: {},
                moduleName: this.moduleName,
                stateName: 'details'
              })
            }

            if (typeof fetchDetailsFn === 'function') {
              const options = fetchDetailsFn.call(this)
              const express = 'express' in options ? options.express : !!this.currentItem.id

              if (express) {
                const res = await this.$store.dispatch('getDetails', {
                  moduleName: this.moduleName,
                  payload: options.params,
                  stateName: 'currentItem',
                  customApiName: options.customApiName,
                  merge: true
                })

                if (!res.status) {
                  // 进入弹窗，当获取详情数据失败时，关闭弹窗。避免出现接口返回无权限的情况下跳转到无权限页面而导致弹窗未关闭的情况，影响体验。
                  // 注意此处使用 forIndex 混合内的 _hideVisibilityOfModal 方法会导致弹窗关闭失败（该方法使用的dispatch方式），
                  // 所以一下代码代用 commit 的方式分别清空 currentItem 和关闭弹窗

                  this.$store.commit('setModalVisible', {
                    field: this.visibilityFieldName,
                    value: false,
                    moduleName: this.moduleName,
                    submoduleName: this.submoduleName
                  })

                  this.$store.commit('setCurrentItem', {
                    value: {},
                    moduleName: this.moduleName
                  })
                }
              }
            }
          }

          this.modalProps.visible = value
        }
      },
      loading() {
        this.modalProps.loading = this.loading
      }
    },
    methods: {
      /**
       * 取消/关闭 弹窗
       * @param [visibilityFieldName] {string|null} 对应store模块内控制该弹窗的字段名。默认为新增/编辑弹窗的字段名：visibilityOfEdit
       * @param [submoduleName] {string|null} 子模块名，必须通过参数传入（在需要时传入），否则会引起bug
       * @param [callback] {Function|null} 关闭后的回调函数
       * @param [isClearCurrentItem] {boolean} 是否清空currentItem数据，默认true
       * @returns {Promise<void>}
       */
      async onCancel(visibilityFieldName, submoduleName, callback, isClearCurrentItem) {
        if ('disabled' in (this.modalProps.okButtonProps?.props || {})) {
          this.modalProps.okButtonProps = {
            ...this.modalProps.okButtonProps,
            props: {
              ...this.modalProps.okButtonProps?.props,
              disabled: true
            }
          }
        }

        if (typeof callback === 'function') {
          callback()
        }

        await this._hideVisibilityOfModal(
          this._visibilityFieldName || visibilityFieldName,
          submoduleName,
          null,
          isClearCurrentItem
        )
      },
      /**
       * 为弹窗的按钮增加loading状态
       * @param callback {() => Promise<any>} 点击弹窗要执行的逻辑
       * @returns {Promise<void>}
       */
      async onConfirmLoading(callback) {
        this.modalProps.confirmLoading = true

        await callback?.()

        this.modalProps.confirmLoading = false
      }
    }
  }

  // 根据是否传递customModuleName来判断该混合是否需要重置moduleName（使用该 moduleName 把使用本混合的组件连接到其他store模块）
  if (!customModuleName) {
    mixinForModal.inject = ['moduleName']
  } else {
    mixinForModal.computed.moduleName = () => {
      return customModuleName
    }
  }

  return mixinForModal
}

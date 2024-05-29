/**
 * 通用混合，主要封装一些辅助函数
 * @Author: Omsber
 * @Email: xyzsyx@163.com
 * @Date: 2022-05-31 周二 17:25:55
 */

export default {
  computed: {
    pageTabs() {
      return this.$store.state['common'].pageTabs || []
    }
  },
  methods: {
    /**
     * 打开弹窗操作
     *  1、设置 currentItem 数据。（当前用于操作的数据）
     *  2、设置对应弹窗的可见性为true，弹窗的控制字段请对应store内定义的字段
     * @param [record] {Object} 当前用于操作的数据。编辑弹窗为回显数据，详情弹窗为详情数据，为假值时不会对当前的currentItem做任何改变
     * @param [visibilityFieldName] {string|null} 默认值为打开编辑弹窗的可见性控制字段：visibilityOfEdit
     * @param [moduleName] {string|null} 目标模块名，在一个模块内调用另外一个模块的 state 时，需要传递对应模块的 moduleName，默认本模块的 moduleName
     * @param [submoduleName] {string|null} 子模块模块名，依赖 moduleName
     * @param [merge] {boolean} 是否合并，默认false
     * @returns {Promise<void>}
     */
    async _setVisibilityOfModal(record, visibilityFieldName, submoduleName, moduleName, merge) {
      if (record) {
        await this.$store.dispatch('setCurrentItem', {
          value: record,
          moduleName: this.moduleName,
          merge
        })
      }

      await this.$store.dispatch('setModalVisible', {
        statusField: visibilityFieldName,
        statusValue: true,
        moduleName: moduleName || this.moduleName,
        // 子模块只能通过传参获取，不然会造成bug
        submoduleName
      })
    },
    /**
     * 关闭弹窗操作
     *  1、清空 currentItem 数据，可将 isClearCurrentItem 设置为 false 来跳过该步骤。
     *  2、设置对应弹窗的可见性为 false，弹窗的控制字段请对应 store 内定义的字段。
     * @param [visibilityFieldName] {string} 默认值为打开编辑弹窗的可见性控制字段：visibilityOfEdit
     * @param [moduleName] {string} 目标模块名，在一个模块内调用另外一个模块的 state 时，需要传递对应模块的 moduleName
     * @param [submoduleName] {string} 子模块模块名，依赖 moduleName
     * @param [isClearCurrentItem] {boolean} 是否清空 currentItem 数据，默认 true
     * @returns {Promise<void>}
     * @private
     */
    async _hideVisibilityOfModal(visibilityFieldName, submoduleName, moduleName, isClearCurrentItem = true) {
      moduleName = moduleName || this.moduleName

      if (Object.prototype.toString.call(this.$store.state[moduleName].currentItem) === '[object Object]') {
        if (isClearCurrentItem) {
          await this.$store.dispatch('setCurrentItem', {
            value: {},
            moduleName: this.moduleName
          })
        }
      }

      await this.$store.dispatch('setModalVisible', {
        statusField: visibilityFieldName,
        statusValue: false,
        moduleName,
        // 子模块只能通过传参获取，不然会造成bug
        submoduleName
      })
    },
    /**
     * 合并 store 模块内的 currentItem （当在弹窗内需要临时修改 currentItem 时使用）
     * @param payload
     * @param visibilityFieldName
     * @param [submoduleName]
     * @param [moduleName]
     * @returns {Promise<void>}
     * @private
     */
    async _mergeCurrentItem(payload, visibilityFieldName, submoduleName, moduleName) {
      await this._setVisibilityOfModal(payload, visibilityFieldName, submoduleName, moduleName, true)
    },
    /**
     * 关闭当前页面的 pageTab
     * @private
     */
    _closePageTab() {
      if (this.$config.enableTabPage) {
        this.$store.commit('setState', {
          value: this.pageTabs.filter(item => item.fullPath !== this.$route.fullPath),
          moduleName: 'common',
          stateName: 'pageTabs'
        })
      }
    },
    /**
     * 处理 moduleName 和 subModuleName
     * @param {'DISPATCH'|'COMMIT'} type - 处理数据的操作是 VUEX 的 DISPATCH 还是 COMMIT
     * @param {string} actionOrMutation - vuex action 名称 或者 vuex mutation 名称
     * @param {string} [moduleName] - 要执行 ACTION 的目标模块名
     * @param {boolean} [isOwnSubmodule] - 是否是目标 STORE 模块的子模块，默认 undefined，即没有子模块信息
     * @param {string} [submoduleName] - 子模块名称
     * @returns {{moduleName, submoduleName}}
     * @private
     */
    _injectModuleInfo(type, actionOrMutation, moduleName, isOwnSubmodule, submoduleName) {
      let _moduleName
      let _submoduleName

      if (typeof isOwnSubmodule === 'boolean') {
        if (isOwnSubmodule) {
          if (!this.submoduleName) {
            throw new Error(`${type}: ${actionOrMutation}，未检测到当前页面组件对应的数据模块的子模块，请确认！`)
          }

          _submoduleName = this.submoduleName
          _moduleName = this.moduleName

          if (submoduleName) {
            console.info(`${type}: ${actionOrMutation}，根据传递的参数（isOwnSubmodule: true）` +
              `可获取到本模块的子模块名称，传递的 ${submoduleName ? 'submoduleName' : ''} 参数将被忽略。`)
          }

          if (moduleName) {
            console.info(`${type}: ${actionOrMutation}，根据传递的参数（isOwnSubmodule: true）` +
              `可获取到本模块的名称，传递的 ${moduleName ? 'moduleName' : ''} 参数将被忽略。`)
          }
        } else {
          _moduleName = moduleName
          _submoduleName = submoduleName
        }
      } else {
        // 未传递 isOwnSubmodule 参数的情况下（即 isOwnSubmodule 为 undefined 时），子模块需要明确定义才会生效，
        // 以避免在获取非子模块数据（一般为在子模块内获取父模块数据）时被自动添加 “submoduleName” 属性。
        _moduleName = moduleName || this.moduleName
        _submoduleName = submoduleName
      }

      return { moduleName: _moduleName, submoduleName: _submoduleName }
    },
    /**
     * 简易封装 this.$store.dispatch 函数，
     * 以简化 moduleName 参数，现在在页面组件内获取对应模块内数据时，
     * 所有的 DISPATCH 都不必再传递该属性，
     * 但获取其他模块数据时，需要明确指定该属性。
     * @param {string} action - vuex action
     * @param {string} [moduleName] - 要执行 ACTION 的目标模块名
     * @param {boolean} [isOwnSubmodule] - 是否是目标 STORE 模块的子模块，默认 undefined，即没有子模块信息
     * @param {string} [submoduleName] - 子模块名称
     * @param {Object} params - 其他调用该 ACTION 需要的参数
     * @returns {Promise<any>}
     */
    async dispatch(action, {
      moduleName,
      isOwnSubmodule,
      submoduleName,
      ...params
    }) {
      return await this.$store.dispatch(action, {
        ...this._injectModuleInfo('DISPATCH', action, moduleName, isOwnSubmodule, submoduleName),
        ...params
      })
    },
    /**
     * 简易封装 this.$store.commit 函数，
     * 以简化 moduleName 参数，现在在页面组件内获取对应模块内数据时，
     * 所有的 COMMIT 都不必再传递该属性，
     * 但获取其他模块数据时，需要明确指定该属性。
     * @param {string} mutation - vuex mutation
     * @param {string} [moduleName] - 要执行 MUTATION 的目标模块名
     * @param {boolean} [isOwnSubmodule] - 是否是目标 STORE 模块的子模块，默认 undefined，即没有子模块信息
     * @param {string} [submoduleName] - 子模块名称
     * @param {Object} params - 其他调用该 MUTATION 需要的参数
     */
    commit(mutation, {
      moduleName,
      isOwnSubmodule,
      submoduleName,
      ...params
    }) {
      this.$store.commit(mutation, {
        ...this._injectModuleInfo('COMMIT', mutation, moduleName, isOwnSubmodule, submoduleName),
        ...params
      })
    }
  }
}

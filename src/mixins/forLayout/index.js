/**
 * 布局混合
 * @Author: Omsber
 * @Email: xyzsyx@163.com
 * @Date: 2024-02-06 周二 10:59:39
 */

import { mapGetters } from 'vuex'
import { RouterView } from 'vue-router'
import { TGKeepAlive } from '@/components/TGRouterView'

export default {
  data() {
    return {cacheComponentName: ''}
  },
  computed: {
    ...mapGetters({getState: 'getState'}),
    /**
     * 提供左侧菜单折叠状态
     * @return {boolean}
     */
    collapsed() {
      return this.getState('collapsed', 'common')
    },
    /**
     * 当前缓存的页面名称（VUE 组件实例的 name 属性）
     * @return {string[]}
     */
    pageNames() {
      return this.getState('pageNames', 'common') || []
    },
    /**
     * 生成布局中的 RouterView 组件。
     *
     * 注意：所有布局组件（src/layouts/*）都应该使用此方法生成 RouterView，而不是使用 VueRouter 提供的同名组件。
     * 否则会导致一些内置的功能无法正常使用，如：页面缓存
     * @return {JSX.Element}
     * @constructor
     */
    getRouterView() {
      return (
        <TGKeepAlive include={this.pageNames} max={this.$config.keepAliveMaxCount}>
          <RouterView ref={'keepAlive'} key={this.$route.fullPath} />
        </TGKeepAlive>
      )
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler(value) {
        if (value.meta.keepAlive) {
          // 手动管理已经缓存的页面（vue组件实例的name属性），keep-alive的include属性
          this.$nextTick(this.setCurrentPageName)
        }
      }
    }
  },
  methods: {
    /**
     * 递归获取组件
     * @param {Vue.Element[]} components 当前页面组件或当前页面的父级 RouterView 组件集合
     * @param {boolean} [isLikeParentOfTargetComponent=true] 是否可能是目标组件的父级 RouterView 组件（外部调用一般传递为 true）
     * @return {Vue.Element|undefined}
     * @private
     */
    _getComponent(components, isLikeParentOfTargetComponent = true) {
      // 清空缓存值
      if (isLikeParentOfTargetComponent) {
        this.cacheComponentName = ''
      }

      let _component

      for (const component of components) {
        // 组件中存在 _routerViewCache 时，证明该组件为 RouterView 组件，其子级可能为 RouterView 组件，也可能为页面组件
        const _cacheComponentName = component._routerViewCache?.default.component.name

        // 如果缓存对象保存的组件指向 TGRouterView，则直接筛选子级的所有 TGRouterView 组件作为下级遍历对象，明确跳过其他组件
        if (_cacheComponentName === 'TGRouterView') {
          _component = this._getComponent(
            component.$children.filter(children => children.$vnode.tag.includes('TGRouterView')),
            true
          )
        } else {
          if (_cacheComponentName && !this.cacheComponentName) {
            this.cacheComponentName = _cacheComponentName
          }

          // 存在 moduleName 属性时，则为页面组件。页面组件中的 moduleName 的注入逻辑见 src/mixins/dynamicState。
          if (component.moduleName) {
            const _moduleName = `${component.moduleName.charAt(0).toUpperCase()}${component.moduleName.slice(1)}`

            if (!this.cacheComponentName || this.cacheComponentName === _moduleName) {
              _component = component
              break
            }
          } else {
            // 次级菜单
            _component = this._getComponent(component.$children, _cacheComponentName === 'TGRouterView')
          }
        }
      }

      return _component
    },
    /**
     * 保存当前页面组件的 name 属性
     */
    setCurrentPageName() {
      const component = this._getComponent([this.$refs['keepAlive']])

      if (component?.$options.name && !this.pageNames.includes(component.$options.name)) {
        this.$store.commit('common/setPageNames', this.pageNames.concat(component.$options.name))
      }
    }
  }
}

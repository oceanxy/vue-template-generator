import './assets/index.scss'
import { mapGetters } from 'vuex'
import TGContainerWithSider from '@/components/TGContainerWithSider'
import { Empty, Spin, Tree } from 'ant-design-vue'
import dynamicState from '@/mixins/dynamicState'

export default {
  inject: ['moduleName'],
  mixins: [
    // 仅注册 system 模块
    dynamicState({
      customModuleName: 'system',
      isRequestData: false
    })
  ],
  props: {
    contentClass: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    menuTree() {
      return this.getState('menuTree', 'system')
    },
    currentMenuId() {
      return this.getState('currentMenuId', 'system')
    }
  },
  async created() {
    await Promise.all([
      this.$store.dispatch('getListForSelect', {
        moduleName: 'system',
        stateName: 'menuTree',
        customApiName: 'getSystemMenuTree'
      }),
      this.setCurrentMenuId('')
    ])
  },
  async destroyed() {
    await this.setCurrentMenuId('')
  },
  methods: {
    /**
     * antd vue Tree 组件的 select 事件回调
     * @param selectedKeys {array} 当前选中的 keys
     * @param selected {boolean} 当前是否有被选中的结点
     */
    async onSelect(selectedKeys, { selected }) {
      if (selected) {
        await this.setCurrentMenuId(selectedKeys[0])
      } else {
        await this.setCurrentMenuId('')
      }
    },
    async setCurrentMenuId(menuId) {
      await this.$store.dispatch('system/setCurrentMenuId', {
        moduleName: this.moduleName,
        value: menuId
      })
    }
  },
  render() {
    return (
      <TGContainerWithSider
        class="bn-system-container"
        siderClass="bn-system-sider-container"
        contentClass={`bn-system-content-container${this.contentClass ? ` ${this.contentClass}` : ''}`}
        siderOnLeft
        showSiderTrigger
      >
        <template slot="default">{this.$slots.default}</template>
        <Spin
          slot={'sider'}
          class="bnm-system-sider"
          spinning={this.menuTree.loading}
        >
          {
            this.menuTree.list?.length ? (
              <Tree
                selectedKeys={[this.currentMenuId]}
                replaceFields={{
                  children: 'children',
                  title: 'name',
                  key: 'id'
                }}
                treeData={this.menuTree.list}
                onSelect={this.onSelect}
                defaultExpandedKeys={[
                  this.currentMenuId,
                  this.menuTree.list?.[0].id,
                  this.menuTree.list?.[0].children?.[0].id
                ]}
                showLine
              />
            ) : <Empty />
          }

        </Spin>
      </TGContainerWithSider>
    )
  }
}

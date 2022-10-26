import './index.scss'
import { mapGetters } from 'vuex'
import { dispatch } from '@/utils/store'
import { Empty, Spin, Tree } from 'ant-design-vue'
import TGContainerWithSider from '@/components/TGContainerWithSider'

export default {
  inject: ['moduleName'],
  props: {
    contentClass: {
      type: String,
      default: ''
    }
  },
  data() {
    return { loading: true, tableRef: undefined }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    sideFloorTree() {
      return this.getState('sideFloorTree', 'common') || []
    },
    currentParkTreeKeySelected() {
      return this.getState('currentParkTreeKeySelected', 'common') || []
    },
    treeId() {
      return this.getState('userInfo', 'login').parkId
    }
  },
  provide() {
    return {
      getRefOfChild: ref => {
        this.tableRef = ref
      }
    }
  },
  async created() {
    // 将登录信息的treeId作为树的默认值
    await this.setCurrentParkTreeKeySelected(this.treeId, false)

    this.loading = true
    await dispatch('common', 'getSideFloorTree')
    this.loading = false
  },
  methods: {
    /**
     * antd vue Tree 组件的 select 事件回调
     * @param selectedKeys {array} 当前选中的 keys
     * @param selected {boolean} 当前是否有被选中的结点
     */
    async onSelect(selectedKeys, { selected }) {
      if (selected) {
        await this.setCurrentParkTreeKeySelected(selectedKeys[0])
      } else {
        await this.setCurrentParkTreeKeySelected(this.treeId)
      }
    },
    async setCurrentParkTreeKeySelected(value, isFetchList) {
      if (value !== this.currentParkTreeKeySelected) {
        await this.$store.dispatch('common/setCurrentParkTreeKeySelected', {
          moduleName: this.moduleName,
          submoduleName: this.submoduleName,
          payload: { value, isFetchList }
        })
      }
    },
    onSidebarSwitch() {
      this.tableRef?.$parent?.resize()
    }
  },
  render() {
    return (
      <TGContainerWithSider
        class="bn-park-container"
        siderClass="bn-park-sider-container"
        contentClass={`bn-park-content-container${this.contentClass ? ` ${this.contentClass}` : ''}`}
        siderOnLeft
        showSiderTrigger
        onSidebarSwitch={this.onSidebarSwitch}
      >
        <template slot="default">{this.$slots.default}</template>
        <Spin
          slot={'sider'}
          class="bnm-park-sider"
          spinning={this.loading}
        >
          {
            this.sideFloorTree?.length ? (
              <Tree
                selectedKeys={[this.currentParkTreeKeySelected]}
                replaceFields={{
                  children: 'children',
                  title: 'name',
                  key: 'id'
                }}
                treeData={this.sideFloorTree}
                onSelect={this.onSelect}
                defaultExpandedKeys={[this.treeId, this.sideFloorTree[0]?.children?.[0]?.id]}
                showLine
              />
            ) : <Empty />
          }
        </Spin>
      </TGContainerWithSider>
    )
  }
}

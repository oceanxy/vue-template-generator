import './index.scss'
import { mapGetters } from 'vuex'
import { Empty, Spin, Tree } from 'ant-design-vue'
import TGContainerWithSider from '@/components/TGContainerWithSider'

export default {
  inject: ['moduleName'],
  props: {
    contentClass: {
      type: String,
      default: ''
    },
    /**
     * 侧边栏树所在页面的列表的请求数据相关的配置
     *  apiOptions.apiName: 请求api的名称,
     *  apiOptions.stateName: 存放用于渲染树的数据的字段名,
     *  apiOptions.moduleName: 存放用于渲染树的数据的模块名
     */
    apiOptions: {
      type: Object,
      required: true
    },
    /**
     * 传给侧边栏树所在页面的列表的查询参数，默认：“treeId”
     */
    treeIdField: {
      type: String,
      default: 'treeId'
    },
    /**
     * 默认展开的树节点ID
     * 初始值为：children[0].id 和 children[0].children[0].id
     */
    defaultExpandedKeys: {
      type: Array,
      default: () => []
    },
    /**
     * 非空模式，默认关闭
     * 开启后，当树没有选中值时（即selectedKeys为空数组时），自动选中树的最顶层菜单
     */
    notNoneMode: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return { tableRef: undefined }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    dataSource() {
      return this.getState(this.apiOptions.stateName, this.apiOptions.moduleName)
    },
    treeId() {
      return [this.getState('search', this.moduleName)[this.treeIdField]]
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
    const status = await this.$store.dispatch('getListForSelect', {
      moduleName: this.apiOptions.moduleName,
      stateName: this.apiOptions.stateName,
      customApiName: this.apiOptions.apiName
    })

    if (status && this.notNoneMode) {
      this.$store.commit('setSearch', {
        payload: { [this.treeIdField]: this.dataSource.list?.[0]?.id },
        moduleName: this.moduleName
      })
    }
  },
  methods: {
    /**
     * antd vue Tree 组件的 select 事件回调
     * @param selectedKeys {array} 当前选中的 keys
     * @param selected {boolean} 当前是否有被选中的结点
     */
    async onSelect(selectedKeys, { selected }) {
      const payload = {}

      if (selected) {
        payload[this.treeIdField] = selectedKeys[0]
      } else {
        payload[this.treeIdField] = this.notNoneMode ? this.dataSource.list?.[0]?.id : ''
      }

      if (payload[this.treeIdField] !== this.treeId[0]) {
        await this.$store.dispatch('setSearch', {
          moduleName: this.moduleName,
          payload
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
          spinning={this.dataSource.loading}
        >
          {
            this.dataSource.list?.length ? (
              <Tree
                selectedKeys={this.treeId}
                replaceFields={{
                  children: 'children',
                  title: 'name',
                  key: 'id'
                }}
                treeData={this.dataSource.list}
                onSelect={this.onSelect}
                defaultExpandedKeys={[
                  this.dataSource.list?.[0]?.id,
                  this.dataSource.list?.[0]?.children?.[0]?.id,
                  ...this.defaultExpandedKeys
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

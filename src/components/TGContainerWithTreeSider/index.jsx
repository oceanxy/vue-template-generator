import './assets/styles/index.scss'
import { mapGetters } from 'vuex'
import { Empty, Icon, Input, Spin, Tree } from 'ant-design-vue'
import TGContainerWithSider from '@/components/TGContainerWithSider'
import TGBreadcrumb from '@/layouts/components/TGBreadcrumb'
import ICON_TREE_DISTRICT from './assets/images/tree-district.svg'
import ICON_TREE_STREET from './assets/images/tree-street.svg'
import ICON_TREE_SCHOOL from './assets/images/tree-school.svg'
import { cloneDeep, debounce } from 'lodash'

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
    return {
      tableRef: undefined,
      searchValue: '',
      treeDataSource: []
    }
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
  watch: {
    dataSource: {
      deep: true,
      handler(value) {
        this.treeDataSource = value.list
      }
    },
    searchValue(value) {
      const newTreeDataSource = cloneDeep(this.dataSource.list)

      this.treeDataSource = this.filter(newTreeDataSource, value)

      console.log(this.treeDataSource)
    }
  },
  methods: {
    filter(dataSource, searchValue) {
      const temp = []

      for (let i = 0; i < dataSource.length; i++) {
        if (dataSource[i].isParent && dataSource[i].children?.length) {
          dataSource[i].children = this.filter(dataSource[i].children, searchValue)

          if (dataSource[i].children.length) {
            temp.push(dataSource[i])
          }
        } else {
          if (dataSource[i].name.includes(searchValue)) {
            // dataSource[i].dom = (
            //   <span
            //     domPropsInnerHTML={
            //       dataSource[i].name.replace(
            //         this.searchValue,
            //         `<span style="color: #16b364">${this.searchValue}</span>`
            //       )
            //     }
            //   />
            // )

            temp.push(dataSource[i])
          }
        }
      }

      return temp
    },
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
    },
    onTreeSearch(e) {
      this.searchValue = e.target.value
    }
  },
  render() {
    return (
      <TGContainerWithSider
        class="fe-tree-container"
        siderClass="fe-tree-sider-container"
        contentClass={`fe-tree-content-container${this.contentClass ? ` ${this.contentClass}` : ''}`}
        siderOnLeft
        showSiderTrigger
        onSidebarSwitch={this.onSidebarSwitch}
      >
        <template slot="default">
          {this.$route.meta.hideBreadCrumb ? null : <TGBreadcrumb />}
          {this.$slots.default}
        </template>
        <div slot={'sider'} class="fe-tree-data">
          <Input
            prefix={<Icon type={'search'} style={{ fontSize: '16px' }} />}
            placeholder={'请输入学校名称'}
            onChange={debounce(this.onTreeSearch, 300)}
          />
          <Spin spinning={this.dataSource.loading}>
            {
              this.treeDataSource?.length ? (
                <Tree
                  showLine
                  showIcon
                  selectedKeys={this.treeId}
                  onSelect={this.onSelect}
                  defaultExpandedKeys={[
                    this.treeDataSource?.[0]?.id,
                    this.treeDataSource?.[0]?.children?.[0]?.id,
                    ...this.defaultExpandedKeys
                  ]}
                >
                  {
                    this.treeDataSource.map(item => (
                      <Tree.TreeNode
                        key={item.id}
                        title={`${item.name}（${item.children.length})`}
                      >
                        <Icon slot={'icon'} class={'icon'} component={ICON_TREE_DISTRICT} />
                        <div slot={'title'}>{item.name}</div>
                        {
                          item.children?.map(subItem => (
                            <Tree.TreeNode
                              key={subItem.id}
                              title={`${subItem.name}（${subItem.children.length})`}
                            >
                              <Icon slot={'icon'} class={'icon'} component={ICON_TREE_STREET} />
                              <div slot={'title'}>{subItem.name}</div>
                              {
                                subItem.children?.map(leafItem => (
                                  <Tree.TreeNode key={leafItem.id} title={leafItem.name}>
                                    <Icon slot={'icon'} class={'icon'} component={ICON_TREE_SCHOOL} />
                                    <div slot={'title'}>{leafItem.name}</div>
                                  </Tree.TreeNode>
                                )) ?? []
                              }
                            </Tree.TreeNode>
                          )) ?? []
                        }
                      </Tree.TreeNode>
                    ))
                  }
                </Tree>
              ) : <Empty />
            }
          </Spin>
        </div>
      </TGContainerWithSider>
    )
  }
}

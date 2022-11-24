import './assets/styles/index.scss'
import { mapGetters } from 'vuex'
import { Empty, Icon, Input, Spin, Tree } from 'ant-design-vue'
import TGContainerWithSider from '@/components/TGContainerWithSider'
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
     * 获取侧边栏树的数据的相关配置
     *  apiOptions.apiName: API名称
     *  apiOptions.moduleName: 存放树的数据的模块名，默认树所在页面对应的模块
     *  apiOptions.stateName: 存放树的数据的字段名
     */
    apiOptions: {
      type: Object,
      required: true
    },
    /**
     * 获取侧边栏树所在页面的列表数据的相关配置（具体配置见 store.actions.getList）
     *  optionsOfGetList.apiName: API名称
     *  optionsOfGetList.moduleName: 存放树的数据的模块名
     *  optionsOfGetList.stateName: 存放树的数据的字段名
     *  optionsOfGetList.isFetchList: 树初始化后是否触发所在页面列表请求数据，依赖 notNoneMode
     */
    optionsOfGetList: {
      type: Object,
      default: () => ({})
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
     * 非空模式，默认关闭，不选中任何一级
     * 开启后，当树没有选中值时（即selectedKeys为空数组时），自动选中树的最顶层菜单，然后触发所在页面的列表获取数据。
     *  如果树所在页面的列表请求数据接口需要其他必填参数，而树不能提供的，请在设置 optionsOfGetList.isFetchList 为 false
     */
    notNoneMode: {
      type: Boolean,
      default: false
    },
    /**
     * 选中树后用于搜索列表的字段名，默认 'treeId'
     */
    getFieldNameForTreeId: {
      type: Function,
      default: () => 'treeId'
    },
    /**
     * 搜索框提示文本
     */
    placeholder: {
      type: String,
      default: '请输入关键字搜索'
    }
  },
  data() {
    return {
      tableRef: undefined,
      searchValue: '',
      treeDataSource: [],
      manualExpandedKeys: [],
      // 上一次设置的用于保存树选中值的字段名
      // （通常用于 this.treeIdField 会发生变化的时候。如点击树的不同层级，传递的字段名不一样的情况）
      oldTreeIdField: ''
    }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    dataSource() {
      return this.getState(this.apiOptions.stateName, this.apiOptions.moduleName || this.moduleName)
    },
    treeIdField() {
      return this.getState('treeIdField', this.moduleName)
    },
    treeId() {
      return [this.getState('search', this.moduleName)[this.treeIdField]]
    },
    expandedKeys() {
      if (this.searchValue) {
        if (!this.manualExpandedKeys.length) {
          const firstLevelExpandedKeys = this.treeDataSource?.map(item => item.id) ?? []
          const secondLevelExpandedKeys = this.treeDataSource?.[0]?.children?.map(item => item.id) ?? []

          return [...firstLevelExpandedKeys, ...secondLevelExpandedKeys]
        } else {
          return this.manualExpandedKeys
        }
      }

      if (this.manualExpandedKeys.length) {
        return this.manualExpandedKeys
      }

      return [
        this.treeDataSource?.[0]?.id,
        this.treeDataSource?.[0]?.children?.[0]?.id,
        ...this.defaultExpandedKeys,
        ...this.manualExpandedKeys
      ]
    }
  },
  provide() {
    return {
      getRefOfChild: ref => {
        this.tableRef = ref
      },
      /**
       * 通知下层组件在初始化阶段是否自动请求数据。依赖 this.notNoneMode
       *  false：本组件不控制下层组件在组件创建阶段（created 生命周期）的数据请求，默认
       *  true：下层组件在创建阶段不请求数据
       */
      notInitList: this.notNoneMode || !this.optionsOfGetList.isFetchList
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
    }
  },
  async created() {
    const status = await this.$store.dispatch('getListWithLoadingStatus', {
      moduleName: this.apiOptions.moduleName || this.moduleName,
      stateName: this.apiOptions.stateName,
      customApiName: this.apiOptions.apiName
    })

    if (status && this.notNoneMode) {
      const treeIdField = this.getFieldNameForTreeId(1)

      // 更新 store.state 里面用于树ID的键名（主要用于每一级树的所使用的键名不同时）
      this.$store.commit('setState', {
        value: treeIdField,
        moduleName: this.moduleName,
        stateName: 'treeIdField'
      })

      this.oldTreeIdField = treeIdField

      await this.$store.dispatch('setSearch', {
        payload: { [this.treeIdField]: this.dataSource.list?.[0]?.id },
        moduleName: this.moduleName,
        ...this.optionsOfGetList,
        isFetchList: (!('isFetchList' in this.optionsOfGetList) || this.optionsOfGetList.isFetchList)
      })
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
            temp.push(dataSource[i])
          }
        }
      }

      return temp
    },
    /**
     * antd vue Tree 组件的 select 事件回调
     * @param selectedKeys {array} 当前选中的 keys
     * @param e {Object} 当前是否有被选中的结点
     */
    async onSelect(selectedKeys, e) {
      const payload = {}
      const treeIdField = this.getFieldNameForTreeId(e.node.pos.split('-').length - 1)

      if (this.oldTreeIdField !== treeIdField) {
        // 清空search内上一次树操作的键与值
        this.$store.commit('setSearch', {
          payload: { [this.oldTreeIdField]: undefined },
          moduleName: this.moduleName,
          ...this.optionsOfGetList
        })

        // 更新对应 store 模块内 treeIdField 字段的值
        this.$store.commit('setState', {
          value: treeIdField,
          moduleName: this.moduleName,
          stateName: 'treeIdField'
        })

        this.oldTreeIdField = treeIdField
      }

      if (e.selected) {
        payload[this.treeIdField] = selectedKeys[0]
      } else {
        payload[this.treeIdField] = this.notNoneMode ? this.dataSource.list?.[0]?.id : ''
      }

      if (payload[this.treeIdField] !== this.treeId[0]) {
        await this.$store.dispatch('setSearch', {
          payload,
          moduleName: this.moduleName,
          ...this.optionsOfGetList
        })
      }
    },
    onSidebarSwitch() {
      this.tableRef?.$parent?.resize()
    },
    onTreeSearch(e) {
      this.manualExpandedKeys = []
      this.searchValue = e.target.value
    },
    onExpand(expandedKeys) {
      this.manualExpandedKeys = expandedKeys
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
        {this.$slots.default}
        <div slot={'sider'} class="fe-tree-data">
          <Input
            prefix={<Icon type={'search'} style={{ fontSize: '16px' }} />}
            placeholder={this.placeholder}
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
                  expandedKeys={this.expandedKeys}
                  onExpand={this.onExpand}
                >
                  {
                    this.treeDataSource.map(item => (
                      <Tree.TreeNode
                        key={item.id}
                        title={`${item.name}（${item?.children?.length})`}
                      >
                        <Icon slot={'icon'} class={'icon'} component={ICON_TREE_DISTRICT} />
                        <div slot={'title'}>{item.name}</div>
                        {
                          item?.children?.map(subItem => (
                            <Tree.TreeNode
                              key={subItem.id}
                              title={`${subItem.name}${subItem.children ? `(${subItem.children.length})` : ''}`}
                            >
                              <Icon slot={'icon'} class={'icon'} component={ICON_TREE_STREET} />
                              <div slot={'title'}>{subItem.name}</div>
                              {
                                subItem?.children?.map(leafItem => (
                                  <Tree.TreeNode key={leafItem.id}>
                                    <Icon slot={'icon'} class={'icon'} component={ICON_TREE_SCHOOL} />
                                    {
                                      this.searchValue
                                        ? (
                                          <span
                                            slot={'title'}
                                            title={leafItem.name}
                                            domPropsInnerHTML={
                                              leafItem.name.replace(
                                                this.searchValue,
                                                `<span style="color: #16b364">${this.searchValue}</span>`
                                              )
                                            }
                                          />
                                        )
                                        : <span slot={'title'} title={leafItem.name}>{leafItem.name}</span>
                                    }
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

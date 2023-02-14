import './assets/styles/index.scss'
import { mapGetters } from 'vuex'
import { Empty, Icon, Input, Spin, Tree } from 'ant-design-vue'
import TGContainerWithSider from '@/components/TGContainerWithSider'
import { cloneDeep, debounce } from 'lodash'

export default {
  inject: ['moduleName'],
  props: {
    /**
     * 获取自定义图标
     * @params treeNode {Tree.TreeNode} 树节点
     * @returns Icon.component 控制如何渲染图标，通常是一个渲染根标签为 <svg> 的 Vue 组件，会使 type 属性失效
     */
    getCustomIcon: {
      type: Function,
      default: undefined
    },
    /**
     * 内容区额外样式表名
     */
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
     * 非空模式（notNoneMode 为 true）下生效，所以务必配合 notNoneMode 使用。
     *  optionsOfGetList.apiName: API名称
     *  optionsOfGetList.moduleName: 存放树的数据的模块名
     *  optionsOfGetList.stateName: 存放树的数据的字段名
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
     */
    notNoneMode: {
      type: Boolean,
      default: false
    },
    /**
     * 选中树后用于搜索列表的字段名，默认 'treeId'，后期改为 'parentId'
     * @param hierarchy {number} 树节点层级
     * @returns {string}
     */
    getFieldNameForTreeId: {
      type: Function,
      default: hierarchy => 'treeId'
    },
    /**
     * 向树所在页面的 Table 组件注入搜索参数。注入到 store.state.search 对象。
     * 一般的树不需要此操作，紧紧使用 getFieldNameForTreeId 参数即可，但是在某些特殊场景，
     * 比如在操作树时需要传递多个字段给查询接口时，可以使用该字段来设置多余的参数。
     * @param dataSource {Object} 用于渲染树节点的数据对象
     * @returns {Object} 需要合并注入到 search 的对象
     */
    injectSearchParamsOfTable: {
      type: Function,
      default: dataSource => ({})
    },
    /**
     * 搜索框提示文本
     */
    placeholder: {
      type: String,
      default: '请输入关键字搜索'
    },
    /**
     * 用于触发树更新的 action 集合。
     * 监听本组件所在页面的所有 action，当设定的 action 被触发时，则触发树更新。通常用在页面列表数据和树数据需要保持同步的场景。
     */
    actionsForUpdateTree: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      tableRef: undefined,
      status: false,
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
       * 通知下层组件在初始化阶段是否自动请求数据。依赖 this.notNoneMode。
       *  false：本组件不控制下层组件在组件创建阶段（created 生命周期）的数据请求，默认;
       *  true：下层组件在创建阶段不请求数据
       */
      notInitList: this.notNoneMode
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
  async mounted() {
    this.status = await this.getTree()

    // 订阅指定的 actions。当本页面指定的 action 被触发后，更新树。
    if (this.actionsForUpdateTree.length) {
      this.$store.subscribeAction({
        after: async action => {
          if (action.payload?.moduleName === this.moduleName && this.actionsForUpdateTree.includes(action.type)) {
            await this.getTree()
          }
        }
      })
    }

    if (this.status) {
      const treeIdField = this.getFieldNameForTreeId(1)

      // 更新 store.state 里面用于树ID的键名（主要适配每一级树所使用的键名不同的情况）
      this.$store.commit('setState', {
        value: treeIdField,
        moduleName: this.moduleName,
        stateName: 'treeIdField'
      })

      this.oldTreeIdField = treeIdField

      // 非空模式下执行
      if (this.notNoneMode) {
        // 为了保证其他组件完成对 search 参数的注入（如果有，比如 inquiry 组件需要向 store.state.search 注入必传参数时），
        // 尽量保证本组件触发页面列表数据查询的时间延后。
        // （注意 VUE 的生命周期顺序：父级组件的 mounted 在所有子级组件 mounted 后才会执行）
        this.$nextTick(async () => {
          await this.$store.dispatch('setSearch', {
            payload: {
              ...this.injectSearchParamsOfTable(this.dataSource.list?.[0] ?? {}), // 获取额外请求参数
              [this.treeIdField]: this.dataSource.list?.[0]?.id, // 获取树ID
              ...this.$route.query, // 获取地址栏的值
              /* #1 （一个书签，与本组件 #2 书签配合） */
              ...this.$route.params // 获取清空 query 后，通过 route.params 传递的参数。
            },
            moduleName: this.moduleName,
            isResetSelectedRows: true,
            ...this.optionsOfGetList
          })
        })
      }
    }
  },
  async beforeDestroy() {
    // 退出页面前先清空搜索参数，避免下次进页面时参数错乱
    await this.$store.dispatch('setSearch', {
      payload: {
        ...this.injectSearchParamsOfTable({}),
        [this.treeIdField]: ''
      },
      moduleName: this.moduleName,
      isFetchList: false
    })
  },
  methods: {
    async getTree() {
      return await this.$store.dispatch('getListWithLoadingStatus', {
        moduleName: this.apiOptions.moduleName || this.moduleName,
        stateName: this.apiOptions.stateName,
        customApiName: this.apiOptions.apiName
      })
    },
    /**
     * 按条件筛选包含关键字的所有项（包含层级关系）
     * @param dataSource {Array} 搜索源
     * @param searchValue {string} 搜索关键字
     * @returns {*[]}
     */
    filter(dataSource, searchValue) {
      const temp = []

      for (const item of dataSource) {
        if (item.name.includes(searchValue)) {
          temp.push(item)
        } else if (item.isParent && item.children?.length) {
          item.children = this.filter(item.children, searchValue)

          if (item.children.length) {
            temp.push(item)
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
      if (Object.keys(this.$route.query).length) {
        /* #2 （一个书签，与本组件的 #1 配合） */
        // 手动选择菜单后，清空地址栏的参数
        await this.$router.push({
          query: {},
          params: {
            ...this.injectSearchParamsOfTable(e.node.$attrs.dataSource), // 获取额外请求参数
            [this.treeIdField]: selectedKeys[0] // 获取树ID
          }
        })
      } else {
        let payload
        let treeIdField

        if (e.selected) {
          treeIdField = this.getFieldNameForTreeId(e.node.pos.split('-').length - 1)
        } else {
          treeIdField = this.notNoneMode ? this.getFieldNameForTreeId(1) : ''
        }

        if (this.oldTreeIdField !== treeIdField) {
          // 清空search内上一次树操作的键与值
          if (this.oldTreeIdField) {
            this.$store.commit('setSearch', {
              payload: {
                ...this.injectSearchParamsOfTable({}),
                [this.oldTreeIdField]: undefined
              },
              moduleName: this.moduleName,
              ...this.optionsOfGetList
            })
          }

          // 更新对应 store 模块内 treeIdField 字段的值
          this.$store.commit('setState', {
            value: treeIdField,
            moduleName: this.moduleName,
            stateName: 'treeIdField'
          })

          this.oldTreeIdField = treeIdField
        }

        if (e.selected) {
          payload = {
            ...this.injectSearchParamsOfTable(e.node.$attrs.dataSource),
            [this.treeIdField]: selectedKeys[0]
          }
        } else {
          if (this.treeIdField) {
            payload = {
              ...this.injectSearchParamsOfTable(this.notNoneMode ? this.dataSource.list?.[0] : {}),
              [this.treeIdField]: this.notNoneMode ? this.dataSource.list?.[0]?.id : ''
            }
          }
        }

        if (this.treeIdField && payload[this.treeIdField] !== this.treeId[0]) {
          await this.$store.dispatch('setSearch', {
            payload,
            moduleName: this.moduleName,
            isResetSelectedRows: true,
            ...this.optionsOfGetList
          })
        }
      }
    },
    /**
     * 高亮树节点名称中的搜索关键字
     * @param treeNode {TreeNode} ant-design-vue TreeNode
     * @returns {JSX.Element}
     */
    highlight(treeNode) {
      const childrenNumber = treeNode.isParent ? `(${treeNode.children?.length ?? 0})` : ''

      return this.searchValue
        ? (
          <span
            slot={'title'}
            title={treeNode.name + childrenNumber}
            domPropsInnerHTML={
              treeNode.name.replace(
                this.searchValue,
                `<span style="color: #16b364">${this.searchValue}</span>`
              ) + childrenNumber
            }
          />
        )
        : (
          <span
            slot={'title'}
            title={treeNode.name + childrenNumber}
          >
            {treeNode.name + childrenNumber}
          </span>
        )
    },
    getIcon(treeNode) {
      return Object.prototype.toString.call(this.getCustomIcon) === '[object Function]'
        ? this.getCustomIcon(treeNode)
        : treeNode.obj.menuIcon
          ? () => import(`@/layouts/components/TGMenu/assets/images/${treeNode.obj.menuIcon}.svg`)
          : undefined // todo 此处设置为默认图标
    },
    /**
     * 获取树节点集合（注意此处有递归）
     * @param dataSource {Array} 生成树节点的数据源
     * @returns {*|*[]}
     */
    getTreeNode(dataSource) {
      return dataSource?.map(item => (
        <Tree.TreeNode
          key={item.id}
          dataSource={item}
        >
          <Icon
            slot={'icon'}
            class={'icon'}
            component={this.getIcon(item)}
          />
          {this.highlight(item)}
          {
            Array.isArray(item?.children)
              ? this.getTreeNode(item.children)
              : null
          }
        </Tree.TreeNode>
      )) ?? []
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
        <div
          slot={'sider'}
          class="fe-tree-data"
        >
          <Input
            prefix={<Icon
              type={'search'}
              style={{ fontSize: '16px' }}
            />}
            placeholder={this.placeholder}
            onChange={debounce(this.onTreeSearch, 300)}
          />
          <Spin spinning={this.dataSource.loading}>
            {
              this.treeDataSource?.length
                ? (
                  <Tree
                    showLine
                    showIcon
                    selectedKeys={this.treeId}
                    onSelect={this.onSelect}
                    expandedKeys={this.expandedKeys}
                    onExpand={this.onExpand}
                  >
                    {this.getTreeNode(this.treeDataSource)}
                  </Tree>
                )
                : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            }
          </Spin>
        </div>
      </TGContainerWithSider>
    )
  }
}

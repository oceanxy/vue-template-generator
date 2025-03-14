import './assets/styles/index.scss'
import { Empty, Icon, Input, Spin, Tree } from 'ant-design-vue'
import { getFirstLetterOfEachWordOfAppName, sleep } from '@/utils/utilityFunction'
import TGContainerWithSider from '@/components/TGContainerWithSider'
import { cloneDeep, debounce } from 'lodash'

export default {
  name: 'TGContainerWithTreeSider',
  inject: ['moduleName'],
  props: {
    /**
     * 获取自定义图标
     * @param treeNode {Tree.TreeNode} 树节点
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
     * 默认展开所有层级的第一个子节点
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
     * 一般的树不需要此操作，仅使用 getFieldNameForTreeId 参数即可，但是在某些特殊场景，
     * 比如在操作树时需要传递多个字段给查询接口时，可以使用该prop来配置其余参数。
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
    },
    /**
     * 替换 treeNode 中 title,key,children 字段为 treeData 中对应的字段。
     * 参考 https://1x.antdv.com/components/tree-cn/#API
     */
    replaceFields: {
      type: Object,
      default: () => ({
        children: 'children',
        title: 'name',
        key: 'id',
        value: 'id'
      })
    }
  },
  data() {
    return {
      tableRef: undefined,
      status: false,
      defaultExpandedTreeIds: [],
      searchValue: '',
      treeDataSource: [],
      expandedKeysFormEvent: [],
      // 上一次设置的用于保存树选中值的字段名
      // （通常用于 this.treeIdField 会发生变化的时候。如点击树的不同层级，传递的字段名不一样的情况）
      oldTreeIdField: '',
      // 是否是手动折叠树默。仅当触发onExpand事件为折叠状态时，给isCollapsedManually赋值为true
      isCollapsedManually: false
    }
  },
  computed: {
    moduleNameForTree() {
      return this.apiOptions?.moduleName?.replace('{appName}', getFirstLetterOfEachWordOfAppName()) ?? this.moduleName
    },
    dataSource() {
      return this.$store.state[this.moduleNameForTree][this.apiOptions.stateName]
    },
    primaryColor() {
      return window.themeVariables?.primaryColor
    },
    treeIdField() {
      return this.$store.state[this.moduleName]['treeIdField']
    },
    treeId() {
      return [this.$store.state[this.moduleName]['search'][this.treeIdField]]
    },
    expandedKeys() {
      if (this.expandedKeysFormEvent.length) {
        return this.expandedKeysFormEvent
      }

      // 展开所有搜索结果（一般在搜索树时使用，搜索树时会清空 expandedKeysFormEvent 数组）
      if (this.searchValue) {
        return this.getAllParentIds(this.treeDataSource)
      }

      if (this.isCollapsedManually) {
        return this.expandedKeysFormEvent
      }

      // 默认展开的树节点，如果 defaultExpandedTreeIds 为空，则默认展开所有层级的第一个子节点
      return this.defaultExpandedTreeIds?.length
        ? this.defaultExpandedTreeIds
        : this.getAllParentIds(this.treeDataSource, true)
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
      notInitList: this.notNoneMode,
      /**
       * 通知下层组件，当前页面是否启用侧边树
       */
      inTree: true,
      /**
       * 向下层组件提供直接刷新左侧树的API
       */
      refreshTree: this.getTree
    }
  },
  watch: {
    'dataSource.list': {
      deep: true,
      handler(treeData) {
        this.treeDataSource = treeData
      }
    },
    searchValue(value) {
      const newTreeDataSource = cloneDeep(this.dataSource.list)

      this.treeDataSource = this.filter(newTreeDataSource, value)
    }
  },
  async created() {
    // 非空模式下会在获取到树的数据后自动请求列表数据
    if (this.notNoneMode) {
      // 将初始化异步参数任务加入任务队列
      this.$store.commit('setState', {
        moduleName: this.moduleName,
        stateName: 'taskQueues',
        merge: true,
        value: this.initSearchParams()
      })
    }

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

    this.defaultExpandedTreeIds = [
      ...this.defaultExpandedKeys,
      this.$route.query[this.getFieldNameForTreeId()],
      this.$route.params[this.getFieldNameForTreeId()]
    ].filter(id => id !== undefined)

    const treeIdField = this.getFieldNameForTreeId(1)

    // 更新 store.state 里面用于树ID的键名（主要适配每一级树所使用的键名不同的情况）
    this.$store.commit('setState', {
      value: treeIdField,
      moduleName: this.moduleName,
      stateName: 'treeIdField'
    })
    this.oldTreeIdField = treeIdField
    // 请求树的数据
    this.status = await this.getTree()
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
    async initSearchParams() {
      while (!this.status) {
        await sleep(100)
      }

      if (this.dataSource.list?.length) {
        return Promise.resolve({
          ...this.injectSearchParamsOfTable(this.dataSource.list?.[0] ?? {}), // 获取额外请求参数
          [this.treeIdField]: this.dataSource.list?.[0]?.[this.replaceFields.value], // 获取树ID
          ...this.$route.query, // 获取地址栏的值
          /* #1 （一个书签，与本组件 #2 书签配合） */
          ...this.$route.params // 获取清空 query 后，通过 route.params 传递的参数。
        })
      } else {
        return Promise.reject('未获取到树数据')
      }
    },
    /**
     * 获取树的渲染数据
     * @returns {Promise<any>}
     */
    async getTree() {
      return await this.$store.dispatch('getListWithLoadingStatus', {
        moduleName: this.moduleNameForTree,
        stateName: this.apiOptions.stateName,
        customApiName: this.apiOptions.apiName
      })
    },
    /**
     * 获取所有父节点的ID
     * @param treeDataSource {Array}
     * @param [onlyFirstParentNode=false] {boolean} 仅获取每个层级的第一个子节点的ID
     * @returns {*[]}
     */
    getAllParentIds(treeDataSource, onlyFirstParentNode) {
      let ids = []

      for (const item of treeDataSource) {
        if (
          item.isParent ||
          (
            Array.isArray(item[this.replaceFields.children]) &&
            item[this.replaceFields.children]?.length
          )
        ) {
          ids.push(item[this.replaceFields.value])
          ids = ids.concat(this.getAllParentIds(item[this.replaceFields.children], onlyFirstParentNode))
        }

        if (onlyFirstParentNode) break
      }

      return ids
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
        if (item[this.replaceFields.title].includes(searchValue)) {
          temp.push(item)
        } else if (
          Array.isArray(item[this.replaceFields.children]) &&
          item[this.replaceFields.children].length
        ) {
          item[this.replaceFields.children] = this.filter(item[this.replaceFields.children], searchValue)

          if (item[this.replaceFields.children].length) {
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
        /**
         * #2 （一个书签，与本组件的 #1 配合）
         * 手动选择树节点后，清空地址栏的参数,
         * 改用 params 传递参数（params 参数在刷新页面后自动消失）
         */
        await this.$router.push({
          query: {},
          params: {
            ...this.injectSearchParamsOfTable(e.node.$attrs.dataSource), // 获取额外请求参数
            [this.treeIdField]: selectedKeys[0] // 获取树ID
          }
        })
      } else {
        let payload
        const treeIdField = this.getFieldNameForTreeId(e.node.pos.split('-').length - 1)

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
              [this.treeIdField]: this.notNoneMode ? this.dataSource.list?.[0]?.[this.replaceFields.value] : ''
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
      const node = treeNode?.[this.replaceFields.children]
      const childrenNumber = Array.isArray(node) && node.length ? `(${node.length})` : ''

      return this.searchValue
        ? (
          <span
            slot={'title'}
            title={treeNode[this.replaceFields.title] + childrenNumber}
            domPropsInnerHTML={
              treeNode[this.replaceFields.title].replace(
                this.searchValue,
                `<span style="color: ${this.primaryColor}">${this.searchValue}</span>`
              ) + childrenNumber
            }
          />
        )
        : (
          <span slot={'title'} title={treeNode[this.replaceFields.title] + childrenNumber}>
            {treeNode[this.replaceFields.title] + childrenNumber}
          </span>
        )
    },
    /**
     * 设置树每一级的图标
     * @param treeNode
     * @returns {*|(function(): Promise<*>)|undefined}
     */
    getIcon(treeNode) {
      return Object.prototype.toString.call(this.getCustomIcon) === '[object Function]'
        ? (
          <span slot={'icon'}>{this.getCustomIcon(treeNode)}</span>
        )
        : treeNode.obj?.menuIcon?.includes?.('.svg')
          ? (
            <Icon
              slot={'slot'}
              class={'icon'}
              component={() => import(`@/assets/images/${treeNode.obj.menuIcon}`)}
            />
          )
          // : <Icon slot={'slot'} type="caret-right" />
          // : <IconFont slot={'slot'} type="caret-right" />
          : undefined
    },
    /**
     * 获取树节点集合（注意此处有递归）
     * @param dataSource {Array} 生成树节点的数据源
     * @returns {*|*[]}
     */
    getTreeNode(dataSource) {
      return (
        dataSource?.map(item => (
          <Tree.TreeNode key={item[this.replaceFields.value]} dataSource={item}>
            {
              !Array.isArray(item?.[this.replaceFields.children]) || !item[this.replaceFields.children].length
                ? (
                  <span slot={'switcherIcon'} class={'ant-tree-switcher'} style={'visibility: visible'}>
                    <i class={'anticon anticon-file ant-tree-switcher-line-icon'}>
                      <svg
                        viewBox="200 200 650 650"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        fill="currentColor"
                      >
                        <path d="M512 601.6a89.6 89.6 0 1 0-89.6-89.6 89.59 89.59 0 0 0 89.6 89.6z m0 0" />
                      </svg>
                    </i>
                  </span>
                )
                : null
            }
            {this.getIcon(item)}
            {this.highlight(item)}
            {
              Array.isArray(item?.[this.replaceFields.children])
                ? this.getTreeNode(item[this.replaceFields.children])
                : null
            }
          </Tree.TreeNode>
        )) ?? []
      )
    },
    /**
     * 收缩/展开树所在侧边栏时的回调函数
     */
    onSidebarSwitch() {
      this.tableRef?.$parent?.resize()
    },
    /**
     * 搜索树
     * @param e
     */
    onTreeSearch(e) {
      this.expandedKeysFormEvent = []
      this.searchValue = e.target.value
    },
    /**
     * 展开树
     * @param expandedKeys
     */
    onExpand(expandedKeys, { expanded }) {
      this.isCollapsedManually = !expanded
      this.expandedKeysFormEvent = expandedKeys
    }
  },
  render() {
    return (
      <TGContainerWithSider
        class="tg-tree-container"
        siderClass="tg-tree-sider-container"
        contentClass={`tg-tree-content-container${this.contentClass ? ` ${this.contentClass}` : ''}`}
        siderOnLeft
        onSidebarSwitch={this.onSidebarSwitch}
        showSiderTrigger={this.$config.siderTree.showTrigger}
      >
        {this.$slots.default}
        <div slot={'sider'} class="tg-tree-data">
          <Input
            prefix={<Icon type={'search'} style={{ fontSize: '14px' }} />}
            allowClear
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
                    switcherIcon={<Icon type="caret-down" />}
                    selectedKeys={this.treeId}
                    onSelect={this.onSelect}
                    expandedKeys={this.expandedKeys}
                    onExpand={this.onExpand}
                  >
                    {this.getTreeNode(this.treeDataSource)}
                  </Tree>
                )
                : (
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                )
            }
          </Spin>
        </div>
      </TGContainerWithSider>
    )
  }
}

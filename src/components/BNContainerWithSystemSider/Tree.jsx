import { Empty, Spin, Tree } from 'ant-design-vue'

export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    loading: Boolean,
    data: Array,
    replaceFields: {
      type: Object,
      default: () => ({
        children: 'children',
        title: 'name',
        key: 'id'
      })
    },
    value: Array,
    defaultExpandedKeys: Array,
    checkable: Boolean,
    defaultCheckedKeys: Array
  },
  data() {
    return {
      selectedKeys: []
      // defaultCheckedKeys: [] // ['2db04ff345f911e6a45a0021ccb59cb3', '134b7b0d444443ae99c4255abfb99b7e']
    }
  },
  methods: {
    /**
     * antd vue Tree 组件的 select 事件回调
     * @param selectedKeys {array} 当前选中的 keys
     * @param selected {boolean} 当前是否有被选中的结点
     */
    async onSelect(selectedKeys, { selected }) {
      // console.log(selectedKeys, selected)
      this.selectedKeys = selectedKeys
      this.$emit('change', selectedKeys)
    },
    onCheck(checkedKeys, e) {
      this.$emit('check', checkedKeys, e)
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(value) {
        this.selectedKeys = value
      }
    }
  },
  render() {
    return (
      <Spin
        slot={'sider'}
        class="bnm-system-sider"
        spinning={this.loading}
      >
        {this.data?.length ? (
          <Tree
            selectedKeys={this.selectedKeys}
            replaceFields={this.replaceFields}
            treeData={this.data}
            onSelect={this.onSelect}
            defaultExpandedKeys={this.defaultExpandedKeys}
            showLine
            checkable={this.checkable}
            checkedKeys={this.defaultCheckedKeys}
            oncheck={this.onCheck}
          />
        ) : (
          <Empty />
        )}
      </Spin>
    )
  }
}

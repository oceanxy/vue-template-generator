import apis from '@/apis'
import Tree from '../Tree'

export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    checkable: Boolean,
    defaultCheckedKeys: Array,
    roleId: String
  },
  data() {
    return {
      loading: false,
      treeList: [],
      selectedKeys: [],
      defaultKeys: [],
      defaultExpandedKeys: []
    }
  },
  mounted() {
    //
  },
  methods: {
    async getPrivilegeTree() {
      this.loading = true
      const res = await apis.getRoomTreeList()

      this.loading = false

      if (res.status) {
        this.treeList = res.data || []

        if (this.treeList.length > 0) {
          this.defaultKeys = [this.treeList[0].id]
          this.defaultExpandedKeys = [this.treeList[0].id]
        }

        this.$emit('loaded', this.treeList)
      }
    },
    onChange(data) {
      this.defaultKeys = data
      this.emitEvent()
    },
    onCheck(keys, e) {
      this.$emit('check', keys, e)
    },
    emitEvent() {
      this.$emit('change', this.defaultKeys)
    }
  },
  render() {
    return (
      <Tree
        value={this.defaultKeys}
        loading={this.loading}
        data={this.treeList}
        checkable={this.checkable}
        defaultExpandedKeys={this.defaultExpandedKeys}
        defaultCheckedKeys={this.defaultCheckedKeys}
        onchange={this.onChange}
        oncheck={this.onCheck}></Tree>
    )
  }
}

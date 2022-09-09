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
    roleId: String,
    value: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      loading: false,
      treeList: [],
      checkedKeys: [],
      defaultExpandedKeys: []
    }
  },
  watch: {
    roleId: {
      immediate: true,
      async handler() {
        await this.getPrivilegeTree()
      }
    },
    value(value) {
      this.checkedKeys = value
    }
  },
  methods: {
    async getPrivilegeTree() {
      if (!this.roleId) return

      this.loading = true
      const res = await apis.getPrivilegeTree({ roleId: this.roleId })

      if (res.status) {
        this.treeList = res.data || []

        if (this.treeList.length > 0) {
          this.checkedKeys = [this.treeList[0].id]
          this.defaultExpandedKeys = [this.treeList[0].id]
        }

        this.$emit('loaded', this.treeList)
      }

      this.loading = false
    },
    onCheck(keys, e) {
      this.$emit('change', keys, e)
    }
  },
  render() {
    return (
      <Tree
        value={this.checkedKeys}
        loading={this.loading}
        data={this.treeList}
        checkable={this.checkable}
        defaultExpandedKeys={this.defaultExpandedKeys}
        defaultCheckedKeys={this.checkedKeys}
        onCheck={this.onCheck}
      />
    )
  }
}

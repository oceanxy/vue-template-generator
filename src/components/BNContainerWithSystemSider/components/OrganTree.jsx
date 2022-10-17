import apis from '@/apis'
import Tree from '../Tree'

export default {
  model: {
    prop: 'value',
    event: 'change'
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
    this.getMenus()
  },
  methods: {
    async getMenus() {
      this.loading = true
      const res = await apis.getOrganTree()

      this.loading = false

      if (res.status) {
        this.treeList = res.data || []

        if (this.treeList.length > 0) {
          this.defaultKeys = [this.treeList[0].id]
          this.defaultExpandedKeys = [this.treeList[0].id]
        }
      }
    },
    onChange(data) {
      this.defaultKeys = data
      this.emitEvent()
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
        defaultExpandedKeys={this.defaultExpandedKeys}
        onchange={this.onChange}
      ></Tree>
    )
  }
}

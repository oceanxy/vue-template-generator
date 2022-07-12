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
      menus: [],
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
      const res = await apis.getSystemMenuTree()
      this.loading = false
      if (res.status) {
        this.menus = res.data || []
        if (this.menus.length > 0) {
          this.defaultKeys = [this.menus[0].id]
          this.defaultExpandedKeys = [this.menus[0].id]
        }
      }
      this.emitEvent()
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
        data={this.menus}
        defaultExpandedKeys={this.defaultExpandedKeys}
        onchange={this.onChange}></Tree>
    )
  }
}

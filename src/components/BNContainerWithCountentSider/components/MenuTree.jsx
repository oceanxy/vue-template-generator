import apis from '@/apis'
import Tree from '../Tree'

export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    checkable: Boolean,
    defaultCheckedKeys: Array
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
        data={this.menus}
        checkable={this.checkable}
        defaultExpandedKeys={this.defaultExpandedKeys}
        defaultCheckedKeys={this.defaultCheckedKeys}
        onchange={this.onChange}
        oncheck={this.onCheck}
      ></Tree>
    )
  }
}

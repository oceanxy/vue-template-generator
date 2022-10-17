import { Cascader } from 'ant-design-vue'
import apis from '@/apis'

export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  props: { value: Array },
  data() {
    return {
      options: [],
      fieldNames: {
        label: 'name',
        value: 'id',
        children: 'children'
      },
      selectKeys: []
    }
  },
  mounted() {
    this.getMenus()
  },
  methods: {
    async getMenus() {
      const res = await apis.getOrganTree()

      if (res.status) {
        const data = res.data || []

        this.options = data
        // if (data.length > 0) {
        //   this.options = data[0].children
        // }
      }
    },
    onChange(value, selectedOptions) {
      this.selectKeys = value
      // if (value.length > 0) {
      //   this.selectKeys = value.slice(value.length - 1)
      // }
      this.emitEvent(this.selectKeys, selectedOptions)
    },
    emitEvent(value, selectedOptions) {
      this.$emit('change', value, selectedOptions)
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(value) {
        this.selectKeys = value || []
      }
    }
  },
  render() {
    return (
      <Cascader
        value={this.selectKeys}
        field-names={this.fieldNames}
        changeOnSelect={true}
        options={this.options}
        placeholder="请选择菜单"
        onchange={this.onChange}
      ></Cascader>
    )
  }
}

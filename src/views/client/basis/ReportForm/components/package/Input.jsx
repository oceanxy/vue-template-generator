import { Input } from 'ant-design-vue'

export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    data: Object,
    value: String
  },
  methods: {
    onChange(e) {
      this.$emit('change', e.target.value)
    }
  },
  render() {
    return <Input placeholder="请输入" allowClear onchange={this.onChange} />
  }
}

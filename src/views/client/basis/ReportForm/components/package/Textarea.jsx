import { Input } from 'ant-design-vue'

export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    data: Object
  },
  data() {
    return {}
  },
  methods: {
    onChange(e) {
      this.$emit('change', e.target.value)
    }
  },
  render() {
    return (
      <Input.TextArea
        autoSize={{ minRows: 4, maxRows: 6 }}
        placeholder="请输入"
        onchange={this.onChange}></Input.TextArea>
    )
  }
}

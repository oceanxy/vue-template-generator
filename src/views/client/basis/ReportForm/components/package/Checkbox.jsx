import { Checkbox } from 'ant-design-vue'

export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    data: Object
  },
  data() {
    return {
      options: [
        { label: '123', value: 1 },
        { label: '123', value: 2 },
        { label: '123', value: 3 }
      ]
    }
  },
  methods: {
    onChange(checkedValue) {
      this.$emit('change', checkedValue)
    }
  },
  render() {
    return <Checkbox.Group options={this.options} onchange={this.onChange}></Checkbox.Group>
  }
}

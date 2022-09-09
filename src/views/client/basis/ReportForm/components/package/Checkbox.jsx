import { Checkbox, Form } from 'ant-design-vue'
import { getRules } from '../utils'

export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    data: Object,
    form: Object
  },
  data() {
    return {}
  },
  methods: {
    getItemOptionList() {
      return this.data.itemOptionList.map(item => {
        return Object.assign(item, {
          label: item.optionValue,
          value: item.id
        })
      })
    }
  },
  render() {
    return (
      <Form.Item label={this.data.fullName}>
        {this.form.getFieldDecorator(this.data.id, {
          initialValue: [],
          rules: getRules(this.data)
        })(<Checkbox.Group options={this.getItemOptionList()}></Checkbox.Group>)}
      </Form.Item>
    )
  }
}

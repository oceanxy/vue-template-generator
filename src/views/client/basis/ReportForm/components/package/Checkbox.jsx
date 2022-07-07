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
    return {
      options: [
        { label: '123', value: 1 },
        { label: '123', value: 2 },
        { label: '123', value: 3 }
      ]
    }
  },
  methods: {
    getItemOptionList() {
      return this.data.itemOptionList.map(item => {
        return Object.assign(item, { label: item.itemName, value: item.optionValue })
      })
    }
  },
  render() {
    return (
      <Form.Item label={this.data.fullName}>
        {this.form.getFieldDecorator(this.data.id, { initialValue: [], rules: getRules(this.data) })(
          <Checkbox.Group options={this.getItemOptionList()}></Checkbox.Group>
        )}
      </Form.Item>
    )
  }
}

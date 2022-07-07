import { Radio, Form } from 'ant-design-vue'
import { getRules } from '../utils'
export default {
  props: {
    data: Object,
    form: Object
  },
  methods: {},
  render() {
    return (
      <Form.Item label={this.data.fullName}>
        {this.form.getFieldDecorator(this.data.id, {
          initialValue: '',
          rules: getRules(this.data)
        })(
          <Radio.Group>
            {this.data.itemOptionList.map(item => (
              <Radio value={item.optionValue}>{item.itemName}</Radio>
            ))}
          </Radio.Group>
        )}
      </Form.Item>
    )
  }
}

import { DatePicker, Form } from 'ant-design-vue'
import { getRules } from '../utils'

export default {
  props: {
    data: Object,
    form: Object
  },
  render() {
    return (
      <Form.Item label={this.data.fullName}>
        {this.form.getFieldDecorator(this.data.id, {
          initialValue: '', rules: getRules(this.data) 
        })(
          <DatePicker placeholder="请选择"></DatePicker>
        )}
      </Form.Item>
    )
  }
}

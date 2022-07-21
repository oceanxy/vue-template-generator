import { Input, Form, Card } from 'ant-design-vue'
import { getRules } from '../utils'

export default {
  props: {
    data: Object,
    value: String,
    form: Object
  },
  methods: {},
  render() {
    return (
      <Form.Item label={this.data.fullName}>
        {this.form.getFieldDecorator(this.data.id, {
          initialValue: '',
          rules: getRules(this.data)
        })(<Input placeholder="请输入"></Input>)}
      </Form.Item>
    )
  }
}

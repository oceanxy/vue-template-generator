import { Form, Input } from 'ant-design-vue'
import { getRules } from '../utils'

export default {
  props: {
    data: Object,
    form: Object
  },
  data() {
    return {}
  },
  methods: {},
  render() {
    return (
      <Form.Item label={this.data.fullName}>
        {
          this.form.getFieldDecorator(this.data.id, {
            initialValue: '',
            rules: getRules(this.data)
          })(
            <Input.TextArea
              autoSize={{ minRows: 6 }}
              placeholder="请输入"
            />
          )
        }
      </Form.Item>
    )
  }
}

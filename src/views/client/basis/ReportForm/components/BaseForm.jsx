import { Form, Button } from 'ant-design-vue'
import BaseFormItem from './BaseFormItem'
import { getFieldValue } from './utils'
export default Form.create({})({
  props: {
    list: Array
  },
  methods: {
    onSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (err) return
        const form = getFieldValue(this.list, values)
        this.$emit('submit', form)
      })
    }
  },
  render() {
    return (
      <Form class="bn-report-form" colon={false} onsubmit={this.onSubmit}>
        {this.list.map(item => (
          <BaseFormItem data={item} form={this.form}></BaseFormItem>
        ))}
        <Form.Item>
          <Button htmlType="submit" type="primary">
            确认提交
          </Button>
        </Form.Item>
      </Form>
    )
  }
})

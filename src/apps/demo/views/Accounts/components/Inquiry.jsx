import { Form, Input } from 'ant-design-vue'
import forInquiry from '@/mixins/forInquiry'

export default Form.create({})({
  mixins: [forInquiry()],
  computed: {
    forRender() {
      return [
        <Form.Item label={'关键字'}>
          {
            this.form.getFieldDecorator('query', { initialValue: this.initialValues.query })(
              <Input maxLength={11} placeholder="姓名/账号/手机号" allowClear />
            )
          }
        </Form.Item>
      ]
    }
  }
})

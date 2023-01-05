import forInquiry from '@/mixins/forInquiry'
import { Checkbox, Form, Space } from 'ant-design-vue'

export default Form.create({})({
  mixins: [forInquiry()],
  data: () => ({
    initialValues: {
      time: '',
      status: '',
      isS: 0
    }
  }),
  computed: {
    schoolTree() {
      return this.$store.state[this.moduleName].schoolTree
    }
  },
  render() {
    return (
      <Form
        layout="inline"
        onSubmit={this.onSubmit}
        colon={false}
        class="tg-inquiry"
      >
        <Space>
          <span>摸排结果：127人</span>
          <Form.Item class={'activity'} style={'margin-left: 2ic'}>
            {
              this.form.getFieldDecorator('isS', {
                initialValue: this.initialValues.isS,
                getPropsFromEvent(e) {
                  debugger
                }
              })(
                <Checkbox>同宿舍</Checkbox>
              )
            }
          </Form.Item>
        </Space>
      </Form>
    )
  }
})

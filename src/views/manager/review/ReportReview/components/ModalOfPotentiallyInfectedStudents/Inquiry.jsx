import forInquiry from '@/mixins/forInquiry'
import { Checkbox, Form, Space } from 'ant-design-vue'

export default Form.create({})({
  mixins: [forInquiry({ isInitializeFromStore: true })],
  data: () => ({
    initialValues: {}
  }),
  computed: {
    number() {
      return this.$store.state[this.moduleName][this.submoduleName].list.length || 0
    }
  },
  methods: {
    onChange() {
      this.onSubmit()
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
          <span>摸排结果：{this.number}人</span>
          <Form.Item
            class={'activity'}
            style={'margin-left: 2ic'}
          >
            {
              this.form.getFieldDecorator('type', {
                initialValue: this.initialValues.type,
                getValueFromEvent: e => e.target.checked ? 2 : 1,
                getValueProps: val => ({ checked: val === 2 })
              })(
                <Checkbox onChange={this.onChange}>仅看同宿舍</Checkbox>
              )
            }
          </Form.Item>
        </Space>
      </Form>
    )
  }
})

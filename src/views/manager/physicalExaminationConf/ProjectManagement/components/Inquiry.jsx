import '../assets/styles/index.scss'
import { Button, Form, Input, Select, Space } from 'ant-design-vue'
import forInquiry from '@/mixins/forInquiry'

export default Form.create({})({
  mixins: [forInquiry()],
  data: () => ({
    initialValues: {
      status: ''
    }
  }),
  render() {
    return (
      <Form
        layout="inline"
        onSubmit={this.onSubmit}
        colon={false}
        class="tg-inquiry"
      >
        <div class={'row-down'}>
          <Form.Item label="状态">
            {
              this.form.getFieldDecorator('status', { initialValue: this.initialValues.status })(
                <Select>
                  <Select.Option value={''}>全部</Select.Option>
                  <Select.Option value={1}>启用</Select.Option>
                  <Select.Option value={2}>停用</Select.Option>
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label={'名称'}>
            {
              this.form.getFieldDecorator('itemName', { initialValue: this.initialValues.itemName })(
                <Input placeholder={'分类名称'} />
              )
            }
          </Form.Item>
          <Form.Item label=' ' class={'form-item-btn'}>
            <Space>
              <Button
                loading={this.loading}
                htmlType="submit"
                type="primary"
                icon="search"
              >
                查询
              </Button>
            </Space>
          </Form.Item>
        </div>
      </Form>
    )
  }
})

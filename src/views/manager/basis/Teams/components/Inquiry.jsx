import { Button, Form, Input, Select, Space } from 'ant-design-vue'
import forInquiry from '@/mixins/forInquiry'
import Functions from './Functions'
import '../assets/styles/index.scss'

export default Form.create({ name: 'inquiryForm' })({
  mixins: [forInquiry()],
  render() {
    return (
      <Form
        layout="inline"
        onSubmit={this.onSubmit}
        colon={false}
        class="tg-inquiry"
      >
        <Form.Item>
          {
            this.form.getFieldDecorator('fullName')(
              <Input
                placeholder="团队名称"
                allowClear
              />
            )
          }
        </Form.Item>
        <Form.Item>
          {
            this.form.getFieldDecorator('status')(
              <Select
                placeholder="请选择状态"
                allowClear
              >
                <Select.Option value={1}>启用</Select.Option>
                <Select.Option value={2}>停用</Select.Option>
              </Select>
            )
          }
        </Form.Item>
        <Form.Item>
          <Space>
            <Button
              loading={this.loading}
              htmlType="submit"
              type="primary"
              icon="search"
            >
              查询
            </Button>
            {/*<Button onClick={this.onClear} icon="reload">重置</Button>*/}
          </Space>
        </Form.Item>
        <Functions search={this.form.getFieldsValue()} />
      </Form>
    )
  }
})

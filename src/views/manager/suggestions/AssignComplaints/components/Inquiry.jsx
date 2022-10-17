import '../assets/styles/index.scss'
import { Button, DatePicker, Form, Input, Select, Space } from 'ant-design-vue'
import forInquiry from '@/mixins/forInquiry'
import Functions from './Functions'

export default Form.create({})({
  mixins: [forInquiry()],
  render() {
    return (
      <Form
        layout="inline"
        onSubmit={this.onSubmit}
        colon={false}
        class="tg-inquiry"
      >
        <Form.Item style={{ width: '220px' }}>
          {
            this.form.getFieldDecorator('dateRange', { initialValue: [] })(
              <DatePicker.RangePicker
                style={{ width: '100%' }}
                allowClear
              />
            )
          }
        </Form.Item>
        <Form.Item>
          {
            this.form.getFieldDecorator('companyName')(
              <Input
                placeholder="企业名称"
                allowClear
              />
            )
          }
        </Form.Item>
        <Form.Item>
          {
            this.form.getFieldDecorator('assigneeName')(
              <Input
                placeholder="受理人姓名"
                allowClear
              />
            )
          }
        </Form.Item>
        <Form.Item>
          {
            this.form.getFieldDecorator('complaintType')(
              <Select
                placeholder="投诉类型"
                allowClear
              >
                <Select.Option value={1}>园区管理</Select.Option>
                <Select.Option value={2}>服务态度</Select.Option>
                <Select.Option value={3}>服务质量</Select.Option>
                <Select.Option value={4}>服务效率</Select.Option>
              </Select>
            )
          }
        </Form.Item>
        <Form.Item>
          {
            this.form.getFieldDecorator('acceptStatus')(
              <Select
                placeholder="处理状态"
                allowClear
              >
                <Select.Option value={1}>已处理</Select.Option>
                <Select.Option value={2}>待处理</Select.Option>
                <Select.Option value={3}>已撤销</Select.Option>
                <Select.Option value={4}>处理中</Select.Option>
                <Select.Option value={5}>待分配</Select.Option>
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
        <Functions />
      </Form>
    )
  }
})

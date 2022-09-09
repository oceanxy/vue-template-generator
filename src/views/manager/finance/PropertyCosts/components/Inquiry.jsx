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
        <Form.Item>
          {this.form.getFieldDecorator('companyName')(<Input placeholder="企业名称" allowClear />)}
        </Form.Item>
        <Form.Item>
          {this.form.getFieldDecorator('payStatus')(
            <Select placeholder="请选择支付状态" allowClear>
              <Select.Option value={1}>待支付</Select.Option>
              <Select.Option value={2}>支付中</Select.Option>
              <Select.Option value={3}>已支付</Select.Option>
              <Select.Option value={4}>支付失败</Select.Option>
              <Select.Option value={5}>退款中</Select.Option>
              <Select.Option value={6}>已退款</Select.Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item>
          {this.form.getFieldDecorator('billMonth')(
            <DatePicker.MonthPicker placeholder="请选择月份" style={{ width: '100%' }} allowClear />
          )}
        </Form.Item>
        <Form.Item>
          <Space>
            <Button loading={this.loading} htmlType="submit" type="primary" icon="search">
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

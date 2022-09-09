import { Button, Form, Input, Space, Select } from 'ant-design-vue'
import forInquiry from '@/mixins/forInquiry'
import '../assets/styles/index.scss'

export default Form.create({})({
  mixins: [forInquiry()],
  render() {
    return (
      <Form layout="inline" onSubmit={this.onSubmit} colon={false} class="tg-inquiry">
        <Form.Item>{this.form.getFieldDecorator('repairItem')(<Input placeholder="报修项" allowClear />)}</Form.Item>
        <Form.Item>{this.form.getFieldDecorator('companyName')(<Input placeholder="保修公司" allowClear />)}</Form.Item>
        <Form.Item>
          {this.form.getFieldDecorator('acceptStatus')(
            <Select placeholder="所有状态" allowClear>
              <Select.Option value={1}>已处理</Select.Option>
              <Select.Option value={2}>待处理</Select.Option>
              <Select.Option value={3}>已撤销</Select.Option>
              <Select.Option value={4}>处理中</Select.Option>
            </Select>
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
      </Form>
    )
  }
})

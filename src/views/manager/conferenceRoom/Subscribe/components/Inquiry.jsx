import { Button, Form, Input, Select, Space } from 'ant-design-vue'
import forInquiry from '@/mixins/forInquiry'
import Functions from './Functions'
import '../assets/styles/index.scss'

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
        <Form.Item>{this.form.getFieldDecorator('roomNo')(<Input placeholder="房号" allowClear />)}</Form.Item>
        <Form.Item>
          {this.form.getFieldDecorator('appointmentStatus')(
            <Select placeholder="全部状态">
              <Select.Option value={1}>预约中</Select.Option>
              <Select.Option value={0}>已取消</Select.Option>
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
        <Functions />
      </Form>
    )
  }
})

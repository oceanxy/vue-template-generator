import { Button, Form, Input, Space, Select } from 'ant-design-vue'
import forInquiry from '@/mixins/forInquiry'
import Functions from './Functions'
import '../assets/styles/index.scss'

export default Form.create({})({
  mixins: [forInquiry()],
  render () {
    return (
      <Form
        layout="inline"
        onSubmit={this.onSubmit}
        colon={false}
        class="tg-inquiry"
      >
        <Form.Item>
          {this.form.getFieldDecorator('nickName')(<Input placeholder="用户姓名 / 手机号码" allowClear />)}
        </Form.Item>
        <Form.Item>
          {this.form.getFieldDecorator('status')(
            <Select placeholder="请选择状态" allowClear>
              <Select.Option value={1}>正常</Select.Option>
              <Select.Option value={2}>停用</Select.Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item>
          <Space>
            <Button loading={this.loading} htmlType="submit" type="primary" icon="search">
              查询
            </Button>
          </Space>
        </Form.Item>
        <Functions />
      </Form>
    )
  }
})

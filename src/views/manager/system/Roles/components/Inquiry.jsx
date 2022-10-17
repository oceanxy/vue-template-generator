import { Button, Form, Input, Space } from 'ant-design-vue'
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
        <Space>
          <Form.Item>{this.form.getFieldDecorator('fullName')(<Input
            placeholder="名称"
            allowClear
          />)}</Form.Item>
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
        </Space>
        <Functions />
      </Form>
    )
  }
})

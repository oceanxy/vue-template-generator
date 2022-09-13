import '../assets/styles/index.scss'
import { Button, Form, Input, Select, Space } from 'ant-design-vue'
import forInquiry from '@/mixins/forInquiry'

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
          {
            this.form.getFieldDecorator('companyName')(
              <Input placeholder="企业名称" allowClear />
            )
          }
        </Form.Item>
        <Form.Item>
          {
            this.form.getFieldDecorator('contractNo')(
              <Input placeholder="合同编号" allowClear />
            )
          }
        </Form.Item>
        <Form.Item>
          {
            this.form.getFieldDecorator('auditStatus')(
              <Select placeholder="请选择状态" allowClear>
                <Select.Option value={2}>待审核</Select.Option>
                <Select.Option value={3}>审核通过</Select.Option>
                <Select.Option value={4}>审核驳回</Select.Option>
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
      </Form>
    )
  }
})
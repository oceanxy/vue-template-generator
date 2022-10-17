import { Button, Form, Input, Select, Space } from 'ant-design-vue'
import forInquiry from '@/mixins/forInquiry'
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
            this.form.getFieldDecorator('accountingType')(
              <Select
                placeholder="请选择费用核算模式"
                allowClear
              >
                <Select.Option value={1}>沿用旧合同</Select.Option>
                <Select.Option value={2}>重新核算</Select.Option>
              </Select>
            )
          }
        </Form.Item>
        <Form.Item>
          {
            this.form.getFieldDecorator('renewalType')(
              <Select
                placeholder="请选择续约模式"
                allowClear
              >
                <Select.Option value={1}>旧合同延期</Select.Option>
                <Select.Option value={2}>签订新合同</Select.Option>
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

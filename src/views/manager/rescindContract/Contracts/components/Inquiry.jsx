import '../index.scss'
import { Button, Form, Input, Select, Space } from 'ant-design-vue'
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
          {this.form.getFieldDecorator('contractNo')(<Input
            placeholder="合同编号"
            allowClear
          />)}
        </Form.Item>
        <Form.Item>
          {this.form.getFieldDecorator('companyName')(<Input
            placeholder="签订方名称"
            allowClear
          />)}
        </Form.Item>
        <Form.Item>
          {this.form.getFieldDecorator('signingStatus')(
            <Select
              placeholder="请选择状态"
              allowClear
            >
              <Select.Option value={1}>签约中</Select.Option>
              <Select.Option value={2}>待审核</Select.Option>
              <Select.Option value={3}>已签约</Select.Option>
              <Select.Option value={4}>审核驳回</Select.Option>
              <Select.Option value={5}>解约申请中</Select.Option>
              <Select.Option value={6}>已解约</Select.Option>
              <Select.Option value={8}>续约申请中</Select.Option>
              <Select.Option value={9}>已到期</Select.Option>
            </Select>
          )}
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

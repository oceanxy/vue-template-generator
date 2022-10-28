import '../assets/styles/index.scss'
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
            this.form.getFieldDecorator('dutyPerson')(
              <Input
                placeholder="负责人姓名/身份证号/手机号"
                allowClear
              />
            )
          }
        </Form.Item>
        <Form.Item>
          {
            this.form.getFieldDecorator('companyType')(
              <Select
                placeholder="请选择企业类型"
                allowClear
              >
                <Select.Option value={1}>有限责任公司</Select.Option>
                <Select.Option value={2}>股份有限责任公司</Select.Option>
                <Select.Option value={3}>个人独资企业</Select.Option>
                <Select.Option value={4}>合伙企业</Select.Option>
                <Select.Option value={5}>个体工商户</Select.Option>
              </Select>
            )
          }
        </Form.Item>
        <Form.Item>
          {
            this.form.getFieldDecorator('companyCategory')(
              <Select
                placeholder="请选择签约对象"
                allowClear
              >
                <Select.Option value={1}>企业</Select.Option>
                <Select.Option value={2}>团队</Select.Option>
              </Select>
            )
          }
        </Form.Item>
        <Form.Item>
          {
            this.form.getFieldDecorator('signingStatus')(
              <Select
                placeholder="请选择状态"
                allowClear
              >
                <Select.Option value={1}>签约中</Select.Option>
                <Select.Option value={3}>已签约</Select.Option>
                <Select.Option value={6}>已解约</Select.Option>
                <Select.Option value={7}>待签约</Select.Option>
              </Select>
            )
          }
        </Form.Item>
        <Space>
          <Button
            loading={this.loading}
            htmlType="submit"
            type="primary"
            icon="search"
          >
            搜索
          </Button>
          {/*<Button onClick={this.onClear} icon="reload">重置</Button>*/}
        </Space>
        <Functions search={this.form.getFieldsValue()} />
      </Form>
    )
  }
})

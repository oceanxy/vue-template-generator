import '../assets/styles/index.scss'
import { Button, Form, Input, Select, Space } from 'ant-design-vue'
import forInquiry from '@/mixins/forInquiry'

export default Form.create({})({
  mixins: [forInquiry()],
  data: () => ({
    initialValues: {
      status: '',
      schoolType: '',
      category: '',
      urbanRuralType: '',
      isBoardingSchool: '',
      isBranchSchool: ''
    }
  }),
  render() {
    return (
      <Form
        layout="inline"
        onSubmit={this.onSubmit}
        colon={false}
        class="tg-inquiry"
      >
        <div class={'row-down'}>
          <Form.Item label="状态">
            {
              this.form.getFieldDecorator('status', { initialValue: this.initialValues.status })(
                <Select>
                  <Select.Option value={''}>全部</Select.Option>
                  <Select.Option value={1}>启用</Select.Option>
                  <Select.Option value={2}>停用</Select.Option>
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label="办学类型">
            {
              this.form.getFieldDecorator('schoolType', { initialValue: this.initialValues.schoolType })(
                <Select>
                  <Select.Option value={''}>全部</Select.Option>
                  <Select.Option value={111}>幼儿园</Select.Option>
                  <Select.Option value={211}>小学</Select.Option>
                  <Select.Option value={311}>初级中学</Select.Option>
                  <Select.Option value={341}>完全中学</Select.Option>
                  <Select.Option value={365}>职业高中</Select.Option>
                  <Select.Option value={411}>大学</Select.Option>
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label={'办别'}>
            {
              this.form.getFieldDecorator('category', { initialValue: this.initialValues.category })(
                <Select>
                  <Select.Option value={''}>全部</Select.Option>
                  <Select.Option value={1}>公办</Select.Option>
                  <Select.Option value={2}>民办</Select.Option>
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label={'城乡类型'}>
            {
              this.form.getFieldDecorator('urbanRuralType', { initialValue: this.initialValues.urbanRuralType })(
                <Select>
                  <Select.Option value={''}>全部</Select.Option>
                  <Select.Option value={1}>城镇</Select.Option>
                  <Select.Option value={2}>农村</Select.Option>
                  <Select.Option value={0}>未知</Select.Option>
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label={'是否寄宿'}>
            {
              this.form.getFieldDecorator('isBoardingSchool', { initialValue: this.initialValues.isBoardingSchool })(
                <Select>
                  <Select.Option value={''}>全部</Select.Option>
                  <Select.Option value={1}>是</Select.Option>
                  <Select.Option value={0}>否</Select.Option>
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label={'是否分校'}>
            {
              this.form.getFieldDecorator('isBranchSchool', { initialValue: this.initialValues.isBranchSchool })(
                <Select>
                  <Select.Option value={''}>全部</Select.Option>
                  <Select.Option value={1}>是</Select.Option>
                  <Select.Option value={0}>否</Select.Option>
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label={'名称'}>
            {
              this.form.getFieldDecorator('fullName', { initialValue: this.initialValues.fullName })(
                <Input placeholder={'请输入学校名称'} />
              )
            }
          </Form.Item>
          <Form.Item label=' ' class={'form-item-btn'}>
            <Space>
              <Button
                loading={this.loading}
                htmlType="submit"
                type="primary"
                icon="search"
              >
                查询
              </Button>
            </Space>
          </Form.Item>
        </div>
      </Form>
    )
  }
})

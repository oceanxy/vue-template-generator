import { Button, Form, Input, Select, Space } from 'ant-design-vue'
import forInquiry from '@/mixins/forInquiry'

export default Form.create({})({
  mixins: [forInquiry()],
  data: () => ({ initialValues: { allLeaf: 1 } }),
  render() {
    return (
      <Form
        layout="inline"
        onSubmit={this.onSubmit}
        colon={false}
        class="tg-inquiry"
      >
        <Space>
          <Form.Item label={'包含子级'}>
            {
              this.form.getFieldDecorator('allLeaf', { initialValue: this.initialValues.allLeaf })(
                <Select>
                  <Select.Option value={1}>是</Select.Option>
                  <Select.Option value={0}>否</Select.Option>
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label={'名称'}>
            {
              this.form.getFieldDecorator('fullName', { initialValue: this.initialValues.fullName })(
                <Input
                  placeholder="名称"
                  allowClear
                />
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
              查询
            </Button>
            {/*<Button onClick={this.onClear} icon="reload">重置</Button>*/}
          </Space>
        </Space>
      </Form>
    )
  }
})

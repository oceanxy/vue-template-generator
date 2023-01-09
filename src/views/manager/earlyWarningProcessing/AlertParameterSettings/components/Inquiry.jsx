import forInquiry from '@/mixins/forInquiry'
import { Button, Form, Input, Select, Space } from 'ant-design-vue'

export default Form.create({})({
  mixins: [forInquiry()],
  data: () => ({
    initialValues: {
      time: '',
      status: ''
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
          <Form.Item label={'预警类型'}>
            {
              this.form.getFieldDecorator('t', { initialValue: this.initialValues.time })(
                <Select>
                  <Select.Option value={''}>全部</Select.Option>
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label={'症状名称'}>
            {
              this.form.getFieldDecorator('fullName', { initialValue: this.initialValues.fullName })(
                <Input placeholder={'请输入姓名'} />
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
        </div>
      </Form>
    )
  }
})

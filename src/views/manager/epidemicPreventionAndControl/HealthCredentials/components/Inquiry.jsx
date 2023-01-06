import { Button, DatePicker, Form, Input, Select, Space } from 'ant-design-vue'
import forInquiry from '@/mixins/forInquiry'

export default Form.create({})({
  mixins: [forInquiry()],
  data: () => ({ initialValues: { allLeaf: 1, status: '' } }),
  render() {
    return (
      <Form
        layout="inline"
        onSubmit={this.onSubmit}
        colon={false}
        class="tg-inquiry"
      >
        <Space>
          <Form.Item label="时间范围" class={'span-2'}>
            {
              this.form.getFieldDecorator('dateRange', { initialValue: this.initialValues.dateRange })(
                <DatePicker.RangePicker
                  placeholder={['开始时间', '结束时间']}
                  valueFormat={'YYYY-MM-DD'}
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

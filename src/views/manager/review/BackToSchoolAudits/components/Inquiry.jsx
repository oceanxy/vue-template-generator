import forInquiry from '@/mixins/forInquiry'
import { Button, DatePicker, Form, Input, Select, Space } from 'ant-design-vue'

export default Form.create({})({
  mixins: [forInquiry()],
  data: () => ({
    initialValues: {
      dateRange: [],
      auditType: ''
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
          <Form.Item label="提交时间" class={'span-2'}>
            {
              this.form.getFieldDecorator('dateRange', { initialValue: this.initialValues.dateRange })(
                <DatePicker.RangePicker
                  placeholder={['开始时间', '结束时间']}
                  valueFormat={'YYYYMMDD'}
                  allowClear
                />
              )
            }
          </Form.Item>
          <Form.Item label={'审核状态'}>
            {
              this.form.getFieldDecorator('auditType', { initialValue: this.initialValues.auditType })(
                <Select>
                  <Select.Option value={''}>全部</Select.Option>
                  <Select.Option value={1}>待审核</Select.Option>
                  <Select.Option value={2}>审核通过</Select.Option>
                  <Select.Option value={3}>审核驳回</Select.Option>
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label={'姓名'}>
            {
              this.form.getFieldDecorator('studentName', { initialValue: this.initialValues.studentName })(
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

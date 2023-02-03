import forInquiry from '@/mixins/forInquiry'
import { Button, Form, Select, Space } from 'ant-design-vue'

export default Form.create({})({
  mixins: [forInquiry()],
  data: () => ({
    initialValues: {
      reportTimePeriod: '',
      reportStatus: ''
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
          <Form.Item label={'上报时段'}>
            {
              this.form.getFieldDecorator(
                'reportTimePeriod',
                { initialValue: this.initialValues.reportTimePeriod }
              )(
                <Select allowClear placeholder={'请选择上报时段'}>
                  <Select.Option value={''}>全部</Select.Option>
                  <Select.Option value={1}>晨检</Select.Option>
                  <Select.Option value={2}>午检</Select.Option>
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label={'上报状态'}>
            {
              this.form.getFieldDecorator('reportStatus', { initialValue: this.initialValues.reportStatus })(
                <Select allowClear placeholder={'请选择上报状态'}>
                  <Select.Option value={''}>全部</Select.Option>
                  <Select.Option value={1}>未上报</Select.Option>
                  <Select.Option value={2}>待审核</Select.Option>
                  <Select.Option value={3}>审核通过</Select.Option>
                  <Select.Option value={4}>驳回</Select.Option>
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
              查询
            </Button>
            {/*<Button onClick={this.onClear} icon="reload">重置</Button>*/}
          </Space>
        </div>
      </Form>
    )
  }
})

import '../assets/styles/index.scss'
import { Button, DatePicker, Form, Input, Select, Space } from 'ant-design-vue'
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
        <Form.Item style={{ width: '250px' }}>
          {
            this.form.getFieldDecorator('dateRange', { initialValue: [] })(
              <DatePicker.RangePicker
                style={{ width: '100%' }}
                allowClear
              />
            )
          }
        </Form.Item>
        <Form.Item>
          {
            this.form.getFieldDecorator('fullName')(
              <Input
                placeholder="标题"
                allowClear
              />
            )
          }
        </Form.Item>
        <Form.Item>
          {
            this.form.getFieldDecorator('fillObj')(
              <Select
                placeholder="请选择填报对象"
                mode={'multiple'}
                allowClear
              >
                <Select.Option value={1}>监管单位</Select.Option>
                <Select.Option value={2}>运营单位</Select.Option>
                <Select.Option value={3}>物业单位</Select.Option>
                <Select.Option value={4}>企业</Select.Option>
                <Select.Option value={5}>团队</Select.Option>
              </Select>
            )
          }
        </Form.Item>
        <Form.Item>
          {
            this.form.getFieldDecorator('fillPeriod')(
              <Select
                placeholder="请选择填报周期"
                allowClear
              >
                <Select.Option value={1}>按周填报</Select.Option>
                <Select.Option value={2}>按月填报</Select.Option>
                <Select.Option value={3}>按季填报</Select.Option>
                <Select.Option value={4}>按半年填报</Select.Option>
                <Select.Option value={5}>按年填报</Select.Option>
              </Select>
            )
          }
        </Form.Item>
        <Form.Item>
          {
            this.form.getFieldDecorator('reportStatus')(
              <Select
                placeholder="请选择状态"
                allowClear
              >
                <Select.Option value={1}>已发布</Select.Option>
                <Select.Option value={2}>待发布</Select.Option>
                <Select.Option value={3}>已结束</Select.Option>
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
        <Functions />
      </Form>
    )
  }
})

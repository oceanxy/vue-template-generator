import { Button, DatePicker, Form, Select, Space } from 'ant-design-vue'
import forInquiry from '@/mixins/forInquiry'
import forInquiryAboutActivity from '@/mixins/forInquiry/forInquiryAboutActivity'

export default Form.create({})({
  mixins: [forInquiry(), forInquiryAboutActivity()],
  data: () => ({
    initialValues: {
      activityOrgId: '',
      grade: ''
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
          <div>统计范围：北碚区 学生人数：24324人</div>
          <Form.Item label="统计周期" class={'span-2'}>
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
          <Form.Item label="症状" class={'span-2'}>
            {
              this.form.getFieldDecorator('ss', { initialValue: this.initialValues.ss })(
                <Select
                  mode={'multiple'}
                  placeholder={'请选择症状（最多7个）'}
                  allowClear
                >
                  <Select.Option value={1}>1</Select.Option>
                  <Select.Option value={2}>2</Select.Option>
                </Select>
              )
            }
          </Form.Item>
          <Space class={'btn-group'}>
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
        </div>
      </Form>
    )
  }
})
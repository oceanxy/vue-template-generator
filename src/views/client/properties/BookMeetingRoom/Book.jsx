import './assets/styles/index.scss'
import { Button, DatePicker, Form, Input, Select } from 'ant-design-vue'
import BNContainer from '@/components/BNContainer'

export default Form.create({})({
  render() {
    return (
      <BNContainer
        width="100%"
        modalTitle="会议室预约 > 立即预约"
        class="bn-book-meeting-room--book"
      >
        <Form
          class="book-meeting-room-form"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}
        >
          <Form.Item label="会议室">
            {
              this.form.getFieldDecorator('a', {})(
                <Select />
              )
            }
          </Form.Item>
          <Form.Item label="会议日期">
            {
              this.form.getFieldDecorator('b', {})(
                <DatePicker />
              )
            }
          </Form.Item>
          <Form.Item label=" " colon={false}>
            <div class="prompt">
              <div>本会议室当日预约情况：</div>
              <div>14:00 ~ 17:00 重庆誉存科技有限公司 / 暂无预约</div>
            </div>
          </Form.Item>
          <Form.Item label="预约时间">
            {
              this.form.getFieldDecorator('c', {})(
                <DatePicker.RangePicker type="datetime" />
              )
            }
          </Form.Item>
          <Form.Item label="占用时长">
            {
              this.form.getFieldDecorator('a', {})(
                <Input disabled />
              )
            }
          </Form.Item>
          <Form.Item label="预约企业">
            {
              this.form.getFieldDecorator('a', {})(
                <Input disabled />
              )
            }
          </Form.Item>
          <Form.Item label="用途说明">
            {
              this.form.getFieldDecorator('a', {})(
                <Input.TextArea autoSize={{ minRows: 4, maxRows: 6 }} />
              )
            }
          </Form.Item>
          <Form.Item label=" " colon={false}>
            <Button type="primary">提交预约</Button>
          </Form.Item>
        </Form>
      </BNContainer>
    )
  }
})

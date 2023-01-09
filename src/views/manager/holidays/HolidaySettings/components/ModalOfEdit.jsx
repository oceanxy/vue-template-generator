import { DatePicker, Form, Input } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return { modalProps: { width: 810 } }
  },
  render() {
    return (
      <DragModal {...this.attributes}>
        <Form class="tg-form-grid" colon={false}>
          <Form.Item label="节假日名称">
            {
              this.form.getFieldDecorator('fullName', { initialValue: this.details?.fullName })(
                <Input
                  placeholder={'请输入节假日名称'}
                />
              )
            }
          </Form.Item>
          <Form.Item label="时间范围">
            {
              this.form.getFieldDecorator('dateRange', { initialValue: this.details?.dateRange })(
                <DatePicker.RangePicker
                  placeholder={['开始时间', '结束时间']}
                  valueFormat={'YYYY-MM-DD'}
                  allowClear
                />
              )
            }
          </Form.Item>
        </Form>
      </DragModal>
    )
  }
})

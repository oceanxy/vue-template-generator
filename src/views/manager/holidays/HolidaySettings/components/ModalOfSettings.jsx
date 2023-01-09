import { Form, Input, Transfer } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import MultiInput from './MultiInput'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {
      modalProps: { width: 700 },
      visibilityFieldName: 'visibilityOfSettings'
    }
  },
  render() {
    return (
      <DragModal {...this.attributes}>
        <Form class="tg-form-grid" colon={false}>
          <Form.Item label="选择范围">
            {
              this.form.getFieldDecorator('fullName', { initialValue: this.currentItem?.fullName })(
                <Transfer
                  rowKey={record => record.id}
                  dataSource={[]}
                  placeholder={'请输入节假日名称'}
                />
              )
            }
          </Form.Item>
          <Form.Item label="设置日期">
            {
              this.form.getFieldDecorator('dates', { initialValue: this.currentItem?.dateRange ?? [] })(
                <MultiInput />
              )
            }
          </Form.Item>
          <Form.Item label="备注">
            {
              this.form.getFieldDecorator('dateRange', { initialValue: this.currentItem?.dateRange ?? [] })(
                <Input.TextArea
                  placeholder={'请输入备注'}
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

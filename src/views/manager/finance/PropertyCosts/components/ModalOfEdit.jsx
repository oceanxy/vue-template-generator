import '../assets/styles/index.scss'
import { Form, InputNumber } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {modalProps: {width: 400}}
  },
  render() {
    const attributes = {
      attrs: this.modalProps,
      on: {
        cancel: () => this.onCancel(),
        ok: () => this.onSubmit()
      }
    }

    return (
      <DragModal {...attributes}>
        <Form
          class="bnm-form-grid label-size-small"
          colon={false}
        >
          <Form.Item label="金额">
            {
              this.form.getFieldDecorator('amount', {
                rules: [{
                  required: true, type: 'number', message: '请输入金额！', trigger: 'blur' 
                }]
              })(
                <InputNumber
                  style={{ width: '100%' }}
                  placeholder={'请输入金额'}
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

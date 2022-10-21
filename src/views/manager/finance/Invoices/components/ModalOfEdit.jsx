import '../assets/styles/index.scss'
import { Form } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import BNUploadFile from '@/components/BNUploadFile'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return { modalProps: { width: 500 } }
  },
  render() {
    const attributes = {
      attrs: this.modalProps,
      on: {
        cancel: () => this.onCancel(),
        ok: () => this.onSubmit({
          customApiName: 'invoice',
          customDataHandler: values => {
            if (values.invoiceUrl.length) {
              values.invoiceUrl = JSON.stringify(values.invoiceUrl[0].response.data[0])
            }

            return values
          }
        })
      }
    }

    return (
      <DragModal {...attributes}>
        <Form
          class="bnm-form-grid label-size-small"
          colon={false}
        >
          <Form.Item
            label="企业"
            class={'combo'}
          >
            {this.currentItem.companyName}
          </Form.Item>
          <Form.Item label="发票">
            {
              this.form.getFieldDecorator('invoiceUrl', {
                initialValue: undefined,
                rules: [
                  {
                    required: true,
                    type: 'array',
                    message: '请上传发票',
                    trigger: 'change'
                  }
                ]
              })(
                <BNUploadFile
                  accept=".pdf"
                  placeholder={'选择发票'}
                  limit={1}
                />
              )
            }
          </Form.Item>
        </Form>
      </DragModal>
    )
  }
})

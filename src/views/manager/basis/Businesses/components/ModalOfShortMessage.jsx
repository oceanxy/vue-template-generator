import '../assets/styles/index.scss'
import { Checkbox, Form, Input } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {
      modalProps: { width: 690 },
      visibleField: 'visibleOfShortMessage'
    }
  },
  render() {
    const attributes = {
      attrs: this.modalProps,
      on: {
        cancel: () => this.onCancel(this.visibleField),
        ok: () => this.onSubmit({
          isFetchList: false,
          customApiName: 'sendSMS'
        })
      }
    }

    return (
      <DragModal {...attributes} class={'businesses-short-message-modal'}>
        <Form
          class="tg-form-grid"
          colon={false}
        >
          <Form.Item label="发送对象">
            {
              this.form.getFieldDecorator('sendObj', {
                initialValue: [],
                rules: [
                  {
                    required: true, type: 'array', message: '请输入内容!', trigger: 'change'
                  }
                ]
              })(
                <Checkbox.Group>
                  <Checkbox value={1}>法人</Checkbox>
                  <Checkbox value={2}>负责人</Checkbox>
                </Checkbox.Group>
              )
            }
          </Form.Item>
          <Form.Item label="内容">
            {
              this.form.getFieldDecorator('content', {
                initialValue: '',
                rules: [
                  {
                    required: true, message: '请输入内容!', trigger: 'blur'
                  }
                ]
              })(
                <Input.TextArea
                  placeholder={'请输入内容'}
                  autoSize={{ minRows: 6 }}
                />
              )
            }
          </Form.Item>
        </Form>
      </DragModal>
    )
  }
})

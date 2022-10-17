import '../assets/styles/index.scss'
import { Form, Input, Radio } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {
      modalProps: { width: 690 },
      visibleField: 'visibleOfContractReview'
    }
  },
  render() {
    const attributes = {
      attrs: this.modalProps,
      on: {
        cancel: () => this.onCancel('visibleOfContractReview'),
        ok: () => this.onSubmit({ customApiName: 'contractReviewSubmit' })
      }
    }

    return (
      <DragModal {...attributes} class={'bnm-team-edit-modal'}>
        <Form
          class="bnm-form-grid"
          colon={false}
        >
          <Form.Item label="审核结果">
            {
              this.form.getFieldDecorator('signingStatus', {
                rules: [
                  {
                    required: true, type: 'number', message: '请选择审核结果！', trigger: 'change'
                  }
                ]
              })(
                <Radio.Group>
                  <Radio value={3}>通过</Radio>
                  <Radio value={4}>拒绝</Radio>
                </Radio.Group>
              )
            }
          </Form.Item>
          {
            this.form.getFieldValue('signingStatus') === 4
              ? (
                <Form.Item label="审核意见">
                  {
                    this.form.getFieldDecorator('auditOpinion', {
                      rules: [
                        {
                          required: true, whitespace: true, message: '请输入审核意见！', trigger: 'blur'
                        }
                      ]
                    })(
                      <Input.TextArea
                        placeholder="请输入审核意见"
                        autoSize={{ minRows: 6 }}
                      />
                    )
                  }
                </Form.Item>
              )
              : null
          }
        </Form>
      </DragModal>
    )
  }
})

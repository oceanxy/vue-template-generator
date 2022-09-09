import '../assets/styles/index.scss'
import { Form, Input, Radio } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {
      modalProps: {
        width: 690,
        okText: '确定'
      }
    }
  },
  render() {
    const attributes = {
      attrs: this.modalProps,
      on: {
        cancel: () => this.onCancel(),
        ok: () => this.onSubmit({ customApiName: 'auditAccountApply' })
      }
    }

    return (
      <DragModal {...attributes}>
        <Form
          class="bnm-form-grid"
          colon={false}
        >
          <Form.Item label="审核结果">
            {
              this.form.getFieldDecorator('auditStatus', {
                rules: [
                  {
                    required: true,
                    type: 'number',
                    message: '请选择审核结果!',
                    trigger: 'blur'
                  }
                ]
              })(
                <Radio.Group>
                  <Radio value={1}>通过</Radio>
                  <Radio value={3}>驳回</Radio>
                </Radio.Group>
              )
            }
          </Form.Item>
          <Form.Item label="审核意见">
            {
              this.form.getFieldDecorator('auditOpinion', {
                rules: [
                  {
                    required: true,
                    message: '请输入审核意见!',
                    trigger: 'blur'
                  }
                ]
              })(
                <Input.TextArea placeholder="请输入审核意见" autoSize={{ minRows: 6 }} />
              )
            }
          </Form.Item>
        </Form>
      </DragModal>
    )
  }
})

import '../assets/styles/index.scss'
import { Form, Input, Radio } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'

export default Form.create({})({
  mixins: [forFormModal()],
  props: {
    /**
     * 标题（可定义占位符）
     * “{action}” 为占位符，稍后会在 mixin 中替换为对应的字符，比如“新增”、“编辑”
     */
    modalTitle: {
      type: String,
      default: '{action}'
    }
  },
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
        ok: () => this.onSubmit()
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
                rules: [{ required: true, type: 'number', message: '请选择审核结果!', trigger: 'blur' }]
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
                rules: [{ required: true, message: '请输入审核意见!', trigger: 'blur' }]
              })(
                <Input placeholder="请输入审核意见" type="textarea" />
              )
            }
          </Form.Item>
        </Form>
      </DragModal>
    )
  }
})

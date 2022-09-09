import '../assets/styles/index.scss'
import { Form, Input, InputNumber, Radio } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import { mapGetters } from 'vuex'
import DragModal from '@/components/DragModal'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {modalProps: {width: 600}}
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    indicatorCategoryTree() {
      return this.getState('indicatorCategoryTree', 'common')
    }
  },
  render() {
    const attributes = {
      attrs: this.modalProps,
      on: {
        cancel: () => this.onCancel(),
        ok: () => this.onSubmit({ customApiName: 'auditReport' })
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
                rules: [{
                  required: true, type: 'number', message: '请选择审核结果!', trigger: 'change'
                }]
              })(
                <Radio.Group>
                  <Radio value={1}>通过</Radio>
                  <Radio value={3}>驳回</Radio>
                </Radio.Group>
              )
            }
          </Form.Item>
          <Form.Item label="租金补缴金额">
            {
              this.form.getFieldDecorator('rentPay', {
                initialValue: 0,
                rules: [{
                  required: true, type: 'number', message: '请输入补缴租金金额!', trigger: 'blur'
                }]
              })(
                <InputNumber
                  placeholder="请输入补缴租金金额"
                  allowClear
                  precision={2}
                  style={{ width: '100%' }}
                />
              )
            }
          </Form.Item>
          <Form.Item label="审核意见">
            {
              this.form.getFieldDecorator('auditOpinion', {
                rules: [{
                  required: true, message: '请输入审核意见!', trigger: 'blur'
                }]
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

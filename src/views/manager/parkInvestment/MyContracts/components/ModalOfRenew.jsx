import { Form, Radio } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import { omit } from 'lodash'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {
      modalProps: {
        width: 500,
        okText: '确定'
      },
      visibleField: 'visibleOfRenew'
    }
  },
  render() {
    const attributes = {
      attrs: this.modalProps,
      on: {
        cancel: () => this.onCancel(this.visibleField),
        ok: () => this.onSubmit({
          customApiName: 'renewalApplication',
          customDataHandler: values => {
            return {
              ...omit(values, 'id'),
              contractId: this.currentItem.id
            }
          }
        })
      }
    }

    return (
      <DragModal {...attributes}>
        <Form
          class="bnm-form-grid"
          colon={false}
        >
          <Form.Item label="续约模式">
            {
              this.form.getFieldDecorator('renewalType', {
                rules: [{
                  required: true, type: 'number', message: '请选择续约模式!', trigger: 'change' 
                }]
              })(
                <Radio.Group>
                  <Radio value={1}>旧合同延期</Radio>
                  <Radio value={2}>签订新合同</Radio>
                </Radio.Group>
              )
            }
          </Form.Item>
          <Form.Item label="费用核算">
            {
              this.form.getFieldDecorator('accountingType', {
                rules: [{
                  required: true, type: 'number', message: '请选择费用核算方式!', trigger: 'change' 
                }]
              })(
                <Radio.Group>
                  <Radio value={1}>沿用旧合同</Radio>
                  <Radio value={2}>重新核算费用</Radio>
                </Radio.Group>
              )
            }
          </Form.Item>
        </Form>
      </DragModal>
    )
  }
})

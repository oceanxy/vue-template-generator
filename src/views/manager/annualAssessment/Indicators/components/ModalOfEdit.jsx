import '../assets/styles/index.scss'
import { Form, Input, InputNumber, Radio, Switch } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import { mapGetters } from 'vuex'
import DragModal from '@/components/DragModal'
import GradingMultiInput from './GradingMultiInput'
import SupportingMaterialMultiInput from './SupportingMaterialMultiInput'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {
      modalProps: {
        width: 810
      }
    }
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
        ok: () => this.onSubmit()
      }
    }

    return (
      <DragModal {...attributes}>
        <Form
          class="bnm-form-grid"
          colon={false}
        >
          <Form.Item label="名称">
            {
              this.form.getFieldDecorator('fullName', {
                initialValue: this.currentItem.fullName,
                rules: [{ required: true, message: '请输入名称!', trigger: 'blur' }]
              })(
                <Input placeholder="请输入名称" allowClear />
              )
            }
          </Form.Item>
          <Form.Item label="类型">
            {
              this.form.getFieldDecorator('targetType', {
                initialValue: this.currentItem.targetType,
                rules: [{ required: true, type: 'number', message: '请选择类型!', trigger: 'change' }]
              })(
                <Radio.Group>
                  <Radio value={1}>标准评估项</Radio>
                  <Radio value={2}>扣分项</Radio>
                  <Radio value={3}>加分项</Radio>
                </Radio.Group>
              )
            }
          </Form.Item>
          <Form.Item label="解释">
            {
              this.form.getFieldDecorator('description', {
                initialValue: this.currentItem.description
              })(
                <Input.TextArea placeholder="请输入解释" />
              )
            }
          </Form.Item>
          <Form.Item label={'评分标准'}>
            {
              this.form.getFieldDecorator('targetOptionList', {
                initialValue: this.currentItem.targetOptionList || [],
                rules: [{ required: true, type: 'array', message: '请输入评分标准!', trigger: 'change' }]
              })(
                <GradingMultiInput />
              )
            }
          </Form.Item>
          <Form.Item label={'佐证材料'}>
            {
              this.form.getFieldDecorator('targetProveList', {
                initialValue: this.currentItem.targetProveList || [],
                rules: [{ required: true, type: 'array', message: '请输入评分标准!', trigger: 'change' }]
              })(
                <SupportingMaterialMultiInput />
              )
            }
          </Form.Item>
          <Form.Item label="排序" class={'half'}>
            {
              this.form.getFieldDecorator('sortIndex', {
                initialValue: this.currentItem.sortIndex || 0,
                rules: [{ required: true, type: 'number', message: '请输入排序值!', trigger: 'blur' }]
              })(
                <InputNumber placeholder="请输入排序值" style={{ width: '100%' }} />
              )
            }
          </Form.Item>
          <Form.Item label="状态" class={'half'}>
            {
              this.form.getFieldDecorator('status', {
                valuePropName: 'checked',
                initialValue: this.currentItem.id ? this.currentItem.status === 1 : true,
                rules: [{ required: true, type: 'boolean', message: '请选择状态!', trigger: 'blur' }]
              })(
                <Switch />
              )
            }
          </Form.Item>
        </Form>
      </DragModal>
    )
  }
})

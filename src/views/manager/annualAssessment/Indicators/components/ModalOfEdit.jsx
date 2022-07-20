import '../assets/styles/index.scss'
import { Form, Input, InputNumber, Radio, Spin, Switch, TreeSelect } from 'ant-design-vue'
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
    indicatorCategoryLikeTree() {
      return this.getState('indicatorCategoryLikeTree', this.moduleName)
    }
  },
  watch: {
    visible: {
      immediate: true,
      async handler(value) {
        if (value) {
          await this.$store.dispatch('getListForSelect', {
            moduleName: this.moduleName,
            stateName: 'indicatorCategoryLikeTree',
            customApiName: 'getIndicatorCategoryLikeTree'
          })
        }
      }
    }
  },
  methods: {
    // 此处验证仅是配合自定义验证，用于在输入控件 change 或 blur 后清空验证信息
    validator(rule, value, callback) {
      if (Array.isArray(value) && value.length) {
        callback()
      }

      callback(new Error(rule.message))
    }
  },
  render() {
    const attributes = {
      attrs: this.modalProps,
      on: {
        cancel: () => this.onCancel(),
        ok: () => this.onSubmit({
          customValidation: () => {
            const targetOptionList = this.form.getFieldValue('targetOptionList') || []
            const _targetOptionList = targetOptionList.filter(item => item.serialNum && item.optionValue && item.score)

            if (_targetOptionList.length) {
              this.form.setFields({ targetOptionList: { value: _targetOptionList } })
            } else {
              this.form.setFields({ targetOptionList: { value: targetOptionList, errors: [new Error('请输入评分标准！')] } })
            }

            const targetProveList = this.form.getFieldValue('targetProveList') || []
            const _targetProveList = targetProveList.filter(item => item.serialNum && item.fullName)

            if (_targetProveList.length) {
              this.form.setFields({ targetProveList: { value: _targetProveList } })
            } else {
              this.form.setFields({ targetProveList: { value: targetProveList, errors: [new Error('请输入佐证材料！')] } })
            }

            return !!_targetOptionList.length && !!_targetProveList.length
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
          <Form.Item label="名称" class={'half'}>
            {
              this.form.getFieldDecorator('fullName', {
                initialValue: this.currentItem.fullName,
                rules: [{ required: true, message: '请输入名称!', trigger: 'blur' }]
              })(
                <Input placeholder="请输入名称" allowClear />
              )
            }
          </Form.Item>
          <Form.Item label="类别" class={'half'}>
            <Spin spinning={this.indicatorCategoryLikeTree.loading}>
              {
                this.form.getFieldDecorator('catId', {
                  initialValue: this.currentItem.catId,
                  rules: [{ required: true, message: '请选择指标类别!', trigger: 'change' }]
                })(
                  <TreeSelect
                    treeDefaultExpandedKeys={[this.currentItem.catId]}
                    showSearch
                    allowClear
                    treeData={this.indicatorCategoryLikeTree.list}
                    replaceFields={{ children: 'children', title: 'name', key: 'id', value: 'id' }}
                    searchPlaceholder={'请输入关键字以搜索'}
                    placeholder={'请选择指标类别'}
                  />
                )
              }
            </Spin>
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
                rules: [{ required: true, validator: this.validator, message: '请输入评分标准!', trigger: 'change' }]
              })(
                <GradingMultiInput />
              )
            }
          </Form.Item>
          <Form.Item label={'佐证材料'}>
            {
              this.form.getFieldDecorator('targetProveList', {
                initialValue: this.currentItem.targetProveList || [],
                rules: [{ required: true, validator: this.validator, message: '请输入佐证材料!', trigger: 'change' }]
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

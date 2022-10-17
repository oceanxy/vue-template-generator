import '../assets/styles/index.scss'
import { Form, Input, InputNumber, Spin, Switch, TreeSelect } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import { mapGetters } from 'vuex'
import DragModal from '@/components/DragModal'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return { modalProps: { width: 810 } }
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
          <Form.Item
            label="名称"
            class={'half'}
          >
            {
              this.form.getFieldDecorator('fullName', {
                initialValue: this.currentItem.fullName,
                rules: [
                  {
                    required: true, message: '请输入名称!', trigger: 'blur'
                  }
                ]
              })(
                <Input
                  placeholder="请输入名称"
                  allowClear
                />
              )
            }
          </Form.Item>
          <Form.Item
            label="类别"
            class={'half'}
          >
            <Spin spinning={this.indicatorCategoryTree.loading}>
              {
                this.form.getFieldDecorator('parentId', {
                  initialValue: this.currentItem.parentId,
                  rules: [
                    {
                      required: true, message: '请选择指标类别!', trigger: 'change'
                    }
                  ]
                })(
                  <TreeSelect
                    treeDefaultExpandedKeys={[this.currentItem.parentId]}
                    showSearch
                    allowClear
                    treeData={this.indicatorCategoryTree.list}
                    replaceFields={{
                      children: 'children', title: 'name', key: 'id', value: 'id'
                    }}
                    treeNodeFilterProp={'title'}
                    searchPlaceholder={'请输入关键字以搜索'}
                    placeholder={'请选择指标类别'}
                  />
                )
              }
            </Spin>
          </Form.Item>
          <Form.Item label="描述">
            {
              this.form.getFieldDecorator('description', { initialValue: this.currentItem.description })(
                <Input.TextArea
                  placeholder="请输入排序值"
                  autoSize={{ minRows: 6 }}
                />
              )
            }
          </Form.Item>
          <Form.Item
            label="排序"
            class={'half'}
          >
            {
              this.form.getFieldDecorator('sortIndex', {
                initialValue: this.currentItem.sortIndex || 0,
                rules: [
                  {
                    required: true, type: 'number', message: '请输入排序值!', trigger: 'blur'
                  }
                ]
              })(
                <InputNumber
                  placeholder="请输入排序值"
                  style={{ width: '100%' }}
                />
              )
            }
          </Form.Item>
          <Form.Item
            label="状态"
            class={'half'}
          >
            {
              this.form.getFieldDecorator('status', {
                valuePropName: 'checked',
                initialValue: this.currentItem.id ? this.currentItem.status === 1 : true,
                rules: [
                  {
                    required: true,
                    type: 'boolean',
                    message: '请选择状态!',
                    trigger: 'change'
                  }
                ]
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

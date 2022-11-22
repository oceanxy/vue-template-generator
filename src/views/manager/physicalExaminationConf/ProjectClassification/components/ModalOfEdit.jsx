import '../assets/styles/index.scss'
import { Form, Input, Switch } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import { mapGetters } from 'vuex'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {
      modalProps: {
        width: 600,
        wrapClassName: 'bnm-modal-edit-user-form'
      }
    }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    getList() {
      return this.getState('list', this.moduleName) || []
    }

  },
  methods: {
    customDataHandler(values) {
      const data = { ...values }

      data.parentId = this.currentItem?.parentId ?? this.getList?.[0].parentId ?? ''

      return data
    },
  },
  render() {
    const attributes = {
      attrs: this.modalProps,
      on: {
        cancel: () => this.onCancel(),
        ok: () => this.onSubmit({ customDataHandler: this.customDataHandler })
      }
    }

    return (
      <DragModal {...attributes}>
        <Form
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 17 }}
          colon={false}
        >
          <Form.Item label="所属分类">
            {
              this.form.getFieldDecorator('fullName', {
                initialValue: '体检项目',
              })(
                <Input
                  disabled={true}
                  allowClear
                />
              )
            }
          </Form.Item>
          <Form.Item label="分类名称">
            {
              this.form.getFieldDecorator('catalogName', {
                initialValue: this.currentItem.catalogName,
                rules: [
                  {
                    required: true,
                    message: '请输入姓名!',
                    trigger: 'blur'
                  }
                ]
              })(
                <Input
                  placeholder="请输入"
                  allowClear
                />
              )
            }
          </Form.Item>
          <Form.Item label="备注">
            {
              this.form.getFieldDecorator('remark', {
                initialValue: this.currentItem.remark
              })(
                <Input
                  placeholder="请输入"
                  allowClear
                />
              )
            }
          </Form.Item>

          <Form.Item label="排序">
            {
              this.form.getFieldDecorator('sortIndex', {
                initialValue: this.currentItem.sortIndex || 0,
                rules: [
                  {
                    required: true,
                    type: 'number',
                    message: '请输入排序!',
                    trigger: 'blur'
                  }
                ]
              })(
                <Input
                  placeholder="请输入"
                  allowClear
                />
              )
            }
          </Form.Item>
          <Form.Item label="状态">
            {
              this.form.getFieldDecorator('status', {
                initialValue: this.currentItem.status === 1,
                valuePropName: 'checked'
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

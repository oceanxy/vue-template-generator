import { Form, Input, Switch, TreeSelect } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return { modalProps: { width: 700 } }
  },
  computed: {
    attributes() {
      return {
        attrs: this.modalProps,
        on: {
          cancel: () => this.onCancel(),
          ok: () => this.onSubmit({ customDataHandler: this.customDataHandler })
        }
      }
    },
    roleTree() {
      return this.$store.state[this.moduleName].roleTree
    },
    search() {
      return this.$store.state[this.moduleName].search
    }
  },
  methods: {
    customDataHandler(values) {
      const data = { ...values }

      if (data.parentId.length > 0) {
        data.parentId = data.parentId[data.parentId.length - 1]
      } else {
        data.parentId = ''
      }

      if (data.indexMenuId.length > 0) {
        data.indexMenuId = data.indexMenuId[data.indexMenuId.length - 1]
      } else {
        data.indexMenuId = ''
      }

      data.id = this.currentItem?.id ?? ''

      return data
    }
  },
  render() {
    return (
      <DragModal {...this.attributes}>
        <Form colon={false} class={'tg-form-grid'}>
          <Form.Item label="父级" class={'half'}>
            {
              this.form.getFieldDecorator('parentId', {
                initialValue: this.currentItem.parentId || this.search.parentId,
                rules: [
                  {
                    required: true,
                    message: '请选择父级！',
                    trigger: 'blur'
                  }
                ]
              })(
                <TreeSelect
                  showSearch
                  disabled
                  treeNodeFilterProp={'title'}
                  dropdownClassName={'tg-select-dropdown'}
                  treeData={this.roleTree.list}
                  replaceFields={{
                    children: 'children',
                    title: 'name',
                    key: 'id',
                    value: 'id'
                  }}
                  searchPlaceholder={'请输入关键字以搜索'}
                  placeholder={'请选择所属角色'}
                  treeDefaultExpandedKeys={[this.currentItem.parentId || this.search.parentId]}
                />
              )
            }
          </Form.Item>
          <Form.Item label="名称" class={'half'}>
            {
              this.form.getFieldDecorator('fullName', {
                initialValue: this.currentItem.fullName,
                rules: [
                  {
                    required: true,
                    message: '请输入名称！',
                    trigger: 'blur'
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
          <Form.Item label="角色描述">
            {
              this.form.getFieldDecorator('roleDescribe', { initialValue: this.currentItem.roleDescribe })(
                <Input.TextArea
                  placeholder="请输入名称"
                  allowClear
                />
              )
            }
          </Form.Item>
          <Form.Item label="排序" class={'half'}>
            {
              this.form.getFieldDecorator('sortIndex', {
                initialValue: this.currentItem.sortIndex ?? 0,
                rules: [
                  {
                    required: true,
                    message: '请输入排序值！',
                    trigger: 'blur'
                  }
                ]
              })(
                <Input
                  placeholder="数值越大排在越前"
                  allowClear
                />
              )
            }
          </Form.Item>
          <Form.Item label="状态" class={'half'}>
            {
              this.form.getFieldDecorator('status', {
                initialValue: this.currentItem.id ? this.currentItem.status === 1 : true,
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

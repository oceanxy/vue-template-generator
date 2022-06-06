import { Form, Input, Modal, Select } from 'ant-design-vue'
import formModal from '@/mixins/formModal'
import { mapState } from 'vuex'
import '../assets/styles/index.scss'

export default Form.create({})({
  mixins: [formModal],
  data() {
    return {
      modalAttrs: {
        width: 400
      }
    }
  },
  computed: mapState({
    allSiteApps: 'allSiteApps',
    allFunctionalModules: 'allFunctionalModules'
  }),
  watch: {
    async visible(value) {
      if (value) {
        await this.$store.dispatch('getAllFunctionalModules')
      }
    }
  },
  render() {
    const attributes = {
      props: this.modalAttrs,
      on: {
        cancel: this.onCancel,
        ok: this.onSubmit
      }
    }

    return (
      <Modal
        title={`${this.title}模块`}
        visible={this.visible}
        {...attributes}
      >
        <Form
          class="bn-functional-modules-edit-form"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          colon={false}
        >
          <Form.Item label="所属站点">
            {
              this.form.getFieldDecorator('appId', {
                initialValue: this.currentItem.appId,
                rules: [{ required: true, message: '请选择所属站点!', trigger: 'change' }]
              })(
                <Select placeholder="请选择所属站点" allowClear>
                  {
                    this.allSiteApps.map(item => (
                      <Select.Option value={item.id}>
                        {item.appName}
                      </Select.Option>
                    ))
                  }
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label="父级页面">
            {
              this.form.getFieldDecorator('parentId', {
                initialValue: this.currentItem.parentId,
                rules: [{ required: true, message: '请选择父级页面!', trigger: 'change' }]
              })(
                <Select placeholder="请选择父级页面" allowClear>
                  {
                    this.allFunctionalModules.map(item => (
                      <Select.Option value={item.id}>
                        {item.moduleName}
                      </Select.Option>
                    ))
                  }
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label="模块名称">
            {
              this.form.getFieldDecorator('moduleName', {
                initialValue: this.currentItem.moduleName,
                rules: [{ required: true, message: '请输入模块名称!', trigger: 'blur' }]
              })(
                <Input placeholder="请输入模块名称" allowClear />
              )
            }
          </Form.Item>
          <Form.Item label="模块描述">
            {
              this.form.getFieldDecorator('remark', {
                initialValue: this.currentItem.remark
              })(
                <Input placeholder="请输入模块描述" type="textarea" />
              )
            }
          </Form.Item>
          <Form.Item label="排序">
            {
              this.form.getFieldDecorator('sortIndex', {
                initialValue: this.currentItem.sortIndex || 0
              })(
                <Input placeholder="请输入排序" allowClear />
              )
            }
          </Form.Item>
        </Form>
      </Modal>
    )
  }
})

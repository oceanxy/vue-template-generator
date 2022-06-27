import '../assets/styles/index.scss'
import { Form, Icon, Input, Switch, Upload } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import { mapState } from 'vuex'
import DragModal from '@/components/DragModal'
import MultiInput from '@/views/manager/basis/Teams/components/MultiInput'
import UploadPictures from '@/views/manager/parkSupervision/technologyBureau/Parks/components/UploadPictures'

export default Form.create({})({
  mixins: [forFormModal()],
  props: {
    /**
     * 标题（可定义占位符）
     * “{action}” 为占位符，稍后会在 mixin 中替换为对应的字符，比如“新增”、“编辑”
     */
    title: {
      type: String,
      default: '{action}'
    }
  },
  data() {
    return {
      modalProps: {
        width: 900
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
        // await this.$store.dispatch('getAllFunctionalModules')
      }
    }
  },
  render() {
    const attributes = {
      attrs: this.modalProps,
      on: {
        cancel: () => this.onCancel(),
        ok: this.onSubmit
      }
    }

    return (
      <DragModal {...attributes} class={'bnm-team-edit-modal'}>
        <Form
          class="bnm-form-grid"
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 21 }}
          colon={false}
        >
          <Form.Item label="LOGO">
            {
              this.form.getFieldDecorator('logo', {
                initialValue: this.currentItem.logo,
                rules: [{ required: true, message: '请上传LOGO!', trigger: 'blur' }]
              })(
                <UploadPictures />
              )
            }
          </Form.Item>
          <Form.Item label="编号" class={'half'}>
            {
              this.form.getFieldDecorator('teamCode', {
                initialValue: this.currentItem.teamCode,
                rules: [{ required: true, message: '请输入编号!', trigger: 'blur' }]
              })(
                <Input placeholder="请输入编号" allowClear />
              )
            }
          </Form.Item>
          <Form.Item label="名称" class={'half'}>
            {
              this.form.getFieldDecorator('fullName', {
                initialValue: this.currentItem.fullName,
                rules: [{ required: true, message: '请输入团队名称!', trigger: 'blur' }]
              })(
                <Input placeholder="请输入名称" allowClear />
              )
            }
          </Form.Item>
          <Form.Item label="描述">
            {
              this.form.getFieldDecorator('description', {
                initialValue: this.currentItem.description
              })(
                <Input.TextArea placeholder="请输入描述" allowClear />
              )
            }
          </Form.Item>
          <Form.Item label="团队成员">
            {
              this.form.getFieldDecorator('teamMemberList', {
                initialValue: this.currentItem.teamMemberList,
                rules: [{ required: true, type: 'array', message: '请添加团队成员!', trigger: 'change' }]
              })(
                <MultiInput />
              )
            }
          </Form.Item>
          <Form.Item label="排序" class={'half'}>
            {
              this.form.getFieldDecorator('sortIndex', {
                initialValue: this.currentItem.sortIndex || 0,
                rules: [{ required: true, type: 'number', message: '请输入排序值!', trigger: 'blur' }]
              })(
                <Input placeholder="请输入排序值" />
              )
            }
          </Form.Item>
          <Form.Item label="状态" class={'half'}>
            {
              this.form.getFieldDecorator('status', {
                valuePropName: 'checked',
                initialValue: this.currentItem.status === 1,
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

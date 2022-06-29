import '../assets/styles/index.scss'
import { Form, Icon, Input, Radio, Switch, Upload } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import { mapState } from 'vuex'
import DragModal from '@/components/DragModal'
import BNUploadPictures from '@/components/BNUploadPictures'

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
        width: 810
      }
    }
  },
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
        ok: () => this.onSubmit()
      }
    }

    // 回显图片
    const fileList = []

    if (this.currentItem.headPortrait) {
      fileList.push({
        uid: 'headPortrait',
        url: this.currentItem.headPortraitStr,
        key: this.currentItem.headPortrait,
        status: 'done',
        name: this.currentItem.headPortrait?.substring(this.currentItem.headPortrait?.lastIndexOf('/'))
      })
    }

    return (
      <DragModal {...attributes}>
        <Form
          class="bnm-form-grid"
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 21 }}
          colon={false}
        >
          <Form.Item label="头像">
            {
              this.form.getFieldDecorator('headPortrait', {
                initialValue: fileList
              })(
                <BNUploadPictures limit={1} />
              )
            }
          </Form.Item>
          <Form.Item label="姓名" class={'half'}>
            {
              this.form.getFieldDecorator('fullName', {
                initialValue: this.currentItem.fullName,
                rules: [{ required: true, message: '请输入姓名!', trigger: 'blur' }]
              })(
                <Input placeholder="请输入姓名" allowClear />
              )
            }
          </Form.Item>
          <Form.Item label="手机号码" class={'half'}>
            {
              this.form.getFieldDecorator('mobile', {
                initialValue: this.currentItem.mobile,
                rules: [{ required: true, message: '请输入手机号码!', trigger: 'blur' }]
              })(
                <Input placeholder="请输入手机号码" />
              )
            }
          </Form.Item>
          <Form.Item label="身份证号" class={'half'}>
            {
              this.form.getFieldDecorator('idCard', {
                initialValue: this.currentItem.idCard,
                rules: [{ required: true, message: '请输入身份证号码!', trigger: 'blur' }]
              })(
                <Input placeholder="请输入身份证号码" />
              )
            }
          </Form.Item>
          <Form.Item label="性别" class={'half'}>
            {
              this.form.getFieldDecorator('gender', {
                initialValue: this.currentItem.gender || 0
              })(
                <Radio.Group>
                  <Radio value={0}>未知</Radio>
                  <Radio value={1}>男</Radio>
                  <Radio value={2}>女</Radio>
                </Radio.Group>
              )
            }
          </Form.Item>
          <Form.Item label="电子邮箱" class={'half'}>
            {
              this.form.getFieldDecorator('email', {
                initialValue: this.currentItem.email
              })(
                <Input placeholder="请输入电子邮箱" />
              )
            }
          </Form.Item>
          <Form.Item label="简介">
            {
              this.form.getFieldDecorator('description', {
                initialValue: this.currentItem.description
              })(
                <Input.TextArea placeholder="请输入排序值" />
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

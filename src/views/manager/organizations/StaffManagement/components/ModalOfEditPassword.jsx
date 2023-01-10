import { Form, Input, message as Message } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {
      modalProps: { width: 610 },
      visibilityFieldName: 'visibilityOfEditPassword'
    }
  },
  computed: {
    attributes() {
      return {
        attrs: this.modalProps,
        on: {
          cancel: () => this.onCancel('visibilityOfEditPassword'),
          ok: () => this.onSubmit({
            isFetchList: this.moduleName !== 'login',
            customApiName: 'updatePasswordOfStaff',
            customDataHandler: value => {
              value.ids = this.currentItem.id

              return value
            },
            done: async () => {
              await this.$store.dispatch('login/logout')

              Message.success('密码修改成功，请重新登录！')
            }
          })
        }
      }
    }
  },
  render() {
    return (
      <DragModal {...this.attributes}>
        <Form class="tg-form-grid" colon={false}>
          <Form.Item label="密码">
            {
              this.form.getFieldDecorator('pwd', {
                initialValue: '',
                rules: [
                  {
                    required: true,
                    message: '请输入职员登录密码！',
                    trigger: 'blur'
                  }
                ]
              })(
                <Input placeholder="请输入职员登录密码" allowClear type={'password'} />
              )
            }
          </Form.Item>
        </Form>
      </DragModal>
    )
  }
})

import '../assets/styles/index.scss'
import { Form, Input } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'

export default Form.create({ name: 'updatePasswordForm' })({
  mixins: [forFormModal()],
  data() {
    return {
      modalProps: {width: 500},
      visibleField: 'visibleOfUpdatePassword'
    }
  },
  computed: {},
  watch: {
    async visible(value) {
      //
    }
  },
  render() {
    const attributes = {
      attrs: this.modalProps,
      on: {
        cancel: () => this.onCancel(this.visibleField),
        ok: () => this.onSubmit({
          isFetchList: false,
          customApiName: 'updatePasswordOfParkAccounts'
        })
      }
    }

    return (
      <DragModal {...attributes}>
        <Form
          class={'bnm-form-grid'}
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 21 }}
          colon={false}
        >
          <Form.Item label="新密码">
            {
              this.form.getFieldDecorator('pwd', {
                rules: [{
                  required: true, message: '请输入新登录密码!', trigger: 'blur' 
                }]
              })(
                <Input placeholder={'请输入新登录密码'} />
              )
            }
          </Form.Item>
        </Form>
      </DragModal>
    )
  }
})

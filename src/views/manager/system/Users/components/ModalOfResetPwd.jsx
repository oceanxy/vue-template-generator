import '../assets/styles/index.scss'
import { Form, Input, message } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import apis from '@/apis'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {
      visibleField: 'visibleOfResetPwd',
      modalProps: {
        confirmLoading: false,
        width: 400,
        wrapclass: 'bnm-modal-config-resetpwd'
      },
      defaultCheckedKeysData: []
    }
  },
  computed: {},
  watch: {
    visible: {
      immediate: true,
      async handler(value) {
        if (!value) {
          //
        }
      }
    }
  },
  methods: {
    async onSubmit() {
      this.form.validateFields(async (err, values) => {
        if (err) return

        this.modalProps.confirmLoading = true
        const res = await apis.employeeResetPwd({
          ids: this.currentItem.id,
          ...values
        })

        this.modalProps.confirmLoading = false

        if (res.status) {
          message.success('重置完成')
          this.onCancel(this.visibleField)
        }
      })
    }
  },
  render() {
    const attributes = {
      attrs: this.modalProps,
      on: {
        cancel: () => this.onCancel(this.visibleField),
        ok: () => this.onSubmit()
      }
    }

    return (
      <DragModal {...attributes}>
        <Form
          class=""
          colon={false}
        >
          <Form.Item label="新密码">
            {this.form.getFieldDecorator('pwd', {
              initialValue: '',
              rules: [
                {
                  required: true, message: '请输入密码!', trigger: 'blur'
                }
              ]
            })(<Input
              placeholder="请输入"
              allowClear
            />)}
          </Form.Item>
        </Form>
      </DragModal>
    )
  }
})

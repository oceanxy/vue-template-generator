import '../assets/styles/index.scss'
import { Form, Input, InputNumber, Radio, Switch } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import BNUploadPictures from '@/components/BNUploadPictures'
import { verifyEmail, verifyIDNumber, verifyMobileNumber } from '@/utils/validators'
import { cloneDeep } from 'lodash'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return { modalProps: { width: 810 } }
  },
  computed: {
    fileList() {
      return this.currentItem.headPortrait
        ? [
          {
            uid: 'headPortrait',
            key: this.currentItem.headPortrait,
            url: this.currentItem.headPortraitStr,
            status: 'done',
            name: this.currentItem.headPortrait?.substring(this.currentItem.headPortrait?.lastIndexOf('/'))
          }
        ]
        : []
    }
  },
  render() {
    const attributes = {
      attrs: this.modalProps,
      on: {
        cancel: () => this.onCancel(),
        ok: () => this.onSubmit({
          customDataHandler: values => {
            const temp = cloneDeep(values)

            temp.teamId = this.$route.query.teamId

            if (temp.headPortrait.length) {
              temp.headPortrait = temp.headPortrait[0].response?.data[0].key ?? temp.headPortrait[0].key
            } else {
              temp.headPortrait = ''
            }

            return temp
          }
        })
      }
    }

    return (
      <DragModal {...attributes}>
        <Form
          class="tg-form-grid"
          colon={false}
        >
          <Form.Item label="头像">
            {
              this.form.getFieldDecorator('headPortrait', { initialValue: this.fileList })(
                <BNUploadPictures limit={1} />
              )
            }
          </Form.Item>
          <Form.Item
            label="姓名"
            class={'half'}
          >
            {
              this.form.getFieldDecorator('fullName', {
                initialValue: this.currentItem.fullName,
                rules: [
                  {
                    required: true, message: '请输入姓名!', trigger: 'blur'
                  }
                ]
              })(
                <Input
                  placeholder="请输入姓名"
                  allowClear
                />
              )
            }
          </Form.Item>
          <Form.Item
            label="手机号码"
            class={'half'}
          >
            {
              this.form.getFieldDecorator('mobile', {
                initialValue: this.currentItem.mobile,
                rules: [
                  {
                    required: true,
                    message: '请输入手机号码!',
                    trigger: 'blur'
                  },
                  { validator: verifyMobileNumber }
                ]
              })(
                <Input placeholder="请输入手机号码" />
              )
            }
          </Form.Item>
          <Form.Item
            label="身份证号"
            class={'half'}
          >
            {
              this.form.getFieldDecorator('idCard', {
                initialValue: this.currentItem.idCard,
                rules: [
                  {
                    required: true,
                    message: '请输入身份证号码!',
                    trigger: 'blur'
                  },
                  { validator: verifyIDNumber }
                ]
              })(
                <Input placeholder="请输入身份证号码" />
              )
            }
          </Form.Item>
          <Form.Item
            label="性别"
            class={'half'}
          >
            {
              this.form.getFieldDecorator('gender', { initialValue: this.currentItem.gender || 1 })(
                <Radio.Group>
                  <Radio value={1}>男</Radio>
                  <Radio value={2}>女</Radio>
                </Radio.Group>
              )
            }
          </Form.Item>
          <Form.Item
            label="电子邮箱"
            class={'half'}
          >
            {
              this.form.getFieldDecorator('email', {
                initialValue: this.currentItem.email,
                rules: [{ validator: verifyEmail }]
              })(
                <Input placeholder="请输入电子邮箱" />
              )
            }
          </Form.Item>
          <Form.Item label="简介">
            {
              this.form.getFieldDecorator('description', { initialValue: this.currentItem.description })(
                <Input.TextArea
                  placeholder="请输入简介"
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
                  style={{ width: '100%' }}
                  placeholder="请输入排序值"
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

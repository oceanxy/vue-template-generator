import '../assets/styles/index.scss'
import { Form, Input, Switch, InputNumber, Row, Col } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import { verifyPhoneNumber } from '@/utils/validators'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {
      modalProps: {
        width: 800,
        wrapClassName: 'bnm-modal-edit-user-form'
      }
    }
  },
  computed: {
    disabledPwd() {
      if (this.currentItem && this.currentItem.pwd) {
        return true
      }
    },
    attributes() {
      return {
        attrs: this.modalProps,
        on: {
          cancel: () => this.onCancel(),
          ok: () => this.onSubmit({ customDataHandler: this.customDataHandler })
        }
      }
    }
  },
  methods: {
    customDataHandler(values) {
      const data = { ...values }

      if (this.currentItem && this.currentItem.pwd) {
        delete data.pwd
      }

      return data
    }
  },
  render() {
    return (
      <DragModal {...this.attributes}>
        <Form
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 18 }}
          colon={false}
        >
          <Row>
            <Col span={12}>
              <Form.Item label="设备编号">
                {
                  this.form.getFieldDecorator('eqId', {
                    initialValue: this.currentItem.eqId,
                    rules: [
                      {
                        required: true,
                        message: '请输入设备编号!',
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
            </Col>
            <Col span={12}>
              <Form.Item label="设备名称">
                {
                  this.form.getFieldDecorator('eqName', {
                    initialValue: this.currentItem.eqName,
                    rules: [
                      {
                        required: true,
                        message: '请输入设备名称!',
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
            </Col>
            <Col span={12}>
              <Form.Item label="厂家">
                {
                  this.form.getFieldDecorator('manufactor', {
                    initialValue: this.currentItem.manufactor,
                    rules: [
                      {
                        required: true,
                        message: '请输入厂家!',
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
            </Col>
            <Col span={12}>
              <Form.Item label="联系电话">
                {
                  this.form.getFieldDecorator('contactTel', {
                    initialValue: this.currentItem.contactTel,
                    rules: [{ required: true, validator: verifyPhoneNumber }]
                  })(
                    <Input
                      placeholder="请输入"
                      allowClear
                    />
                  )
                }
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="用户名">
                {
                  this.form.getFieldDecorator('userName', {
                    initialValue: this.currentItem.userName,
                    rules: [
                      {
                        required: true,
                        message: '请输入用户名!',
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
            </Col>
            <Col span={12}>
              <Form.Item label="密码">
                {
                  this.form.getFieldDecorator('pwd', {
                    initialValue: this.currentItem.pwd,
                    rules: [
                      {
                        required: true,
                        message: '请输入密码!',
                        trigger: 'blur'
                      }
                    ]
                  })(
                    <Input
                      placeholder="请输入"
                      disabled={this.disabledPwd}
                      allowClear
                    />
                  )
                }
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="备注">
                {
                  this.form.getFieldDecorator('remark', { initialValue: this.currentItem.remark })(
                    <Input
                      placeholder="请输入"
                      allowClear
                    />
                  )
                }
              </Form.Item>
            </Col>
            <Col span={12}>
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
                    <InputNumber
                      style={{ width: '100%' }}
                      placeholder="请输入"
                      allowClear
                    />
                  )
                }
              </Form.Item>
            </Col>
            <Col span={12}>
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
            </Col>
          </Row>
        </Form>
      </DragModal>
    )
  }
})

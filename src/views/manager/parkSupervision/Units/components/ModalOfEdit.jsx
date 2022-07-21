import '../assets/styles/index.scss'
import { Cascader, Col, Form, Input, Row, Switch } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import { mapGetters } from 'vuex'
import DragModal from '@/components/DragModal'
import { dispatch } from '@/utils/store'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {
      modalProps: {
        width: 810
      }
    }
  },
  computed: {
    ...mapGetters({
      administrativeDivision: 'administrativeDivision',
      defaultAdministrativeDivision: 'defaultAdministrativeDivision'
    })
  },
  watch: {
    visible: {
      immediate: true,
      async handler(value) {
        if (value) {
          if (!this.administrativeDivision.length) {
            await dispatch('common', 'getAdministrativeDivision')
          }
        }
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

    return (
      <DragModal {...attributes}>
        <Form
          class="bnm-form-grid"
          colon={false}
        >
          <Form.Item label="单位名称" class={'half'}>
            {
              this.form.getFieldDecorator('unitName', {
                initialValue: this.currentItem.unitName,
                rules: [{ required: true, message: '请输入单位名称!', trigger: 'blur' }]
              })(
                <Input placeholder="请输入单位名称" allowClear />
              )
            }
          </Form.Item>
          <Form.Item label="工商注册号" class={'half'}>
            {
              this.form.getFieldDecorator('icrn', {
                initialValue: this.currentItem.icrn,
                rules: [{ required: true, message: '请输入工商注册号!', trigger: 'blur' }]
              })(
                <Input placeholder="请输入工商注册号" allowClear />
              )
            }
          </Form.Item>
          <Form.Item label="统一社会信用代码" class={'half'}>
            {
              this.form.getFieldDecorator('uscc', {
                initialValue: this.currentItem.uscc,
                rules: [{ required: true, message: '请输入统一社会信用代码!', trigger: 'blur' }]
              })(
                <Input placeholder="请输入统一社会信用代码" allowClear />
              )
            }
          </Form.Item>
          <Form.Item label="组织机构代码" class={'half'}>
            {
              this.form.getFieldDecorator('oc', {
                initialValue: this.currentItem.oc
              })(
                <Input placeholder="请输入组织机构代码" allowClear />
              )
            }
          </Form.Item>
          <Form.Item label="登录账号" class={'half'}>
            {
              this.form.getFieldDecorator('loginAccount', {
                initialValue: this.currentItem.loginAccount,
                rules: [{ required: true, message: '请输入登录账号!', trigger: 'blur' }]
              })(
                <Input placeholder="请输入登录账号" allowClear disabled={!!this.currentItem.id} />
              )
            }
          </Form.Item>
          {
            // this.currentItem?.id ? null : (
            //   <Form.Item label="登录密码" class={'half'}>
            //     {
            //       this.form.getFieldDecorator('loginPwd', {
            //         initialValue: this.currentItem.loginPwd,
            //         rules: [{ required: true, message: '请输入登录密码!', trigger: 'blur' }]
            //       })(
            //         <Input placeholder="请输入登录密码" allowClear />
            //       )
            //     }
            //   </Form.Item>
            // )
          }
          <Form.Item label="负责人" class={'half'}>
            {
              this.form.getFieldDecorator('employeeName', {
                initialValue: this.currentItem.employeeName
              })(
                <Input placeholder="请输入负责人姓名" />
              )
            }
          </Form.Item>
          <Form.Item label="负责人手机号" class={'half'}>
            {
              this.form.getFieldDecorator('employeeMobile', {
                initialValue: this.currentItem.employeeMobile
              })(
                <Input placeholder="请输入负责人手机号码" />
              )
            }
          </Form.Item>
          <Form.Item label="联系电话" class={'half'}>
            {
              this.form.getFieldDecorator('chargePhone', {
                initialValue: this.currentItem.chargePhone
              })(
                <Input placeholder="请输入联系电话" allowClear />
              )
            }
          </Form.Item>
          <Form.Item label="地址" class={'custom'}>
            <Row gutter={16}>
              <Col span={10}>
                <Form.Item>
                  {
                    this.form.getFieldDecorator('areaCode', {
                      initialValue: this.defaultAdministrativeDivision
                    })(
                      <Cascader
                        placeholder="请选择省市区"
                        expandTrigger={'hover'}
                        allowClear
                        options={this.administrativeDivision}
                        fieldNames={{ label: 'name', value: 'id', children: 'children' }}
                      />
                    )
                  }
                </Form.Item>
              </Col>
              <Col span={14}>
                <Form.Item>
                  {
                    this.form.getFieldDecorator('address', {
                      initialValue: this.currentItem.address
                    })(
                      <Input placeholder="请输入详细地址" allowClear />
                    )
                  }
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item label="简介">
            {
              this.form.getFieldDecorator('description', {
                initialValue: this.currentItem.description
              })(
                <Input placeholder="请输入简介" type={'textarea'} />
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
                initialValue: this.currentItem.id ? this.currentItem.status === 1 : true,
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

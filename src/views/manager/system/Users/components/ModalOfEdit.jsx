import '../assets/styles/index.scss'
import { Cascader, Col, Form, Input, InputNumber, Radio, Row, Switch } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import { mapAction } from '@/utils/store'
import { mapGetters } from 'vuex'
import { verifyIDNumber, verifyMobileNumber, verifyPhoneNumber } from '@/utils/validators'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {
      modalProps: {
        width: 810,
        wrapClassName: 'bnm-modal-edit-user-form'
      },
      addressList: []
    }
  },
  computed: {
    // ...mapGetters(['administrativeDivision']),
    // ...mapState(['details'])
    ...mapGetters({ getState: 'getState' }),
    administrativeDivision() {
      return this.getState('administrativeDivision', 'common') || []
    },
    details() {
      return this.getState('details', this.moduleName)
    }
  },
  async created() {
    await this.$store.dispatch('common/getAdministrativeDivision')
  },
  watch: {
    visible: {
      immediate: true,
      async handler(value) {
        if (value) {
          const res = await this.getDetail({
            id: this.currentItem.id,
            moduleName: this.moduleName
          })

          if (res.status) {
            if (res.data.provinceId) {
              this.addressList = [res.data.provinceId, res.data.cityId, res.data.countyId]
            }
          }
        } else {
          this.addressList = []
          this.$store.commit('setDetails', {
            value: {},
            moduleName: this.moduleName
          })
        }
      }
    }
  },
  methods: {
    ...mapAction(['getDetail']),
    customDataHandler(values) {
      const data = { ...values }

      if (data.organId.length > 0) {
        data.organId = data.organId[data.organId.length - 1]
      } else {
        data.organId = ''
      }

      if (data.roleIds.length > 0) {
        data.roleIds = data.roleIds.at(-1)
      } else {
        data.roleIds = ''
      }

      const [province, city, county] = this.addressList

      data.provinceId = province?.id ?? ''
      data.provinceName = province?.name ?? ''
      data.cityId = city?.id ?? ''
      data.cityName = city?.name ?? ''
      data.countyId = county?.id ?? ''
      data.countyName = county?.name ?? ''

      data.birthDate = data.birthDate ? data.birthDate.format('YYYYMMDD') : ''

      data.id = this.currentItem?.id ?? ''

      return data
    },
    onChangeAddressList(value, selectedOptions) {
      this.addressList = selectedOptions
    },
    onChangeRole(value, e) {
      // console.log(value, e)
    }
  },
  render() {
    const attributes = {
      attrs: this.modalProps,
      on: {
        cancel: () => this.onCancel(),
        ok: () => this.onSubmit({ customDataHandler: this.customDataHandler })
      }
    }

    return (
      <DragModal {...attributes}>
        <Form
          class=""
          colon={false}
        >
          <Row gutter={10}>
            <Col span={12}>
              <Form.Item label="登录账号">
                {
                  this.form.getFieldDecorator('loginName', {
                    initialValue: this.details.loginName,
                    rules: [
                      {
                        required: true, message: '请输入账号!', trigger: 'blur'
                      }
                    ]
                  })(
                    <Input
                      placeholder="请输入登录账号"
                      allowClear
                    />
                  )
                }
              </Form.Item>
            </Col>
            {
              this.currentItem.id
                ? null
                : (
                  <Col span={12}>
                    <Form.Item label="登录密码">
                      {
                        this.form.getFieldDecorator('loginPwd', {
                          initialValue: this.details.loginPwd,
                          rules: [
                            {
                              required: true, message: '请输入密码!', trigger: 'blur'
                            }
                          ]
                        })(
                          <Input
                            placeholder="请输入登录密码"
                            allowClear
                          />
                        )}
                    </Form.Item>
                  </Col>
                )
            }
            <Col span={12}>
              <Form.Item label="姓名">
                {
                  this.form.getFieldDecorator('fullName', {
                    initialValue: this.details.fullName,
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
            </Col>
            <Col span={12}>
              <Form.Item label="身份证号码">
                {
                  this.form.getFieldDecorator('idCard', {
                    initialValue: this.details.idCard,
                    rules: [{ validator: verifyIDNumber }]
                  })(
                    <Input
                      placeholder="请输入身份证号码"
                      allowClear
                    />
                  )
                }
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="手机号码">
                {
                  this.form.getFieldDecorator('mobile', {
                    initialValue: this.details.mobile,
                    rules: [{ validator: verifyMobileNumber }]
                  })(
                    <Input
                      placeholder="请输入手机号码"
                      allowClear
                    />
                  )
                }
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="性别">
                {
                  this.form.getFieldDecorator('gender', { initialValue: this.details.gender })(
                    <Radio.Group>
                      <Radio value={1}>男</Radio>
                      <Radio value={2}>女</Radio>
                    </Radio.Group>
                  )
                }
              </Form.Item>
            </Col>
            {/* <Col span={12}>
              <Form.Item label="出生日期">
                {this.form.getFieldDecorator('birthDate', {
                  initialValue: this.details.birthDate ? moment(this.details.birthDateStr) : undefined
                })(<DatePicker placeholder="请选择"></DatePicker>)}
              </Form.Item>
            </Col> */}
            <Col span={12}>
              <Form.Item label="电子邮箱">
                {
                  this.form.getFieldDecorator('email', {
                    initialValue: this.details.email,
                    rules: [
                      {
                        required: false,
                        type: 'email',
                        message: '格式错误!',
                        trigger: 'blur'
                      }
                    ]
                  })(
                    <Input
                      placeholder="请输入电子邮箱"
                      allowClear
                    />
                  )
                }
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="联系电话">
                {
                  this.form.getFieldDecorator('phone', {
                    initialValue: this.details.phone,
                    rules: [{ validators: verifyPhoneNumber }]
                  })(
                    <Input
                      placeholder="请输入联系电话"
                      allowClear
                    />
                  )
                }
              </Form.Item>
            </Col>
            <Col span={24}></Col>
            <Col span={12}>
              <Form.Item label="联系地址">
                {
                  this.form.getFieldDecorator('addressList', { initialValue: this.addressList })(
                    <Cascader
                      placeholder="请选择省市区"
                      expandTrigger={'hover'}
                      allowClear
                      options={this.administrativeDivision}
                      fieldNames={{
                        label: 'name', value: 'id', children: 'children'
                      }}
                      onchange={this.onChangeAddressList}
                    />
                  )
                }
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="">
                {
                  this.form.getFieldDecorator('address', { initialValue: this.details.address })(
                    <Input
                      placeholder="请输入"
                      allowClear
                    />
                  )
                }
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="简介">
                {
                  this.form.getFieldDecorator('description', { initialValue: this.details.description })(
                    <Input.TextArea
                      placeholder="请输入简介"
                      allowClear
                      autoSize={{ minRows: 6 }}
                    />
                  )
                }
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="排序">
                {
                  this.form.getFieldDecorator('sortIndex', {
                    initialValue: this.details.sortIndex || 0,
                    rules: [
                      {
                        required: true,
                        type: 'number',
                        message: '请输入排序值!',
                        trigger: 'blur'
                      }
                    ]
                  })(
                    <InputNumber
                      placeholder="越大排在越前"
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
                    initialValue: this.details.status === 1,
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

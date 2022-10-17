import '../assets/styles/index.scss'
import { Cascader, Col, Form, Input, InputNumber, Row, Switch } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import { mapGetters } from 'vuex'
import DragModal from '@/components/DragModal'
import { dispatch } from '@/utils/store'
import BNUploadPictures from '@/components/BNUploadPictures'
import MultiInput from './MultiInput'
import { verifyIDNumber, verifyMobileNumber } from '@/utils/validators'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return { modalProps: { width: 850 } }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    administrativeDivision() {
      return this.getState('administrativeDivision', 'common') || []
    },
    defaultAdministrativeDivision() {
      return this.getState('defaultAdministrativeDivision', 'common') || []
    },
    /**
     * 回显营业执照
     */
    businessLicenseFileList() {
      return this.currentItem.businessLicense
        ? [
          {
            uid: 'businessLicense',
            key: this.currentItem.businessLicense,
            url: this.currentItem.businessLicenseStr,
            status: 'done',
            name: this.currentItem.businessLicense?.substring(this.currentItem.businessLicense?.lastIndexOf('/'))
          }
        ] : []
    },
    /**
     * 回显身份证正面
     */
    legalPersonIdCardFrontFileList() {
      return this.currentItem.legalPersonIdCardFront
        ? [
          {
            uid: 'legalPersonIdCardFront',
            key: this.currentItem.legalPersonIdCardFront,
            url: this.currentItem.legalPersonIdCardFrontStr,
            status: 'done',
            name: this.currentItem.legalPersonIdCardFront?.substring(
              this.currentItem.legalPersonIdCardFront?.lastIndexOf('/')
            )
          }
        ] : []
    },
    /**
     * 回显身份证反面
     */
    legalPersonIdCardReverseFileList() {
      return this.currentItem.legalPersonIdCardReverse
        ? [
          {
            uid: 'legalPersonIdCardReverse',
            url: this.currentItem.legalPersonIdCardReverseStr,
            key: this.currentItem.legalPersonIdCardReverse,
            status: 'done',
            name: this.currentItem.legalPersonIdCardReverse?.substring(
              this.currentItem.legalPersonIdCardReverse?.lastIndexOf('/')
            )
          }
        ] : []
    }
  },
  watch: {
    visible: {
      immediate: true,
      async handler(value) {
        if (value) {
          await dispatch('common', 'getAdministrativeDivision')
        }
      }
    }
  },
  render() {
    const attributes = {
      attrs: this.modalProps,
      on: {
        cancel: () => this.onCancel(),
        ok: () => this.onSubmit({
          customValidation: () => {
            const unitBankList = this.form.getFieldValue('unitBankList')
            const validValue = unitBankList.filter(item => item.bankName && item.bankNo)

            if (validValue.length && !validValue.find(item => item.isDefault === 1)) {
              this.form.setFields({
                unitBankList: {
                  value: validValue,
                  errors: [new Error('您填写的银行账号信息不合法，请至少设置一个默认值！')]
                }
              })

              return false
            }

            return true
          },
          customDataHandler: values => {
            values.businessLicense = values.businessLicense[0]?.key ??
              values.businessLicense[0]?.response.data[0]?.key ?? ''
            values.legalPersonIdCardFront = values.legalPersonIdCardFront[0]?.key ??
              values.legalPersonIdCardFront[0]?.response.data[0]?.key ?? ''
            values.legalPersonIdCardReverse = values.legalPersonIdCardReverse[0]?.key ??
              values.legalPersonIdCardReverse[0]?.response.data[0]?.key ?? ''

            return values
          }
        })
      }
    }

    return (
      <DragModal {...attributes}>
        <Form
          class="bnm-form-grid"
          colon={false}
        >
          <Form.Item
            label="单位名称"
            class={'half'}
          >
            {
              this.form.getFieldDecorator('unitName', {
                initialValue: this.currentItem.unitName,
                rules: [
                  {
                    required: true,
                    message: '请输入单位名称!',
                    trigger: 'blur'
                  }
                ]
              })(
                <Input
                  placeholder="请输入单位名称"
                  allowClear
                />
              )
            }
          </Form.Item>
          <Form.Item
            label="工商注册号"
            class={'half'}
          >
            {
              this.form.getFieldDecorator('icrn', {
                initialValue: this.currentItem.icrn,
                rules: [
                  {
                    required: true,
                    message: '请输入工商注册号!',
                    trigger: 'blur'
                  }
                ]
              })(
                <Input
                  placeholder="请输入工商注册号"
                  allowClear
                />
              )
            }
          </Form.Item>
          <Form.Item
            label="统一社会信用代码"
            class={'half'}
          >
            {
              this.form.getFieldDecorator('uscc', {
                initialValue: this.currentItem.uscc,
                rules: [
                  {
                    required: true,
                    message: '请输入统一社会信用代码!',
                    trigger: 'blur'
                  }
                ]
              })(
                <Input
                  placeholder="请输入统一社会信用代码"
                  allowClear
                />
              )
            }
          </Form.Item>
          <Form.Item
            label="组织机构代码"
            class={'half'}
          >
            {
              this.form.getFieldDecorator('oc', { initialValue: this.currentItem.oc })(
                <Input
                  placeholder="请输入组织机构代码"
                  allowClear
                />
              )
            }
          </Form.Item>
          <Form.Item
            label="纳税人识别号"
            class={'half'}
          >
            {
              this.form.getFieldDecorator('tin', { initialValue: this.currentItem.tin })(
                <Input
                  placeholder="请输入纳税人识别号"
                  allowClear
                />
              )
            }
          </Form.Item>
          <Form.Item
            label="法人姓名"
            class={'half'}
          >
            {
              this.form.getFieldDecorator('legalPerson', { initialValue: this.currentItem.legalPerson })(
                <Input
                  placeholder="请输入法人姓名"
                  allowClear
                />
              )
            }
          </Form.Item>
          <Form.Item
            label="法人身份证号码"
            class={'half'}
          >
            {
              this.form.getFieldDecorator('legalPersonIdCard', {
                initialValue: this.currentItem.legalPersonIdCard,
                rules: [{ validator: verifyIDNumber }]
              })(
                <Input
                  placeholder="请输入法人身份证号码"
                  allowClear
                />
              )
            }
          </Form.Item>
          <Form.Item
            label="法人手机号码"
            class={'half'}
          >
            {
              this.form.getFieldDecorator('legalPersonMobile', {
                initialValue: this.currentItem.legalPersonMobile,
                rules: [{ validator: verifyMobileNumber }]
              })(
                <Input
                  placeholder="请输入法人手机号码"
                  allowClear
                />
              )
            }
          </Form.Item>
          <Form.Item
            label="营业执照"
            class={'one-third'}
          >
            {
              this.form.getFieldDecorator('businessLicense', { initialValue: this.businessLicenseFileList })(
                <BNUploadPictures limit={1} />
              )
            }
          </Form.Item>
          <Form.Item
            label="身份证正面"
            class={'one-third'}
          >
            {
              this.form.getFieldDecorator(
                'legalPersonIdCardFront',
                { initialValue: this.legalPersonIdCardFrontFileList }
              )(
                <BNUploadPictures limit={1} />
              )
            }
          </Form.Item>
          <Form.Item
            label="身份证反面"
            class={'one-third'}
          >
            {
              this.form.getFieldDecorator(
                'legalPersonIdCardReverse',
                { initialValue: this.legalPersonIdCardReverseFileList }
              )(
                <BNUploadPictures limit={1} />
              )
            }
          </Form.Item>
          <Form.Item
            label="登录账号"
            class={'half'}
          >
            {
              this.form.getFieldDecorator('loginAccount', {
                initialValue: this.currentItem.loginAccount,
                rules: [
                  {
                    required: true,
                    message: '请输入登录账号!',
                    trigger: 'blur'
                  }
                ]
              })(
                <Input
                  placeholder="请输入登录账号"
                  allowClear
                  disabled={!!this.currentItem.id}
                />
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
          <Form.Item label="银行账号">
            {
              this.form.getFieldDecorator('unitBankList', { initialValue: this.currentItem.unitBankList || [] })(
                <MultiInput
                  parentForm={this.form}
                  placeholder
                />
              )
            }
          </Form.Item>
          <Form.Item
            label="通信地址"
            class={'custom'}
          >
            <Row gutter={16}>
              <Col span={10}>
                <Form.Item>
                  {
                    this.form.getFieldDecorator('areaCode', { initialValue: this.defaultAdministrativeDivision })(
                      <Cascader
                        placeholder="请选择省市区"
                        expandTrigger={'hover'}
                        allowClear
                        options={this.administrativeDivision}
                        fieldNames={{
                          label: 'name', value: 'id', children: 'children'
                        }}
                      />
                    )
                  }
                </Form.Item>
              </Col>
              <Col span={14}>
                <Form.Item>
                  {
                    this.form.getFieldDecorator('address', { initialValue: this.currentItem.address })(
                      <Input
                        placeholder="请输入详细地址"
                        allowClear
                      />
                    )
                  }
                </Form.Item>
              </Col>
            </Row>
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
                    required: true,
                    type: 'number',
                    message: '请输入排序值!',
                    trigger: 'blur'
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

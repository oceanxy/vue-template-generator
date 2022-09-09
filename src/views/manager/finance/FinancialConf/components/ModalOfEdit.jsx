import { Form, Input, InputNumber, Radio, Select } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return { modalProps: { width: 600 } }
  },
  methods: {
    handleSubmit() {
      let customApiName

      if (this.currentItem.stateName === 'serviceManagementFee') {
        customApiName = ['updateServiceManagementFee', 'getServiceManagementFee']
        this.modalProps.title = '编辑服务管理费配置'
      } else if (this.currentItem.stateName === 'securityDeposit') {
        customApiName = ['updateSecurityDeposit', 'getSecurityDeposit']
        this.modalProps.title = '编辑履约保证金配置'
      } else if (this.currentItem.stateName === 'rents') {
        customApiName = ['updateRent', 'getRentsOfFinancialConf']
        this.modalProps.title = '编辑房屋租金配置'
      }

      if (customApiName) {
        this.onSubmit({
          customApiName: customApiName[0],
          isFetchList: false,
          done: async () => {
            await this.$store.dispatch('getListForSelect', {
              moduleName: this.moduleName,
              stateName: this.currentItem.stateName,
              customApiName: customApiName[1]
            })
          }
        })
      } else {
        console.error(`${this.$route.fullPath}（路由） > ModalOfEdit（模块） > handleSubmit（方法）缺少有效的 if 分支！`)
      }
    }
  },
  render() {
    const attributes = {
      attrs: this.modalProps,
      on: {
        cancel: () => this.onCancel(this.visibleField),
        ok: this.handleSubmit
      }
    }

    return (
      <DragModal {...attributes}>
        <Form
          class="bnm-form-grid label-size-small"
          colon={false}
        >
          <Form.Item label="金额">
            {
              this.form.getFieldDecorator('amount', {
                initialValue: this.currentItem.amount,
                rules: [
                  {
                    required: this.currentItem.stateName === 'serviceManagementFee' ||
                      this.currentItem.stateName === 'rents',
                    type: 'number',
                    message: '请输入金额！',
                    trigger: 'blur'
                  }
                ]
              })(
                <InputNumber
                  placeholder={'请输入金额'}
                  style={{ width: '100%' }}
                  precision={2}
                />
              )
            }
          </Form.Item>
          <Form.Item label="计费单位">
            {
              this.form.getFieldDecorator('chargeUnit', { initialValue: this.currentItem.chargeUnit })(
                <Select placeholder={'请输入金额'} disabled={true}>
                  <Select.Option value={this.currentItem.chargeUnit}>
                    {this.currentItem.chargeUnit}
                  </Select.Option>
                </Select>
              )
            }
          </Form.Item>
          {
            this.currentItem.stateName === 'serviceManagementFee' || this.currentItem.stateName === 'rents'
              ? [
                <Form.Item label="使用抵扣">
                  {
                    this.form.getFieldDecorator('isDeduction', {
                      initialValue: this.currentItem.isDeduction,
                      rules: [
                        {
                          required: true,
                          type: 'number',
                          message: '请输入描述！',
                          trigger: 'change'
                        }
                      ]
                    })(
                      <Radio.Group>
                        <Radio value={1}>是</Radio>
                        <Radio value={0}>否</Radio>
                      </Radio.Group>
                    )
                  }
                  <p class={'hint'}>到期是否使用履约保证金抵扣</p>
                </Form.Item>,
                <Form.Item label="收取方式">
                  {
                    this.form.getFieldDecorator('takeType', {
                      initialValue: this.currentItem.takeType || 1,
                      rules: [
                        {
                          required: true,
                          type: 'number',
                          message: '请输入金额!',
                          trigger: 'blur'
                        }
                      ]
                    })(
                      <Radio.Group>
                        <Radio value={1}>按照房屋面积与缴费周期收取</Radio>
                      </Radio.Group>
                    )
                  }
                </Form.Item>
              ]
              : null
          }
          {
            this.currentItem.stateName === 'securityDeposit'
              ? [
                <Form.Item label="默认价格">
                  {
                    this.form.getFieldDecorator('monthMultiple', {
                      initialValue: this.currentItem.monthMultiple,
                      rules: [
                        {
                          required: true,
                          type: 'number',
                          message: '请输入金额！',
                          trigger: 'blur'
                        }
                      ]
                    })(
                      <InputNumber
                        placeholder={'请输入默认价格'}
                        style={{ width: '100%' }}
                        min={1}
                      />
                    )
                  }
                  <p class={'hint'}>月租金的倍数</p>
                </Form.Item>,
                <Form.Item label="缴纳时间">
                  {
                    this.form.getFieldDecorator('payDay', { initialValue: this.currentItem.payDay })(
                      <InputNumber
                        placeholder={'请输入缴纳时间'}
                        style={{ width: '100%' }}
                        min={1}
                      />
                    )
                  }
                  <p class={'hint'}>自签订合同日起N天</p>
                </Form.Item>
              ]
              : null
          }
          <Form.Item label="是否必选" class={'half'}>
            {
              this.form.getFieldDecorator('isMust', {
                rules: [
                  {
                    required: this.currentItem.stateName === 'securityDeposit',
                    type: 'number',
                    message: '请选择是否必选！',
                    trigger: 'change'
                  }
                ],
                initialValue: this.currentItem.isMust || 0
              })(
                <Radio.Group>
                  <Radio value={1}>是</Radio>
                  <Radio value={0}>否</Radio>
                </Radio.Group>
              )
            }
          </Form.Item>
          <Form.Item label="描述">
            {
              this.form.getFieldDecorator('description', { initialValue: this.currentItem.description })(
                <Input.TextArea placeholder="请输入描述" autoSize={{ minRows: 6 }} allowClear />
              )
            }
          </Form.Item>
        </Form>
      </DragModal>
    )
  }
})

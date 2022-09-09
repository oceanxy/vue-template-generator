import '../assets/styles/index.scss'
import { Checkbox, Col, Form, Input, InputNumber, Radio, Row, Spin } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import { mapGetters } from 'vuex'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {modalProps: {width: 700}}
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    paymentMethods() {
      return this.getState('paymentMethods', this.moduleName)
    },
    pendingOrders() {
      return this.getState('pendingOrders', this.moduleName)
    },
    remarkRequired() {
      const price = this.form.getFieldsValue(['amount', 'realAmount'])

      return price.amount !== price.realAmount
    }
  },
  watch: {
    visible: {
      immediate: true,
      async handler(value) {
        if (value) {
          await Promise.all([
            this.$store.dispatch('getListForSelect', {
              moduleName: this.moduleName,
              stateName: 'pendingOrders',
              customApiName: 'getPendingOrders',
              payload: {id: this.currentItem.id}
            }),
            this.$store.dispatch('getListForSelect', {
              moduleName: this.moduleName,
              stateName: 'paymentMethods',
              customApiName: 'getPaymentMethods'
            })
          ])
        }
      }
    }
  },
  methods: {
    onPendingOrdersChange(value) {
      // 筛选已勾选账单
      const ordersChecked = this.pendingOrders.list.filter(item => value.includes(item.id))
      // 计算已勾选账单的总额
      const amount = ordersChecked.reduce(
        (prev, current) => prev + current.billList.reduce((p, c) => p + c.amount, 0),
        0
      )

      this.form.setFieldsValue({
        realAmount: amount, amount
      })
    }
  },
  render() {
    const attributes = {
      attrs: this.modalProps,
      on: {
        cancel: () => this.onCancel(),
        ok: () => this.onSubmit({ customApiName: 'enterprisePayment' })
      }
    }

    return (
      <DragModal {...attributes}>
        <Form
          class="bnm-form-grid label-size-small"
          colon={false}
        >
          <Form.Item label="企业名称">
            <Input vModel={this.currentItem.companyName} placeholder="请输入企业名称" disabled />
          </Form.Item>
          <Form.Item label="选择账单">
            <Spin spinning={this.pendingOrders.loading}>
              {
                this.form.getFieldDecorator('billIds', {
                  initialValue: [],
                  rules: [{
                    required: true, type: 'array', message: '请选择缴费账单!', trigger: 'change'
                  }]
                })(
                  <Checkbox.Group class={'bnm-form-checkbox'} onChange={this.onPendingOrdersChange}>
                    {
                      this.pendingOrders.list.length
                        ? this.pendingOrders.list.map(item => (
                          <Checkbox value={item.id}>{item.itemName}（{item.billList.length}）</Checkbox>
                        ))
                        : '当前无可缴费账单'
                    }
                  </Checkbox.Group>
                )
              }
            </Spin>
          </Form.Item>
          <Form.Item label="缴费金额" class={'combo'} required>
            <Row gutter={10}>
              <Col span={12}>
                <Form.Item>
                  {
                    this.form.getFieldDecorator('amount', {
                      rules: [{
                        required: true, type: 'number', message: '请输入缴费金额!', trigger: 'blur'
                      }]
                    })(
                      <InputNumber
                        placeholder="选择账单后自动计算"
                        disabled
                        precision={2}
                        style={{
                          color: '#0f7d4f', width: '100%'
                        }}
                      />
                    )
                  }
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item>
                  {
                    this.form.getFieldDecorator('realAmount', {
                      rules: [{
                        required: true, type: 'number', message: '请输入实缴金额!', trigger: 'blur'
                      }]
                    })(
                      <InputNumber
                        precision={2}
                        style={{ width: '100%' }}
                        placeholder="请输入实缴金额"
                      />
                    )
                  }
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item label="支付方式">
            <Spin spinning={this.paymentMethods.loading}>
              {
                this.form.getFieldDecorator('payType', {
                  rules: [{
                    required: true, message: '请选择支付方式!', trigger: 'change'
                  }]
                })(
                  <Radio.Group placeholder="请选择支付方式" allowClear>
                    {
                      this.paymentMethods.list.map(item => (
                        <Radio value={item.id}>{item.fullName}</Radio>
                      ))
                    }
                  </Radio.Group>
                )
              }
            </Spin>
          </Form.Item>

          <Form.Item label="交易流水">
            {
              this.form.getFieldDecorator('paySerialNumber', {
                rules: [{
                  required: true, message: '请输入交易流水号!', trigger: 'blur'
                }]
              })(
                <Input placeholder="请输入交易流水号" allowClear />
              )
            }
          </Form.Item>
          <Form.Item label="备注">
            {
              this.form.getFieldDecorator('remark', {
                rules: [{
                  required: this.remarkRequired, message: '请输入备注', trigger: 'blur'
                }]
              })(
                <Input.TextArea placeholder="请输入备注" autoSize={{ minRows: 6 }} allowClear />
              )
            }
          </Form.Item>
        </Form>
      </DragModal>
    )
  }
})

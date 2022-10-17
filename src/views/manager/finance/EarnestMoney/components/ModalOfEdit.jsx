import '../assets/styles/index.scss'
import { Form, Input, InputNumber, Radio, Spin } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import { mapGetters } from 'vuex'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return { modalProps: { width: 600 } }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    paymentMethods() {
      return this.getState('paymentMethods', this.moduleName)
    },
    remarkRequired() {
      const amount = this.form.getFieldValue('amount')

      return amount !== this.currentItem.amount
    }
  },
  watch: {
    visible: {
      immediate: true,
      async handler(value) {
        if (value) {
          this.modalProps.title = this.modalTitle
            .replace('{action}', this.currentItem.earnestStatus === 1
              ? this.$parent.$attrs.candidateTitle[0]
              : this.$parent.$attrs.candidateTitle[1]
            )

          await Promise.all([
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
  render() {
    const attributes = {
      attrs: this.modalProps,
      on: {
        cancel: () => this.onCancel(),
        ok: () => this.onSubmit({ customApiName: 'earnestMoneySettlement' })
      }
    }

    return (
      <DragModal {...attributes}>
        <Form
          class="bnm-form-grid label-size-small"
          colon={false}
        >
          <Form.Item
            label="状态"
            style={{ display: 'none' }}
          >
            {
              this.form.getFieldDecorator(
                'earnestStatus',
                { initialValue: this.currentItem.earnestStatus === 1 ? 2 : 3 }
              )(
                <Input disabled={true} />
              )
            }
          </Form.Item>
          <Form.Item label="企业名称">
            <Input
              vModel={this.currentItem.companyName}
              placeholder="请输入企业名称"
              disabled
            />
          </Form.Item>
          <Form.Item label="缴费金额">
            {
              this.form.getFieldDecorator('amount', {
                initialValue: this.currentItem.amount,
                rules: [
                  {
                    required: true, type: 'number', message: '请输入金额!', trigger: 'blur'
                  }
                ]
              })(
                <InputNumber
                  precision={2}
                  style={{ width: '100%' }}
                  placeholder="请输入金额"
                />
              )
            }
          </Form.Item>
          <Form.Item label="支付方式">
            <Spin spinning={this.paymentMethods.loading}>
              {
                this.form.getFieldDecorator('payType', {
                  rules: [
                    {
                      required: true, message: '请选择支付方式!', trigger: 'change'
                    }
                  ]
                })(
                  <Radio.Group
                    placeholder="请选择支付方式"
                    allowClear
                  >
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
              this.form.getFieldDecorator('serialNumber', {
                rules: [
                  {
                    required: true, message: '请输入交易流水号!', trigger: 'blur'
                  }
                ]
              })(
                <Input
                  placeholder="请输入交易流水号"
                  allowClear
                />
              )
            }
          </Form.Item>
          <Form.Item label="备注">
            {
              this.form.getFieldDecorator('remark', {
                rules: [
                  {
                    required: this.remarkRequired, message: '请输入备注', trigger: 'blur'
                  }
                ]
              })(
                <Input.TextArea
                  placeholder="请输入备注"
                  autoSize={{ minRows: 6 }}
                  allowClear
                />
              )
            }
          </Form.Item>
        </Form>
      </DragModal>
    )
  }
})

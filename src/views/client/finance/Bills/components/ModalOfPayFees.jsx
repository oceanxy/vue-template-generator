import { Form, Input, InputNumber } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import BNUploadPictures from '@/components/BNUploadPictures'
import { omit } from 'lodash'
import { mapGetters } from 'vuex'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {
      visibleField: 'visibleOfPayFees',
      modalProps: { width: 700 }
    }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    companyId() {
      return this.getState('userInfo', 'login').companyId
    }
  },
  methods: {
    customDataHandler(values) {
      return omit({
        ...values,
        billIds: this.currentItem.billIds ? this.currentItem.billIds : [this.currentItem.id],
        payCredentials: values.payCredentials.map(item => {
          return item?.response?.data?.[0]?.key ?? ''
        }).join()
      }, 'id')
    }
  },
  render() {
    const attributes = {
      attrs: this.modalProps,
      on: {
        cancel: () => this.onCancel(this.visibleField),
        ok: () => this.onSubmit({
          isFetchList: false,
          customApiName: 'paymentOnClient',
          customDataHandler: this.customDataHandler,
          done: async () => {
            await this.$store.dispatch('getDetails', {
              moduleName: this.moduleName,
              payload: { companyId: this.companyId }
            })
          }
        })
      }
    }

    return (
      <DragModal {...attributes}>
        <Form class="bnm-form-grid" colon={false}>
          <Form.Item label="实缴金额（元）">
            {
              this.form.getFieldDecorator('realAmount', {
                initialValue: this.currentItem.amount,
                rules: [
                  {
                    required: true,
                    type: 'number',
                    message: '请输入实缴金额!',
                    trigger: 'blur'
                  }
                ]
              })(
                <InputNumber
                  precision={2}
                  placeholder={'实缴金额'}
                  disabled={true}
                  style={{ width: '100%' }}
                />
              )
            }
          </Form.Item>
          <Form.Item label="支付凭证">
            {
              this.form.getFieldDecorator('payCredentials', {
                initialValue: [],
                rules: [
                  {
                    required: true,
                    type: 'array',
                    message: '请上传支付凭证!',
                    trigger: 'change'
                  }
                ]
              })(
                <BNUploadPictures
                  limit={5}
                  action={'/api/system/upload/image'}
                />
              )
            }
          </Form.Item>
          <Form.Item label="说明">
            {
              this.form.getFieldDecorator('description', { initialValue: '' })(
                <Input.TextArea placeholder="请输入说明" autoSize={{ minRows: 6 }} />
              )
            }
          </Form.Item>
        </Form>
      </DragModal>
    )
  }
})

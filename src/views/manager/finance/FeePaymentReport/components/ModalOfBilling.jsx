import '../assets/styles/index.scss'
import { Form, Input, Spin } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import { mapGetters } from 'vuex'
import DragModal from '@/components/DragModal'
import { verifyPhoneNumber } from '@/utils/validators'
import { cloneDeep } from 'lodash'
import BNUploadFile from '@/components/BNUploadFile'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {
      modalProps: { width: 600 },
      visibleField: 'visibleOfBilling'
    }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    companyDetails() {
      return this.getState('details', this.moduleName)
    },
    fileList() {
      const { invoiceFile } = this.companyDetails.data

      return invoiceFile
        ? [
          {
            uid: 'invoiceFile',
            key: invoiceFile.key,
            url: invoiceFile.path,
            status: 'done',
            name: invoiceFile.fileName,
            fileSize: invoiceFile.fileSize,
            fileSuffix: invoiceFile.fileSuffix
          }
        ]
        : []
    }
  },
  watch: {
    visible: {
      immediate: true,
      async handler(value) {
        if (value) {
          await this.$store.dispatch('getListForSelect', {
            moduleName: this.moduleName,
            stateName: 'details',
            customApiName: 'getDetailsOfBusinesses',
            payload: { billRecordId: this.currentItem.id }
          })
        }
      }
    }
  },
  render() {
    const attributes = {
      attrs: this.modalProps,
      on: {
        cancel: () => this.onCancel(this.visibleField),
        ok: () => this.onSubmit({
          customApiName: 'billing',
          customDataHandler: values => {
            const temp = cloneDeep(values)

            temp.id = this.companyDetails.data.id || undefined
            temp.companyId = this.currentItem.companyId
            temp.billRecordId = this.currentItem.id
            temp.invoiceFile = temp.invoiceFile[0].response?.data[0] ?? {
              fileName: temp.invoiceFile[0].name,
              fileSize: temp.invoiceFile[0].fileSize,
              fileSuffix: temp.invoiceFile[0].fileSuffix,
              key: temp.invoiceFile[0].key
            }

            return temp
          }
        })
      }
    }

    return (
      <DragModal {...attributes}>
        <Spin spinning={this.companyDetails.loading}>
          <Form
            class="bnm-form-grid"
            colon={false}
          >
            <Form.Item label="发票金额">
              {
                this.form.getFieldDecorator('amount', {
                  initialValue: this.currentItem.amount,
                  rules: [
                    {
                      required: true,
                      message: '请输入开票金额!',
                      trigger: 'blur'
                    }
                  ]
                })(
                  <Input
                    placeholder="请输入开票金额"
                    readOnly
                    style={{ color: '#d82622', fontWeight: 'bolder' }}
                  />
                )
              }
            </Form.Item>
            <Form.Item label="发票抬头">
              {
                this.form.getFieldDecorator('invoiceHead', {
                  initialValue: this.companyDetails.data.invoiceHead || undefined,
                  rules: [
                    {
                      required: true,
                      message: '请输入发票抬头!',
                      trigger: 'blur'
                    }
                  ]
                })(
                  <Input
                    placeholder="请输入发票抬头"
                    allowClear
                  />
                )
              }
            </Form.Item>
            <Form.Item label="税号">
              {
                this.form.getFieldDecorator('taxNum', {
                  initialValue: this.companyDetails.data.taxNum || undefined,
                  rules: [
                    {
                      required: true,
                      message: '请输入税号!',
                      trigger: 'blur'
                    }
                  ]
                })(
                  <Input
                    placeholder="请输入税号"
                    allowClear
                  />
                )
              }
            </Form.Item>
            <Form.Item label="电话">
              {
                this.form.getFieldDecorator('phone', {
                  initialValue: this.companyDetails.data.phone || undefined,
                  rules: [{ validator: verifyPhoneNumber }]
                })(
                  <Input
                    placeholder="请输入联系电话"
                    allowClear
                  />
                )
              }
            </Form.Item>
            <Form.Item label="地址">
              {
                this.form.getFieldDecorator(
                  'address',
                  { initialValue: this.companyDetails.data.address || undefined }
                )(
                  <Input
                    placeholder="请输入通信地址"
                    allowClear
                  />
                )
              }
            </Form.Item>
            <Form.Item label="开户行">
              {
                this.form.getFieldDecorator(
                  'bankName',
                  { initialValue: this.companyDetails.data.bankName || undefined }
                )(
                  <Input
                    placeholder="请输入开户行"
                    allowClear
                  />
                )
              }
            </Form.Item>
            <Form.Item label="银行账号">
              {
                this.form.getFieldDecorator(
                  'bankAccount',
                  { initialValue: this.companyDetails.data.bankAccount || undefined }
                )(
                  <Input
                    placeholder="请输入银行账号"
                    allowClear
                  />
                )
              }
            </Form.Item>
            <Form.Item label="接收邮箱">
              {
                this.form.getFieldDecorator('email', {
                  initialValue: this.companyDetails.data.email || undefined,
                  rules: [
                    {
                      required: false,
                      type: 'email',
                      message: '电子邮箱格式有误！',
                      trigger: 'blur'
                    }
                  ]
                })(
                  <Input
                    placeholder="请输收邮箱"
                    allowClear
                  />
                )
              }
            </Form.Item>
            <Form.Item label="发票">
              {
                this.form.getFieldDecorator('invoiceFile', { initialValue: this.fileList || [] })(
                  <BNUploadFile
                    accept=".pdf"
                    placeholder={'选择发票'}
                    limit={1}
                  />
                )
              }
            </Form.Item>
            <Form.Item label="备注">
              {
                this.form.getFieldDecorator('remark', { initialValue: this.companyDetails.data.remark || undefined })(
                  <Input.TextArea
                    placeholder="请输入备注"
                    autoSize={{ minRows: 2 }}
                    allowClear
                  />
                )
              }
            </Form.Item>
          </Form>
        </Spin>
      </DragModal>
    )
  }
})

import '../index.scss'
import { Form, Input, notification, Radio } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import ItemMultiInput from './ItemMultiInput'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {
      modalProps: {
        width: 810,
        okText: '确定',
        destroyOnClose: true
      },
      visibleField: 'visibleOfTerminate',
      deductions: 0
    }
  },
  watch: {
    visible: {
      immediate: true,
      handler(value) {
        if (value) {
          this.deductions = 0
        }
      }
    }
  },
  methods: {
    customValidation() {
      const value = this.form.getFieldValue('itemList') || []
      const temp = value.filter(item => item.itemName && item.description && item.amount)

      if (temp.length) {
        this.form.setFields({ itemList: { value: temp } })
      } else {
        this.form.setFields({ itemList: { value, errors: [new Error('请输入扣款事项！')] } })
      }

      return !!temp.length
    }
  },
  render() {
    const attributes = {
      attrs: this.modalProps,
      on: {
        cancel: () => this.onCancel(this.visibleField),
        ok: () => this.onSubmit({
          customValidation: this.deductions ? this.customValidation : undefined,
          customApiName: 'terminateContract',
          done: () => {
            notification.success({
              message: '通知',
              description: '已提交解约申请，请耐心等待管理员审核。'
            })
          }
        })
      }
    }

    return (
      <DragModal {...attributes}>
        <Form
          class="bnm-form-grid label-size-small"
          colon={false}
        >
          <Form.Item label={'企业名称'}>
            <Input
              vModel={this.currentItem.companyName}
              disabled={true}
            />
          </Form.Item>
          <Form.Item label={'签约场地'}>
            {
              this.currentItem.address
                ? (
                  <ul
                    style={{
                      marginBottom: 0,
                      lineHeight: '26px',
                      paddingTop: '6px',
                      paddingLeft: '20px'
                    }}
                  >
                    {
                      this.currentItem.address.split(',').map(item => (
                        <li>{item}</li>
                      ))
                    }
                  </ul>
                )
                : '暂时无法获取签约场地信息'
            }
          </Form.Item>
          <Form.Item label="解约原因">
            {
              this.form.getFieldDecorator('reason', {
                rules: [
                  {
                    required: true, message: '请输入解约原因!', trigger: 'change'
                  }
                ]
              })(
                <Input.TextArea
                  placeholder={'请输入解约原因'}
                  autoSize={{ minRows: 6 }}
                />
              )
            }
          </Form.Item>
          <Form.Item
            label={'扣款事项'}
            required={!!this.deductions}
          >
            <Radio.Group vModel={this.deductions}>
              <Radio value={0}>无扣款事项</Radio>
              <Radio value={1}>有扣款事项</Radio>
            </Radio.Group>
            {
              this.deductions
                ? (
                  this.form.getFieldDecorator('itemList', { initialValue: [] })(
                    <ItemMultiInput />
                  )
                )
                : null
            }
          </Form.Item>
        </Form>
      </DragModal>
    )
  }
})

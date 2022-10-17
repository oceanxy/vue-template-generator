import '../assets/styles/index.scss'
import { Form, Input, Radio } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import BNUploadPictures from '@/components/BNUploadPictures'
import { mapAction } from '@/utils/store'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {
      visibleField: 'visibleOfEdit',
      modalProps: {
        width: 700,
        wrapClassName: 'bnm-modal-workorder-take-form'
      }
    }
  },
  methods: {
    ...mapAction(['handleWorkOrder']),
    customDataHandler(values) {
      const data = { ...values }

      data.acceptImgs = data.acceptImgs.map(item => item?.response?.data[0]?.key ?? item.key).join()

      return data
    },
    async onSubmit() {
      this.form.validateFields(async (err, values) => {
        if (err) return

        const form = {
          ...this.customDataHandler(values),
          id: this.currentItem.id
        }

        this.modalProps.confirmLoading = true

        const res = await this.handleWorkOrder({ payload: form })

        this.modalProps.confirmLoading = false

        if (res.status) {
          await this.$store.dispatch('getList', { moduleName: this.moduleName })
          this.onCancel(this.visibleField)
        }
      })
    }
  },
  render() {
    const attributes = {
      attrs: this.modalProps,
      on: {
        cancel: () => this.onCancel(this.visibleField),
        ok: () => this.onSubmit()
      }
    }

    return (
      <DragModal {...attributes}>
        <Form
          class="bnm-form-grid"
          colon={false}
        >
          <Form.Item label="处理状态">
            {
              this.form.getFieldDecorator('acceptStatus', {
                initialValue: undefined,
                rules: [
                  {
                    required: true,
                    type: 'number',
                    message: '请选择处理状态!',
                    trigger: 'blur'
                  }
                ]
              })(
                <Radio.Group>
                  <Radio value={1}>已处理</Radio>
                  <Radio value={4}>处理中</Radio>
                </Radio.Group>
              )
            }
          </Form.Item>
          <Form.Item label="处理结果">
            {
              this.form.getFieldDecorator('acceptResult', {
                initialValue: undefined,
                rules: [
                  {
                    required: true,
                    message: '请输入处理结果!',
                    trigger: 'blur'
                  }
                ]
              })(
                <Input.TextArea
                  placeholder="请输入"
                  autoSize={{ minRows: 6 }}
                  allowClear
                />
              )
            }
          </Form.Item>
          <Form.Item label="现场图片">
            {
              this.form.getFieldDecorator('acceptImgs', { initialValue: [] })(
                <BNUploadPictures limit={5} />
              )
            }
          </Form.Item>
        </Form>
      </DragModal>
    )
  }
})

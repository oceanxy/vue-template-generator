import '../assets/styles/index.scss'
import { Col, Form, Input, Row } from 'ant-design-vue'
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
  computed: {},
  mounted() {
  },
  watch: {
    visible: {
      immediate: true,
      async handler(value) {
        //
      }
    }
  },
  methods: {
    ...mapAction(['handleWorkOrder']),
    customDataHandler(values) {
      const data = { ...values }

      data.acceptImgs = data.acceptImgs
        .map(item => {
          return item?.response?.data[0]?.key ?? item.key
        })
        .join(',')

      return data
    },
    onSubmit() {
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
          this.onCancel(this.visibleField)
          this.$store.dispatch('getList', { moduleName: this.moduleName })
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
        <Form class="" colon={false}>
          <Row gutter={10}>
            <Col span={24}>
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
                    <Input.TextArea placeholder="请输入" autoSize={{ minRows: 6 }} allowClear />
                  )
                }
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="现场图片">
                {this.form.getFieldDecorator('acceptImgs', { initialValue: [] })(<BNUploadPictures limit={5} />)}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </DragModal>
    )
  }
})

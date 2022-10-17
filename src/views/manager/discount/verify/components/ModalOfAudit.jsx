import '../assets/styles/index.scss'
import { Col, Form, Input, Radio, Row } from 'ant-design-vue'

import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import { mapState } from '@/utils/store'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {
      visibleField: 'visibleOfAudit',
      modalProps: {
        width: 500,
        wrapClassName: 'bnm-modal-discount-verify-form-audit'
      }
    }
  },
  computed: { ...mapState([]) },
  watch: {
    visible: {
      immediate: true,
      async handler(value) {
        if (value) {
          //
        } else {
          //
        }
      }
    }
  },
  methods: {
    customDataHandler(values) {
      return {
        id: this.currentItem.id ?? '',
        ...values
      }
    }
  },
  render() {
    const attributes = {
      attrs: this.modalProps,
      on: {
        cancel: () => this.onCancel(this.visibleField),
        ok: () =>
          this.onSubmit({
            customApiName: 'auditRecordDiscountVerify',
            customDataHandler: this.customDataHandler
          })
      }
    }

    return (
      <DragModal {...attributes}>
        <Form
          class=""
          colon={false}
        >
          <Row gutter={10}>
            <Col span={24}>
              <Form.Item label="审核状态">
                {this.form.getFieldDecorator('auditStatus', {
                  initialValue: undefined,
                  rules: [
                    {
                      required: true,
                      type: 'number',
                      message: '请选择审核状态!',
                      trigger: 'change'
                    }
                  ]
                })(
                  <Radio.Group>
                    <Radio value={3}>通过</Radio>
                    <Radio value={4}>驳回</Radio>
                  </Radio.Group>
                )}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="审核意见">
                {
                  this.form.getFieldDecorator('opinion', { initialValue: undefined })(
                    <Input.TextArea
                      autoSize={{ minRows: 6 }}
                      placeholder="请输入"
                    />
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

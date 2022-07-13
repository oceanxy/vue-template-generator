import { Form, Input, Row, Col, message } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'

import DragModal from '@/components/DragModal'
import apis from '@/apis'

export default Form.create({})({
  mixins: [forFormModal()],
  props: {
    /**
     * 标题（可定义占位符）
     * “{action}” 为占位符，稍后会在 mixin 中替换为对应的字符，比如“新增”、“编辑”
     */
    modalTitle: {
      type: String,
      default: '{action}'
    },
    applyType: Number
  },
  data() {
    return {
      modalProps: {
        width: 690
      },
      visibleField: 'visibleOfSigning'
    }
  },
  methods: {
    onSubmit() {
      this.form.validateFieldsAndScroll(async (err, values) => {
        if (err) {
          return
        }
        const form = {
          applyType: this.applyType,
          id: this.currentItem.id
        }
        Object.assign(form, values)
        this.modalProps.confirmLoading = true
        const res = await apis.notifyMessageContractApply(form)
        this.modalProps.confirmLoading = false
        if (res.status) {
          this.$store.dispatch(`${this.moduleName}/getContracts`)
          message.success('申请成功')
          this.onCancel('visibleOfSigning')
        }
      })
    }
  },
  watch: {
    async visible(value) {
      if (value) {
        // await this.$store.dispatch('getAllFunctionalModules')
      } else {
        this.form.resetFields()
      }
    }
  },
  render() {
    const attributes = {
      attrs: this.modalProps,
      on: {
        cancel: () => this.onCancel('visibleOfSigning'),
        ok: () => this.onSubmit()
      }
    }

    return (
      <DragModal {...attributes}>
        <Form labelCol={{ span: 3 }} wrapperCol={{ span: 21 }} colon={false}>
          <Row>
            <Col offset={3}>
              <h3>申请后，我们将会有工作人员为您办理相关手续</h3>
            </Col>
          </Row>
          <Form.Item label="申请说明">
            {this.form.getFieldDecorator('remark', {
              initialValue: '',
              rules: [{ required: true, message: '请输入申请说明', trigger: 'blur' }]
            })(<Input placeholder={'请输入您的申请说明'} autoSize={{ minRows: 5 }} type={'textarea'} />)}
          </Form.Item>
        </Form>
      </DragModal>
    )
  }
})

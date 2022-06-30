import '../assets/styles/index.scss'
import { Form, Input, Radio } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import { mapState } from 'vuex'
import DragModal from '@/components/DragModal'

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
    }
  },
  data() {
    return {
      modalProps: {
        width: 690
      },
      visibleField: 'visibleOfContractReview'
    }
  },
  computed: mapState({
    allSiteApps: 'allSiteApps',
    allFunctionalModules: 'allFunctionalModules'
  }),
  watch: {
    async visible(value) {
      if (value) {
        // await this.$store.dispatch('getAllFunctionalModules')
      }
    }
  },
  render() {
    const attributes = {
      attrs: this.modalProps,

      on: {
        cancel: () => this.onCancel('visibleOfContractReview'),
        ok: () => this.onSubmit({ customApiName: 'contractReviewSubmit' })
      }
    }

    return (
      <DragModal {...attributes} class={'bnm-team-edit-modal'}>
        <Form class="bnm-team-edit-form" labelCol={{ span: 3 }} wrapperCol={{ span: 21 }} colon={false}>
          <Form.Item label="审核结果">
            {this.form.getFieldDecorator('signingStatus', {
              rules: [{ required: true, type: 'number', message: '请选择审核类型', trigger: 'change' }]
            })(
              <Radio.Group>
                <Radio value={3}>通过</Radio>
                <Radio value={4}>驳回</Radio>
              </Radio.Group>
            )}
          </Form.Item>
          {this.form.getFieldValue('signingStatus') === 4 ? (
            <Form.Item label="审核意见">
              {this.form.getFieldDecorator('auditOpinion', {
                initialValue: '',
                rules: [{ required: true, whitespace: true, message: '请输入审核意见', trigger: 'blur' }]
              })(<Input placeholder="请输入简介" type="textarea" />)}
            </Form.Item>
          ) : null}
        </Form>
      </DragModal>
    )
  }
})

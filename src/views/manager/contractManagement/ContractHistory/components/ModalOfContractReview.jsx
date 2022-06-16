import '../assets/styles/index.scss'
import { Form, Input, Radio, Select, Switch } from 'ant-design-vue'
import forFormModal from '@/mixins/forFormModal'
import { mapState } from 'vuex'
import DragModal from '@/components/DragModal'

export default Form.create({})({
  mixins: [forFormModal],
  props: {
    /**
     * 标题（可定义占位符）
     * “{action}” 为占位符，稍后会在 mixin 中替换为对应的字符，比如“新增”、“编辑”
     */
    title: {
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
        ok: this.onSubmit
      }
    }

    return (
      <DragModal {...attributes} class={'bnm-team-edit-modal'}>
        <Form
          class="bnm-team-edit-form"
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 21 }}
          colon={false}
        >
          <Form.Item label="审核结果">
            {
              this.form.getFieldDecorator('xx', {
                initialValue: this.currentItem.sortIndex || 0
              })(
                <Radio.Group>
                  <Radio value={1}>通过</Radio>
                  <Radio value={2}>驳回</Radio>
                </Radio.Group>
              )
            }
          </Form.Item>
          <Form.Item label="审核意见">
            {
              this.form.getFieldDecorator('ss', {
                initialValue: this.currentItem.sortIndex || 0
              })(
                <Input placeholder="请输入简介" type="textarea" />
              )
            }
          </Form.Item>
        </Form>
      </DragModal>
    )
  }
})

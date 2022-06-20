import './index.scss'
import { Form, Icon, Input, Switch, Upload } from 'ant-design-vue'
import forFormModal from '@/mixins/forFormModal'
import { mapState } from 'vuex'
import DragModal from '@/components/DragModal'
import MultiInput from './MultiInput'

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
        width: 690,
        okText: '确认选择'
      },
      visibleField: 'visibleOfChooseVenue'
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
        cancel: () => this.onCancel(this.visibleField),
        ok: this.onSubmit
      }
    }

    return (
      <DragModal {...attributes} class={'bnm-team-edit-modal'}>
        <div>不同园区考核形式不同，请谨慎选择</div>
        <Form
          class="bnm-team-edit-form"
          colon={false}
        >
          <Form.Item>
            {
              this.form.getFieldDecorator('members', {
                initialValue: this.currentItem.members
              })(
                <MultiInput />
              )
            }
          </Form.Item>
        </Form>
      </DragModal>
    )
  }
})

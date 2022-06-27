import './index.scss'
import { Button, Form, Input } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import { mapState } from 'vuex'
import DragModal from '@/components/DragModal'
import MultiInput from './components/MultiInput'

export default Form.create({})({
  mixins: [forFormModal()],
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
        width: 1440,
        footer: [
          <Button onClick={() => this.onCancel(this.visibleField)}>取消</Button>,
          // <Button onClick={() => this.onCancel(this.visibleField)}>预览</Button>,
          <Button type={'primary'} onClick={() => this.onCancel(this.visibleField)}>保存</Button>
        ]
      }
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
        cancel: () => this.onCancel(),
        ok: this.onSubmit
      }
    }

    return (
      <DragModal {...attributes} class={'bnm-team-edit-modal'}>
        <Form class="bnm-form-grid">
          <Form.Item label="模版名称">
            {
              this.form.getFieldDecorator('number', {
                initialValue: this.currentItem.number,
                rules: [{ required: true, message: '请输入编号!', trigger: 'blur' }]
              })(
                <Input placeholder="请输入编号" allowClear />
              )
            }
          </Form.Item>
          <Form.Item label="题目列表">
            <MultiInput />
          </Form.Item>
        </Form>
      </DragModal>
    )
  }
})

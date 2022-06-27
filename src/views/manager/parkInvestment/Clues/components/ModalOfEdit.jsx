import '../assets/styles/index.scss'
import { Form, Input, Select, Switch } from 'ant-design-vue'
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
        <Form
          class="bnm-team-edit-form bnm-form-grid"
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 21 }}
          colon={false}
        >
          <Form.Item label="线索标题">
            {
              this.form.getFieldDecorator('gg', {
                initialValue: this.currentItem.sortIndex || 0
              })(
                <Select></Select>
              )
            }
          </Form.Item>
          <Form.Item label="线索来源" class={'half'}>
            {
              this.form.getFieldDecorator('hh', {
                initialValue: this.currentItem.sortIndex || 0
              })(
                <Select></Select>
              )
            }
          </Form.Item>
          <Form.Item label="所属行业" class={'half'}>
            {
              this.form.getFieldDecorator('jj', {
                initialValue: this.currentItem.sortIndex || 0
              })(
                <Input placeholder={'请输入名称'} />
              )
            }
          </Form.Item>
          <Form.Item label="采集人" class={'half'}>
            {
              this.form.getFieldDecorator('mm', {
                initialValue: this.currentItem.sortIndex || 0
              })(
                <Input placeholder={'请输入名称'} />
              )
            }
          </Form.Item>
          <Form.Item label="采集时间" class={'half'}>
            {
              this.form.getFieldDecorator('nn', {
                initialValue: this.currentItem.sortIndex || 0
              })(
                <Input placeholder={'请输入名称'} />
              )
            }
          </Form.Item>
          <Form.Item label="线索描述">
            {
              this.form.getFieldDecorator('bb', {
                initialValue: this.currentItem.sortIndex || 0
              })(
                <Input placeholder={'请输入名称'} type={'textarea'} />
              )
            }
          </Form.Item>
          <Form.Item label="跟进团队" class={'half'}>
            {
              this.form.getFieldDecorator('vv', {
                initialValue: this.currentItem.sortIndex || 0
              })(
                <Input placeholder={'请输入名称'} />
              )
            }
          </Form.Item>
          <Form.Item label="跟进成员" class={'half'}>
            {
              this.form.getFieldDecorator('cc', {
                initialValue: this.currentItem.sortIndex || 0
              })(
                <Input placeholder={'请输入名称'} />
              )
            }
          </Form.Item>
        </Form>
      </DragModal>
    )
  }
})

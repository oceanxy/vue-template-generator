import '../assets/styles/index.scss'
import { Form, Input, Select } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import { mapState } from 'vuex'
import DragModal from '@/components/DragModal'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {
      modalProps: {
        width: 400,
        okText: '确定'
      },
      visibleField: 'visibleOfAssignLeads'
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
      <DragModal {...attributes}>
        <Form
          class="bnm-form-grid"
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 21 }}
          colon={false}
        >
          <Form.Item>
            请选择线索的跟进人员
          </Form.Item>
          <Form.Item label="跟进团队">
            {
              this.form.getFieldDecorator('gg', {
                initialValue: this.currentItem.sortIndex || 0
              })(
                <Input placeholder={'请输入'} />
              )
            }
          </Form.Item>
          <Form.Item label="跟进成员">
            {
              this.form.getFieldDecorator('hh', {
                initialValue: this.currentItem.sortIndex || 0
              })(
                <Select></Select>
              )
            }
          </Form.Item>
        </Form>
      </DragModal>
    )
  }
})

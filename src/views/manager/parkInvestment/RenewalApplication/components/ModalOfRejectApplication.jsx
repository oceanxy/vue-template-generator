import '../assets/styles/index.scss'
import { Form, Input } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import { mapState } from 'vuex'
import DragModal from '@/components/DragModal'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {
      modalProps: {
        width: 690,
        okText: '确定'
      },
      visibleField: 'visibleOfRejectApplication'
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
        <Form
          class="bnm-team-edit-form bnm-form-grid"
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 21 }}
          colon={false}
        >
          <Form.Item label="拒绝理由">
            {
              this.form.getFieldDecorator('bb', {
                initialValue: this.currentItem.sortIndex || 0
              })(
                <Input placeholder={'请输入拒绝理由'} type={'textarea'} />
              )
            }
          </Form.Item>
        </Form>
      </DragModal>
    )
  }
})

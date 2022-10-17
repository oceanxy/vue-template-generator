import { Form, Select, Switch } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import { mapGetters } from 'vuex'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {
      modalProps: {
        width: 500,
        destroyOnClose: true
      },
      visibleField: 'visibleOfRemindersForHandingComplaints'
    }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    remindersForHandingComplaints() {
      return this.getState('remindersForHandingComplaints', this.moduleName)
    }
  },
  methods: {
    handleSubmit() {
      // this.onSubmit({
      //   customApiName: '',
      //   isFetchList: false,
      //   done: async () => {
      //     await this.$store.dispatch('getListForSelect', {
      //       moduleName: this.moduleName,
      //       stateName: this.currentItem.stateName,
      //       customApiName: ''
      //     })
      //   }
      // })
    }
  },
  render() {
    const attributes = {
      attrs: this.modalProps,
      on: {
        cancel: () => this.onCancel(this.visibleField),
        ok: this.handleSubmit
      }
    }

    return (
      <DragModal {...attributes}>
        <Form
          class="bnm-form-grid label-size-small"
          colon={false}
        >
          <Form.Item
            label="启用提醒"
            required
          >
            {
              this.form.getFieldDecorator('remind', {
                initialValue: this.remindersForHandingComplaints.data.enable,
                valuePropName: 'checked'
              })(
                <Switch />
              )
            }
          </Form.Item>
          <Form.Item label="指定管理员">
            {
              this.form.getFieldDecorator('chargeUnit', {
                initialValue: this.remindersForHandingComplaints.data.manager,
                rules: [
                  {
                    required: true,
                    message: '请选择管理员！',
                    trigger: 'change'
                  }
                ]
              })(
                <Select
                  placeholder={'请选择管理员'}
                  disabled={!this.form.getFieldValue('remind')}
                  options={[]}
                />
              )
            }
          </Form.Item>
        </Form>
      </DragModal>
    )
  }
})

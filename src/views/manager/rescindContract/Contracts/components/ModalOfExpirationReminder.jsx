import '../index.scss'
import { Form, Input, Radio, Spin } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import { mapGetters } from 'vuex'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {
      modalProps: { width: 500 },
      visibleField: 'visibleOfExpirationReminder'
    }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    currentParkTreeKeySelected() {
      return this.getState('currentParkTreeKeySelected', 'common') || []
    },
    reminderMethods() {
      return this.getState('reminderMethods', 'common')
    }
  },
  watch: {
    visible: {
      immediate: true,
      async handler(value) {
        if (value) {
          await this.$store.dispatch('getListForSelect', {
            moduleName: 'common',
            stateName: 'reminderMethods',
            customApiName: 'getReminderMethods',
            payload: { treeId: this.currentParkTreeKeySelected }
          })
        }
      }
    }
  },
  render() {
    const attributes = {
      attrs: this.modalProps,
      on: {
        cancel: () => this.onCancel(this.visibleField),
        ok: () => this.onSubmit({
          customApiName: 'sendReminder',
          isFetchList: false
        })
      }
    }

    return (
      <DragModal {...attributes}>
        <Form
          class="bnm-form-grid label-size-small"
          colon={false}
        >
          <Form.Item label="提醒方式">
            <Spin spinning={this.reminderMethods.loading}>
              {
                this.form.getFieldDecorator('remindTypeId', {
                  initialValue: 1,
                  rules: [
                    {
                      required: true, type: 'number', message: '请选择提醒方式！', trigger: 'change'
                    }
                  ]
                })(
                  <Radio.Group>
                    {
                      this.reminderMethods.list.map(item => (
                        <Radio value={item.id}>{item.typeName}</Radio>
                      ))
                    }
                  </Radio.Group>
                )
              }
            </Spin>
          </Form.Item>
          <Form.Item label="提醒内容">
            {
              this.form.getFieldDecorator('content', {
                rules: [
                  {
                    required: true, message: '请输入提醒内容！', trigger: 'blur'
                  }
                ]
              })(
                <Input.TextArea
                  placeholder={'请输入提醒内容'}
                  autoSize={{ minRows: 6 }}
                />
              )
            }
          </Form.Item>
        </Form>
      </DragModal>
    )
  }
})

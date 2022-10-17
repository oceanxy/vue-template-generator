import '../assets/styles/index.scss'
import { Form, Input } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import { mapState } from '@/utils/store'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {
      modalProps: { width: 700 },
      visibleField: 'visibleOfRemind'
    }
  },
  computed: { ...mapState(['selectedRows']) },
  render() {
    const attributes = {
      attrs: this.modalProps,
      on: {
        cancel: () => this.onCancel(this.visibleField),
        ok: () => this.onSubmit({
          isFetchList: false,
          customApiName: 'reminderEnterpriseToFillIn',
          customDataHandler: values => {
            if (this.currentItem.isBulkOperations) {
              values.urgeObjList = this.selectedRows.map(item => ({
                reportId: item.reportId,
                objId: item.objId
              }))
            } else {
              values.urgeObjList = [
                {
                  reportId: this.currentItem.reportId,
                  objId: this.currentItem.objId
                }
              ]
            }

            return values
          }
        })
      }
    }

    return (
      <DragModal {...attributes}>
        <Form
          class="bnm-form-grid label-size-small"
          colon={false}
        >
          <Form.Item label="内容">
            {
              this.form.getFieldDecorator('content', {
                rules: [
                  {
                    required: true, message: '请输入催报内容！', trigger: 'blur'
                  }
                ]
              })(
                <Input.TextArea
                  placeholder="请输入催报内容"
                  autoSize={{ minRows: 6 }}
                  allowClear
                />
              )
            }
          </Form.Item>
        </Form>
      </DragModal>
    )
  }
})

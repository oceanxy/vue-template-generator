import '../assets/styles/index.scss'
import { Form, Input } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import BNUploadPictures from '@/components/BNUploadPictures'
import { cloneDeep } from 'lodash'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {
      modalProps: { width: 810 },
      visibleField: 'visibleOfReply'
    }
  },
  render() {
    const attributes = {
      attrs: this.modalProps,
      on: {
        cancel: () => this.onCancel(this.visibleField),
        ok: () => this.onSubmit({
          customApiName: 'replyingBusinessRequirement',
          customDataHandler: values => {
            values = cloneDeep(values)
            values.acceptImgs = values.acceptImgs.map(item => item.response.data[0].key)

            if (!('ids' in values)) {
              values.ids = values.id
            }

            return values
          }
        })
      }
    }

    return (
      <DragModal {...attributes}>
        <Form
          class="bnm-form-grid"
          colon={false}
        >
          <Form.Item label={'回复内容'}>
            {
              this.form.getFieldDecorator('acceptResult', {
                rules: [
                  {
                    required: true,
                    message: '请输入回复内容！',
                    trigger: 'blur'
                  }
                ]
              })(
                <Input.TextArea
                  placeholder={'请输入回复内容'}
                  autoSize={{ minRows: 6 }}
                />
              )
            }
          </Form.Item>
          <Form.Item label="图集">
            {
              this.form.getFieldDecorator('acceptImgs', { initialValue: [] })(
                <BNUploadPictures />
              )
            }
          </Form.Item>
        </Form>
      </DragModal>
    )
  }
})

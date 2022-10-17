import '../assets/styles/index.scss'
import { Form, Input, Radio } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import BNUploadPictures from '@/components/BNUploadPictures'
import { cloneDeep } from 'lodash'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {
      modalProps: { width: 810 },
      visibleField: 'visibleOfProcess'
    }
  },
  render() {
    const attributes = {
      attrs: this.modalProps,
      on: {
        cancel: () => this.onCancel(this.visibleField),
        ok: () => this.onSubmit({
          customApiName: 'handlingComplaints',
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
          <Form.Item label="处理状态">
            {
              this.form.getFieldDecorator('acceptStatus', {
                initialValue: undefined,
                rules: [
                  {
                    required: true,
                    type: 'number',
                    message: '请选择处理状态!',
                    trigger: 'blur'
                  }
                ]
              })(
                <Radio.Group>
                  <Radio value={1}>已处理</Radio>
                  <Radio value={4}>处理中</Radio>
                </Radio.Group>
              )
            }
          </Form.Item>
          <Form.Item label={'处理结果'}>
            {
              this.form.getFieldDecorator('acceptResult', {
                rules: [
                  {
                    required: true,
                    message: '请输入处理结果！',
                    trigger: 'blur'
                  }
                ]
              })(
                <Input.TextArea
                  placeholder={'请输入处理结果'}
                  autoSize={{ minRows: 6 }}
                />
              )
            }
          </Form.Item>
          <Form.Item label="处理图集">
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

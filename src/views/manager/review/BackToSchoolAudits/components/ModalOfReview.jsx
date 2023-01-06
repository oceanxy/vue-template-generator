import DragModal from '@/components/DragModal'
import { DatePicker, Descriptions, Form, Input, Radio } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {
      modalProps: {
        width: 810,
        destroyOnClose: true
      },
      visibilityFieldName: 'visibilityOfReview'
    }
  },
  computed: {
    attributes() {
      return {
        attrs: this.modalProps,
        on: {
          cancel: () => this.onCancel(this.visibilityFieldName),
          ok: () => this.onSubmit()
        }
      }
    }
  },
  render() {
    return (
      <DragModal {...this.attributes}>
        <Descriptions
          bordered
          column={2}
          size={'small'}
        >
          <Descriptions.Item label={'登记类型'}>21</Descriptions.Item>
          <Descriptions.Item label={'是否就诊'}>11</Descriptions.Item>
          <Descriptions.Item label={'就诊时间'}>11</Descriptions.Item>
          <Descriptions.Item label={'就诊医院'}>11</Descriptions.Item>
          <Descriptions.Item label={'医院证明'}><img /></Descriptions.Item>
          <Descriptions.Item label={'申请返校时间'}>11</Descriptions.Item>
        </Descriptions>
        <Form class="tg-form-grid" colon={false} style={'margin-top: 2ic'}>
          <Form.Item label="是否返校" class={'half'}>
            {
              this.form.getFieldDecorator('fullName6', {
                initialValue: this.currentItem.fullName,
                rules: [
                  {
                    required: true,
                    message: '请选择是否允许返校！',
                    trigger: 'change'
                  }
                ]
              })(
                <Radio.Group>
                  <Radio value={1}>通过</Radio>
                  <Radio value={2}>驳回</Radio>
                </Radio.Group>
              )
            }
          </Form.Item>
          <Form.Item label="建议返校时间" class={'half'}>
            {
              this.form.getFieldDecorator('fullName3', {
                initialValue: this.currentItem.fullName,
                rules: [
                  {
                    required: true,
                    message: '请输入就诊时间！',
                    trigger: 'change'
                  }
                ]
              })(
                <DatePicker
                  style={'width: 100%'}
                  placeholder={'请输入就诊时间'}
                  valueFormat={'YYYY-MM-DD'}
                  allowClear
                />
              )
            }
          </Form.Item>
          <Form.Item label="备注">
            {
              this.form.getFieldDecorator('fullName7', { initialValue: this.currentItem.fullName })(
                <Input.TextArea placeholder={'请输入描述'} allowClear />
              )
            }
          </Form.Item>
        </Form>
      </DragModal>
    )
  }
})

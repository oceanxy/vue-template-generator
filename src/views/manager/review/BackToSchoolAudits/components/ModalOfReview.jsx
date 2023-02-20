import DragModal from '@/components/DragModal'
import { DatePicker, Descriptions, Form, Input, Radio, Upload } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {
      modalProps: {
        width: 610,
        destroyOnClose: true
      }
    }
  },
  computed: {
    attributes() {
      return {
        attrs: this.modalProps,
        on: {
          cancel: () => this.onCancel(),
          ok: () => this.onSubmit()
        }
      }
    },
    fileList() {
      return this.currentItem.imgList?.map((img, index) => ({
        uid: `${-index}`,
        name: `${index}`,
        status: 'done',
        url: img
      })) ?? []
    }
  },
  render() {
    return (
      <DragModal {...this.attributes}>
        <Descriptions
          bordered
          column={1}
          size={'small'}
        >
          <Descriptions.Item label={'登记类型'}>{this.currentItem.registerTypeStr}</Descriptions.Item>
          <Descriptions.Item label={'病例类型'}>{this.currentItem.diseaseTypeStr}</Descriptions.Item>
          <Descriptions.Item label={'学生症状'}>{this.currentItem.symptomName}</Descriptions.Item>
          <Descriptions.Item label={'是否就诊'}>{this.currentItem.isToSeeDoctorStr}</Descriptions.Item>
          <Descriptions.Item label={'就诊医院'}>{this.currentItem.seeDoctorHospital}</Descriptions.Item>
          <Descriptions.Item label={'医院证明'}>
            <Upload
              disabled
              action={''}
              listType={'picture-card'}
              fileList={this.fileList}
            />
          </Descriptions.Item>
          <Descriptions.Item label={'申请返校时间'}>{this.currentItem.applyForTimeStr}</Descriptions.Item>
        </Descriptions>
        <Form
          class="tg-form-grid"
          colon={false}
          style={'margin-top: 2ic'}
        >
          <Form.Item label="是否返校">
            {
              this.form.getFieldDecorator('auditType', {
                initialValue: 2,
                rules: [
                  {
                    required: true,
                    type: 'number',
                    message: '请选择是否允许返校！',
                    trigger: 'change'
                  }
                ]
              })(
                <Radio.Group>
                  <Radio value={2}>通过</Radio>
                  <Radio value={3}>驳回</Radio>
                </Radio.Group>
              )
            }
          </Form.Item>
          <Form.Item label="建议返校时间">
            {
              this.form.getFieldDecorator('auditTime', {
                initialValue: undefined,
                rules: [
                  {
                    required: true,
                    message: '请选择建议返校时间！',
                    trigger: 'change'
                  }
                ]
              })(
                <DatePicker
                  style={'width: 100%'}
                  placeholder={'请选择建议返校时间'}
                  valueFormat={'YYYYMMDDHHmmssSSS'}
                  allowClear
                />
              )
            }
          </Form.Item>
          <Form.Item label="审核说明">
            {
              this.form.getFieldDecorator('auditRemark', { initialValue: '' })(
                <Input.TextArea
                  placeholder={'请输入审核说明'}
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

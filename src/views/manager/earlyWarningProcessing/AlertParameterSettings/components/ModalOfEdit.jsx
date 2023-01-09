import { Form, Input, InputNumber, Radio } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return { modalProps: { width: 810 } }
  },
  render() {
    return (
      <DragModal {...this.attributes}>
        <Form class="tg-form-grid" colon={false}>
          <Form.Item label="预警类型">
            {
              this.form.getFieldDecorator(
                'activityType',
                {
                  initialValue: this.details?.activityType ?? 1,
                  rules: [
                    {
                      required: true,
                      type: 'number',
                      message: '请选择预警类型!',
                      trigger: 'change'
                    }
                  ]
                }
              )(
                <Radio.Group>
                  <Radio value={1}>症状预警</Radio>
                  <Radio value={2}>非传染病预警</Radio>
                  <Radio value={3}>传染病预警</Radio>
                </Radio.Group>
              )
            }
          </Form.Item>
          <Form.Item label="预警范围">
            {
              this.form.getFieldDecorator(
                'activityType',
                {
                  initialValue: this.details?.activityType ?? 1,
                  rules: [
                    {
                      required: true,
                      type: 'number',
                      message: '请选择预警范围!',
                      trigger: 'change'
                    }
                  ]
                }
              )(
                <Radio.Group>
                  <Radio value={1}>同校</Radio>
                  <Radio value={2}>同班或同宿舍</Radio>
                </Radio.Group>
              )
            }
          </Form.Item>
          <Form.Item label="预警范围" class={'half'}>
            {
              this.form.getFieldDecorator(
                'activityFrequency',
                { initialValue: this.details?.activityFrequency ?? 1 }
              )(
                <InputNumber
                  min={1}
                  formatter={value => `${value}天内`}
                  parser={value => value.replace('天内', '')}
                  placeholder={'请输入数字'}
                  style={'width: 100%'}
                />
              )
            }
          </Form.Item>
          <Form.Item label="发生最低例数" class={'half'}>
            {
              this.form.getFieldDecorator('ee', { initialValue: this.details?.ee ?? 1 })(
                <InputNumber
                  min={0}
                  formatter={value => `${value}例`}
                  parser={value => value.replace('例', '')}
                  placeholder={'请输入数字'}
                  style={'width: 100%'}
                />
              )
            }
          </Form.Item>
          <Form.Item label="症状名称">
            {
              this.form.getFieldDecorator('fullName', { initialValue: this.details?.fullName ?? 1 })(
                <Input
                  placeholder={'请输入症状名称'}
                />
              )
            }
          </Form.Item>
        </Form>
      </DragModal>
    )
  }
})

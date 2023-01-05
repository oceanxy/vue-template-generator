import DragModal from '@/components/DragModal'
import { Button, DatePicker, Descriptions, Form, Input, Radio } from 'ant-design-vue'
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
          layout={'vertical'}
          bordered
          column={5}
          size={'small'}
        >
          <Descriptions.Item label={'姓名'}>21</Descriptions.Item>
          <Descriptions.Item label={'性别'}>11</Descriptions.Item>
          <Descriptions.Item label={'年龄'}>11</Descriptions.Item>
          <Descriptions.Item label={'班级'}>11</Descriptions.Item>
          <Descriptions.Item label={'宿舍'}>
            <span>11</span>
            <Button size={'small'} type={'danger'} style={'margin-left: 1ic'}>摸排病例</Button>
          </Descriptions.Item>
          <Descriptions.Item label={'上报时段'}>11</Descriptions.Item>
          <Descriptions.Item label={'上报日期'}>11</Descriptions.Item>
          <Descriptions.Item label={'登记类型'}>11</Descriptions.Item>
          <Descriptions.Item label={'缺课天数'}>11</Descriptions.Item>
          <Descriptions.Item label={'病例类型'}>11</Descriptions.Item>
        </Descriptions>
        <Form class="tg-form-grid" colon={false} style={'margin-top: 2ic'}>
          <Form.Item label="学生症状">
            {
              this.form.getFieldDecorator('fullName1', {
                initialValue: this.currentItem.fullName,
                rules: [
                  {
                    required: true,
                    message: '请输入学生症状！',
                    trigger: 'blur'
                  }
                ]
              })(
                <Input placeholder={'请输入学生症状'} allowClear />
              )
            }
          </Form.Item>
          <Form.Item label="初步诊断">
            {
              this.form.getFieldDecorator('fullName2', {
                initialValue: this.currentItem.fullName,
                rules: [
                  {
                    required: true,
                    message: '请输入初步诊断内容！',
                    trigger: 'blur'
                  }
                ]
              })(
                <Input placeholder={'请输入初步诊断内容'} allowClear />
              )
            }
          </Form.Item>
          <Form.Item label="就诊时间" class={'half'}>
            {
              this.form.getFieldDecorator('fullName3', {
                initialValue: this.currentItem.fullName,
                rules: [
                  {
                    required: true,
                    message: '请输入就诊时间！',
                    trigger: 'blur'
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
          <Form.Item label="就诊医院" class={'half'}>
            {
              this.form.getFieldDecorator('fullName4', {
                initialValue: this.currentItem.fullName,
                rules: [
                  {
                    required: true,
                    message: '请输入就诊医院！',
                    trigger: 'blur'
                  }
                ]
              })(
                <Input placeholder={'请输入就诊医院'} allowClear />
              )
            }
          </Form.Item>
          <Form.Item label="病症情况" class={'half'}>
            {
              this.form.getFieldDecorator('fullName5', { initialValue: this.currentItem.fullName })(
                <Radio.Group>
                  <Radio value={1}>属实</Radio>
                  <Radio value={2}>不属实</Radio>
                </Radio.Group>
              )
            }
          </Form.Item>
          <Form.Item label="是否追踪" class={'half'}>
            {
              this.form.getFieldDecorator('fullName6', { initialValue: this.currentItem.fullName })(
                <Radio.Group>
                  <Radio value={1}>是</Radio>
                  <Radio value={2}>否</Radio>
                </Radio.Group>
              )
            }
          </Form.Item>
          <Form.Item label="描述">
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
